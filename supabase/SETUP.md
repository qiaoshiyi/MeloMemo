# MeloMemo 社区上线 · Supabase 开通清单

## 要做的事（一个人 10 分钟内能做完）

1. 用 GitHub 账号到 https://supabase.com 点 "Sign in with GitHub" 注册（免费）。
2. New project → 名字随意（如 melomemo）→ 数据库密码会显示一次，存好或直接跳过（我们不用直连）→ 区域选 Singapore 或 Tokyo（国内访问较快）。
3. 项目创建完成后，在 **SQL Editor** 里粘贴执行 `schema.sql` 的全部内容（先在 Storage 页面手动创建名为 `songs` 的公开桶，再执行文件最后的 storage 策略部分）。
4. **Authentication → Sign In / Providers → Email** → 关闭 "Confirm email"（先方便注册体验，之后想开再开）。
5. **Authentication → URL Configuration** → Site URL 填 `https://qiaoshiyi.github.io/MeloMemo/`（域名绑好后改成 https://melomemo.cn/app 对应地址）。
6. 项目首页 **Project Settings → API** → 复制 `Project URL` 和 `anon public key` → 填进 `public/config.js`。

## 填好之后

把两个值交给 GLM（anon key 是设计为公开的前端密钥，不含敏感权限，可以贴出来），剩下的：写入 config、推送、部署验证，由 GLM 完成。

## 已内置的功能

- 邮箱注册 / 登录 / 退出
- 发布作品（音频存 Supabase Storage，≤50MB）
- 社区动态（全站最新作品）
- 个人主页 `app#/u/用户名`：作品列表、粉丝/关注数
- 关注 / 取关 / 互相关注标识
- 播放量 +1（不记名）
