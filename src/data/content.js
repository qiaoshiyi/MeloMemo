// ============================================================
//  这里是你唯一需要编辑的文件！
//  改名字、加歌曲、贴视频，都只动这个文件。
//  音频文件放进 public/media/ 文件夹，然后在这里引用 /media/文件名
// ============================================================

export default {

  // ---------- 基本信息 ----------
  name: "乔十一",               // 网站大标题
  slogan: "一个爱唱歌的人 🎤",    // 首页副标题，一句话介绍
  about: "在这里写一段关于自己的介绍。\n比如：我平时喜欢翻唱歌曲，也拍一些视频，欢迎来听、来看、交个朋友。",

  // 头像（可选）：把图片放进 public/ 文件夹，比如 avatar.jpg，然后填 "/avatar.jpg"
  avatar: "",

  // ---------- 唱歌音频 ----------
  // 用法示例：{ title: "歌曲名", note: "翻唱 · 2026", file: "/media/我的歌.mp3", cover: "/media/封面.jpg" }
  // cover 可以留空 ""（没有封面会自动显示一个音乐卡片）
  songs: [
    // 把你唱的 MP3 文件放进 public/media/ 后，取消下面这行的注释并改名字：
    // { title: "示例歌曲", note: "翻唱", file: "/media/demo.mp3", cover: "" },
  ],

  // ---------- 视频 ----------
  // 推荐把视频传到 B 站或 YouTube，然后贴"嵌入播放器链接"，比直接放视频文件快很多。
  // B 站格式：https://player.bilibili.com/player.html?bvid=这里是你的BV号&autoplay=0
  // YouTube 格式：https://www.youtube.com/embed/这里是视频ID
  videos: [
    // { title: "我的第一条视频", embed: "https://player.bilibili.com/player.html?bvid=BVxxxxxx&autoplay=0" },
  ],

  // ---------- 项目/作品（可选） ----------
  // { title: "作品名", desc: "一句话说明", link: "https://..." }
  projects: [],

  // ---------- 联系方式（留空 "" 就不显示） ----------
  contact: {
    github: "",            // 例如 "https://github.com/你的用户名"
    bilibili: "",          // 例如 "https://space.bilibili.com/你的空间号"
    email: "",             // 例如 "mailto:you@example.com" 或 "mailto:you@qq.com"
  },

  // ---------- 页脚 ----------
  footer: "© 2026 乔十一 · 用 Astro 搭建",
};
