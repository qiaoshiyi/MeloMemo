-- ============================================================
--  MeloMemo 社区数据库结构
--  在 Supabase 控制台 → SQL Editor 里整体粘贴执行一次即可
-- ============================================================

-- 1. 用户资料表（注册后自动创建一行）
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-zA-Z0-9_]{2,24}$'),
  display_name text not null default '',
  bio text not null default '',
  created_at timestamptz not null default now()
);

-- 新用户注册时自动建资料（用户名临时用随机号，之后可在主页里改）
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base text;
  candidate text;
begin
  base := regexp_replace(split_part(coalesce(new.email, 'friend'), '@', 1), '[^a-zA-Z0-9_]', '', 'g');
  if char_length(base) < 2 then base := 'friend'; end if;
  candidate := base;
  while exists (select 1 from public.profiles where username = candidate) loop
    candidate := base || floor(random() * 9000 + 1000)::int::text;
  end loop;
  insert into public.profiles (id, username, display_name)
  values (new.id, candidate, split_part(new.email, '@', 1));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. 作品表（音频存 Storage 的 songs 桶，这里存元数据）
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  note text not null default '' check (char_length(note) <= 200),
  storage_path text not null,
  plays integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists works_user_idx on public.works (user_id, created_at desc);
create index if not exists works_recent_idx on public.works (created_at desc);

-- 3. 关注表：follower 关注 following
create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

-- 4. 播放量自增函数（任何人可调用，只加计数不改别的）
create or replace function public.bump_plays(w uuid)
returns void language sql security definer set search_path = public as $$
  update public.works set plays = plays + 1 where id = w;
$$;

-- ============================================================
--  行级安全（RLS）：谁能读什么、改什么
-- ============================================================
alter table public.profiles enable row level security;
alter table public.works   enable row level security;
alter table public.follows enable row level security;

-- 资料表：所有人可读，登录者只能改自己这行
create policy "profiles_public_read"  on public.profiles for select using (true);
create policy "profiles_update_own"   on public.profiles for update using (auth.uid() = id);

-- 作品表：所有人可读，登录者可发布/删除自己的
create policy "works_public_read"  on public.works for select using (true);
create policy "works_insert_own"   on public.works for insert with check (auth.uid() = user_id);
create policy "works_delete_own"   on public.works for delete using (auth.uid() = user_id);

-- 关注表：所有人可读，登录者管理自己发起的关注
create policy "follows_public_read"       on public.follows for select using (true);
create policy "follows_insert_own"        on public.follows for insert with check (auth.uid() = follower_id);
create policy "follows_delete_own"        on public.follows for delete using (auth.uid() = follower_id);

-- bump_plays 允许任何人调用
grant execute on function public.bump_plays(uuid) to anon, authenticated;

-- ============================================================
--  Storage：songs 桶
--  在 Supabase 控制台 → Storage 里新建一个桶，名字 songs，
--  开启 Public access（所有人可听）；策略如下（SQL 无法建桶，桶建好后执行）：
-- ============================================================
create policy "songs_public_read" on storage.objects
  for select using (bucket_id = 'songs');
create policy "songs_upload_own" on storage.objects
  for insert with check (bucket_id = 'songs' and auth.role() = 'authenticated');
create policy "songs_delete_own" on storage.objects
  for delete using (bucket_id = 'songs' and auth.role() = 'authenticated');

-- ============================================================
--  2026-11 追加：流派字段 + 喜欢表（已在线上执行）
-- ============================================================
alter table public.works add column if not exists genre text not null default '';
create index if not exists works_genre_idx on public.works (genre);
alter table public.works drop constraint if exists works_title_len;
alter table public.works add constraint works_title_len check (char_length(title) between 1 and 100);
alter table public.works drop constraint if exists works_note_len;
alter table public.works add constraint works_note_len check (char_length(note) <= 200);
alter table public.works drop constraint if exists works_genre_len;
alter table public.works add constraint works_genre_len check (char_length(genre) <= 20);

create table if not exists public.loves (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  work_id    uuid not null references public.works(id)    on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, work_id)
);
create index if not exists loves_work_idx on public.loves (work_id);
alter table public.loves enable row level security;
create policy "loves_public_read" on public.loves for select using (true);
create policy "loves_insert_own"  on public.loves for insert with check (auth.uid() = user_id);
create policy "loves_delete_own"  on public.loves for delete using (auth.uid() = user_id);

-- 作品时长（秒）：发布时由前端读音频元数据写入，用于卡片展示
alter table public.works add column if not exists duration int not null default 0;
alter table public.works drop constraint if exists works_duration_chk;
alter table public.works add constraint works_duration_chk check (duration >= 0 and duration <= 86400);

-- 站内评论：每首作品一个评论区，游客可读、登录可写、只能删自己的
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  work_id    uuid not null references public.works(id)    on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now(),
  constraint comments_body_len check (char_length(body) between 1 and 300)
);
create index if not exists comments_work_idx on public.comments (work_id, created_at desc);
alter table public.comments enable row level security;
drop policy if exists "comments_public_read" on public.comments;
create policy "comments_public_read" on public.comments for select using (true);
drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own" on public.comments for insert with check (auth.uid() = user_id);
drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own" on public.comments for delete using (auth.uid() = user_id);
