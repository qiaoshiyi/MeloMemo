# 🎤 个人主页模板（Astro）

一个开源的个人网站模板：**关于我 / 歌曲试听 / 视频展示 / 作品集 / 联系方式**。
设计思想是「内容与代码分离」——你不需要懂前端，只编辑一个文件就能拥有自己的网站。

![Astro](https://img.shields.io/badge/Astro-5.x-orange) ![License](https://img.shields.io/badge/license-MIT-green) ![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

## ✨ 特点

- 🎵 **歌曲展示**：把 MP3 拖进指定文件夹，网页自动出现带封面和播放器的歌曲卡片
- 🎬 **视频展示**：填一个 B 站/YouTube 嵌入链接就显示视频卡片
- ✏️ **零门槛编辑**：所有内容集中在 `src/data/content.js` 一个文件，带中文注释
- 🚀 **自带部署流水线**：push 到 GitHub 自动构建发布到 GitHub Pages
- 🪶 **极简轻量**：无 UI 框架依赖，构建产物是纯静态 HTML

## 🚀 快速开始

```bash
npm install      # 安装依赖（只需一次）
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 构建静态文件到 dist/
```

要求：Node.js 18.17+ 或 20+。

## ✏️ 内容怎么改

**只编辑一个文件：`src/data/content.js`**（里面有逐行中文注释）：

| 想改什么 | 改哪里 |
|---|---|
| 名字、一句话简介、自我介绍 | `name` / `slogan` / `about` |
| 头像 | 图片放进 `public/`，`avatar` 填 `"/图片名.jpg"` |
| 唱歌 | MP3 放进 `public/media/`，`songs` 里加一行 |
| 视频 | 传到 B 站/YouTube 后贴嵌入链接到 `videos` |
| 联系方式 | `contact`（留空 `""` 即隐藏） |
| 站点配色、字体 | `src/styles/global.css` 最上方的变量 |

## ☁️ 发布上线

### 方式一：GitHub Pages（内置，推荐）

1. 把项目推上 GitHub（仓库名用 `你的用户名.github.io` 可以，普通仓库也行）
2. 进入仓库 **Settings → Pages → Build and deployment → Source**，选 **GitHub Actions**
3. 之后每次 `git push`，页面自动构建并上线，地址是 `https://你的用户名.github.io/仓库名/`

### 方式二：Vercel / Netlify（免费）

导入这个 GitHub 仓库即可，它们会自动识别 Astro 项目并部署，无需任何配置。

## ⚠️ 开源注意事项

- 这是公开仓库：**个人信息、歌曲、视频都是公开可见的**，上传前想清楚放什么
- 走 GitHub Pages 时建议给仓库限速的大文件（音频超过 50MB 会推不上去，可压缩或传到音频平台外链）
- 记得把 `LICENSE` 里的 `<你的名字>` 换成你自己

## 📁 目录结构

```
personal-site/
├── public/
│   ├── media/            ← 音频、封面图放这里
│   └── favicon.svg
├── src/
│   ├── data/content.js   ← ★ 全部内容在这里（唯一需要编辑的文件）
│   ├── pages/index.astro ← 页面结构
│   └── styles/global.css ← 外观样式
├── .github/workflows/deploy.yml ← GitHub Pages 自动部署
├── LICENSE               ← MIT 开源协议
└── dist/                 ← npm run build 的产物（不入库）
```

## 📄 协议

[MIT](./LICENSE) —— 欢迎 Fork、修改、做成你自己的样子。觉得有用点个 Star ⭐ 就是最好的支持。
