// ============================================================
//  MeloMemo 站点内容与文案（改这里就能改站）
//  · 站点品牌、副标题、介绍、标签
//  · 首页推荐的歌曲 / 视频 / 作品（可选，留空则不显示）
//  · 留言板、联系方式、页脚
//  说明：社区部分（注册、发布、关注）的数据在 Supabase，不在这里。
// ============================================================

export default {

  // ---------- 品牌与基本信息 ----------
  brand: "MeloMemo",              // 站点名，导航与页脚使用
  name: "乔十一",                  // 站长昵称（关于我）
  slogan: "唱给懂你的人听 🎤",      // 首页副标题，打字机效果显示
  tagline: "上传你的翻唱与原创，关注喜欢的声音——音乐是交朋友最快的路。",
  about: "我是乔十一，一个爱唱歌的人。\n自己做翻唱，也自己写歌。MeloMemo 一开始只是我放歌的小屋，后来想明白了：一个人的歌单太小，一群人的才热闹。\n所以这里做成了一个公共的音乐角落——你上传一首，我上传一首，互相听听，点个关注，也许就聊上了。",

  // 头像（可选）：图片放进 public/，比如 avatar.jpg，这里就填 "/avatar.jpg"
  avatar: "",

  // ---------- 平台卖点（首页三张卡片） ----------
  features: [
    { icon: "⬆️", title: "一首歌就能上线", desc: "注册后直接上传音频，填个标题和一句说明就发布，不需要审核排队。" },
    { icon: "🎧", title: "边听边认识人", desc: "点开作品顺手听，喜欢就关注作者；对方也关注你时会标出「互相关注」。" },
    { icon: "💬", title: "想聊就聊", desc: "在作品下留言，或在留言板打个招呼——比起点赞，一句回复更像交朋友。" },
  ],

  // ---------- 站长自己的歌（首页「我的歌声」，可选） ----------
  // { title: "歌曲名", note: "翻唱 · 2026", file: "/media/歌.mp3", cover: "/media/封面.jpg" }
  songs: [],

  // ---------- 视频（可选，推荐 B 站 / YouTube 嵌入链接） ----------
  // B 站：https://player.bilibili.com/player.html?bvid=BVxxxxxx&autoplay=0
  videos: [],

  // ---------- 项目 / 其他作品（可选） ----------
  projects: [],

  // ---------- 首页展示的风格关键词 ----------
  tags: ["翻唱", "民谣", "流行", "吉他", "原创"],

  // ---------- 留言板（giscus，基于 GitHub Discussions） ----------
  comments: {
    repo: "qiaoshiyi/MeloMemo",
    repoId: "R_kgDOVlreNw",
    category: "General",
    categoryId: "DIC_kwDOVlreN84DKjhx",
  },

  // ---------- 联系方式（留空 "" 就不显示） ----------
  contact: {
    github: "https://github.com/qiaoshiyi",
    issues: "https://github.com/qiaoshiyi/MeloMemo/issues", // 反馈 / 举报 / 版权投诉入口
    bilibili: "",
    email: "",
  },

  // ---------- 页脚（年份自动填充，不用每年改） ----------
  footer: "MeloMemo · 音乐是交朋友最快的路",
};
