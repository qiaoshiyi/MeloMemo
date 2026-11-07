// 构建后处理：把产物 HTML 里生成的绝对资源路径 (/_astro/...) 改写为相对路径
// 目的：同一个构建同时适配根路径域名（如 melomemo.cn）与子路径托管（如 qiaoshiyi.github.io/MeloMemo/）
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const distRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(distRoot)) {
  let html = readFileSync(file, 'utf8');
  // dist/app/index.html -> relative(...,'dist') = ".."（1 段）；dist/index.html -> ""（0 段）
  const ups = relative(dirname(file), distRoot).split(sep).filter(s => s === '..').length;
  const prefix = '../'.repeat(ups);
  const next = html.replace(/((?:href|src)=["'])\/_astro\//g, `$1${prefix}_astro/`);
  if (next !== html) {
    writeFileSync(file, next);
    changed++;
    console.log(`[fix-paths] ${relative(distRoot, file)}: /_astro/ -> ${prefix}_astro/`);
  }
}
console.log(`[fix-paths] done, ${changed} file(s) rewritten`);
