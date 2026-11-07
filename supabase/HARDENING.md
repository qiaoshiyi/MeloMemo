# MeloMemo 上线前还需要在后台做的事

前端已经把能改的都改了，下面这些必须在你自己的账号后台点几下，代码改不动。
按「不做会怎样」排了序。

---

## 1. 邮箱验证 + 限流（Supabase → Authentication）

现在是 `mailer_autoconfirm: true`，也就是**注册完邮箱不验证就能直接用**，
配合没有图形验证码，任何人可以脚本批量注册垃圾号。

- Authentication → Providers → Email → 关掉 **Confirm email** 之外的选项前，先配好 SMTP
  （Authentication → Emails → SMTP Settings，国内可用阿里云/腾讯云邮件推送、Resend、Resend 的免费额度也够）
- 配好后打开 **Confirm email**
- Authentication → Rate Limits：`Email signups` 调到 30/小时以内，`Token verifications` 60/小时
- Authentication → Attack Protection：打开 **CAPTCHA**（hCaptcha 免费），把 site key 填到前端

## 2. 上传体积与类型（Storage → songs 桶）

前端只做了「≤50MB + audio/*」的前置校验，**HTML 可以绕过**。
真正生效的限制要在桶上设：

- Storage → songs → Settings：**File size limit** 填 `52428800`（50MB）
- **Allowed MIME types** 填 `audio/mpeg,audio/mp4,audio/wav,audio/ogg,audio/flac,audio/aac,audio/webm`
- 关闭 **Public bucket** 的话前端要改成签名 URL（现在首页和社区都直接读 public 链接，暂时保持 public 也行，
  但要清楚：**任何拿到链接的人都能下载音频**，被别的站盗链你也拦不住。介意的话加 Cloudflare 限流或改签名 URL）

## 3. 数据库补两个约束（SQL Editor）

```sql
-- 头像地址只接受 http(s)，挡住 javascript: / data: 之类的怪东西
alter table public.profiles
  add constraint avatar_url_http check (
    avatar_url is null or avatar_url = '' or avatar_url ~* '^https?://'
  );

-- 播放量防刷：现在任何人不登录就能无限调 bump_plays
-- 简单做法是给 IP/时间做限制，Supabase 里可用 pg_cron 定期校正，
-- 或者干脆把 bump_plays 收成只有登录用户可调用：
revoke execute on function public.bump_plays(uuid) from anon;
```

## 4. 备份

Supabase 免费版**没有自动备份**。Project Settings → Database → Backups 里至少每周手动
`pg_dump` 一次，或者升级到 Pro。

## 5. 备案（这个最要紧）

`melomemo.cn` 是 **.cn 域名 + 境内可访问的 UGC 平台**：

- 域名注册商处做 **实名认证**（.cn 强制）
- 如果服务器/主体在境内：必须 **ICP 备案**，否则随时被停解析
- 现在托管在 GitHub Pages（境外），技术上不需要 ICP，但
  **一旦有用户上传内容，就落到《互联网信息服务管理办法》的 UGC 范畴**，
  合规做法是尽快备案 + 落实实名 + 保留 6 个月日志
- 页脚现在是「© 2026 MeloMemo」，**没有备案号位置**；
  备案下来后告诉我，我把备案号加到 `/legal/` 和页脚

## 6. 内容审核

现在没有任何审核链路。最低成本方案：

- GitHub Issues 当举报入口（`/legal/#report` 已经这么写了）
- 每周手动过一遍新作品；发现违规先下架（数据库 `works` 里删行 + 删 storage 对象）
- 用户协议里已写明「可无需事先通知删除违规内容」

---

## 已经在前端修掉的（供你了解，无需操作）

- 游客现在能直接浏览动态和他人主页（之前分享出去的主页打开只有登录框）
- 忘记密码 / 重置密码流程补上了
- 发布失败会回滚已上传的音频，不再产生孤儿文件
- 删除作品失败会提示，不会静默失败
- 用户名抢注竞态、搜索注入、播放量重复计数、头像 CSS 注入、令牌刷新整页刷新
- HTTPS 已开启（http 自动 301 到 https），证书状态 approved，2027-02-05 到期自动续
- 首页从「个人主页」改成平台落地页，带最新作品（直连 Supabase 只读）
- 新增 `/legal/` 用户协议 / 隐私政策 / 举报渠道，自定义 404
- SEO：canonical、og:image、twitter 卡片、JSON-LD、robots.txt、sitemap.xml、CNAME
- 可访问性：减少动效、键盘焦点、跳转链接、无障碍标签
