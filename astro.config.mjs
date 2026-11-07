import { defineConfig } from 'astro/config';

// MeloMemo：纯静态站点，部署在 GitHub Pages + 自定义域 melomemo.cn
// 构建产物在 dist/，由 scripts/fix-paths.mjs 把 /_astro/ 改写成相对路径
//（这样同一份构建在根域和 github.io/MeloMemo/ 子路径下都能用）
export default defineConfig({
  site: 'https://melomemo.cn',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
});
