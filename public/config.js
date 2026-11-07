// ============================================================
//  MeloMemo 平台配置 —— Supabase 接入
//    url      形如 "https://xxxxx.supabase.co"
//    anonKey  是公开密钥（anon public），可以安全放在前端
//    captchaSiteKey  是 hCaptcha 的「站点密钥」(site key)，同样公开；
//                    真正的 secret key 只填在 Supabase 后台，绝不放到前端。
//  留空 captchaSiteKey 则登录/注册不显示人机验证。
// ============================================================
window.MELO_CONFIG = {
  url: "https://mhfhbuivdwmdhqikjryu.supabase.co",
  anonKey: "sb_publishable_DpQ1DR4l-JPXqqmAi4Hcvw_ZHvnvK8K",
  captchaSiteKey: "baf69136-808c-451e-a16e-3594a5b6af7e",
};
