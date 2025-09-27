// Node 18+ (全局 fetch)。零依赖，粗粒度解析即可。
import fs from "fs";

const ROUTES = JSON.parse(fs.readFileSync("routes.json", "utf8")).urls;

const re = {
  title: /<title[^>]*>([\s\S]*?)<\/title>/i,
  h1: /<h1[\s>]/gi,
  metaDesc: /<meta\s+name=["']description["'][^>]*>/i,
  nav: /<nav[\s>]/i,
  login: /href=["'][^"']*\/ski\/login\/?["']/i,
  register: /href=["'][^"']*\/ski\/register\/?["']/i,
  terms: /href=["'][^"']*\/ski\/terms\/?["']/i,
  privacy: /href=["'][^"']*\/ski\/privacy\/?["']/i,
  forgot: /忘记密码|重置密码|找回密码/i
};

const results = [];

console.log("Auditing", ROUTES.length, "pages...\n");

for (const url of ROUTES) {
  const item = { url };
  try {
    const res = await fetch(url, { redirect: "follow" });
    item.status = res.status;
    item.ok = res.ok;
    const html = await res.text();

    const titleMatch = html.match(re.title);
    item.title = titleMatch ? titleMatch[1].trim() : "";
    item.h1Count = (html.match(re.h1) || []).length;
    item.hasMetaDesc = re.metaDesc.test(html);
    item.hasNav = re.nav.test(html);
    item.hasLoginLink = re.login.test(html);
    item.hasRegisterLink = re.register.test(html);
    item.hasTermsLink = re.terms.test(html);
    item.hasPrivacyLink = re.privacy.test(html);
    item.hasForgot = re.forgot.test(html);
  } catch (e) {
    item.status = 0;
    item.ok = false;
    item.error = String(e);
  }
  results.push(item);
  const mark = item.ok ? "OK " : "ERR";
  console.log(`${mark} ${String(item.status).padEnd(3)}  ${url}`);
}

fs.writeFileSync("audit-result.json", JSON.stringify(results, null, 2), "utf8");

// 生成整改清单
const lines = ["# Ski 站点体检整改清单 (auto-generated)\n"];

for (const r of results) {
  lines.push(`\n## ${r.url}`);
  // 可达性
  if (!r.ok) {
    lines.push("- [ ] **页面不可达/非 2xx**：请检查路由、构建产物或文件命名（GitHub Pages 区分大小写）。");
    continue; // 其他检测无需列
  }
  // SEO/语义
  if (!r.title) lines.push("- [ ] **缺少 `<title>`**：补齐页面专属标题（含关键词与站点名）。");
  if (r.h1Count !== 1) lines.push(`- [ ] **H1 数量异常**：当前 ${r.h1Count}；建议每页仅 1 个 H1，其余用 H2/H3 分级。`);
  if (!r.hasMetaDesc) lines.push("- [ ] **缺少 `<meta name=\"description\">`**：补关键词与 120–160 字描述。");
  if (!r.hasNav) lines.push("- [ ] **缺少 `<nav>`**：建议加语义化导航并高亮当前路由。");

  // 关键链接（法务、认证路径）
  if (!r.hasLoginLink) lines.push("- [ ] **未检测到登录链接**（如需登录入口，导航或页脚补齐至 /ski/login）。");
  if (!r.hasRegisterLink) lines.push("- [ ] **未检测到注册链接**（如需注册入口，补齐至 /ski/register）。");
  if (!r.hasTermsLink) lines.push("- [ ] **未检测到服务条款链接**（推荐 /ski/terms）。");
  if (!r.hasPrivacyLink) lines.push("- [ ] **未检测到隐私政策链接**（推荐 /ski/privacy）。");

  // 登录页专属
  if (r.url.endsWith("/login") || r.url.endsWith("/login/")) {
    if (!r.hasForgot) lines.push("- [ ] **登录页缺少“忘记密码/重置密码”提示或链接**。");
  }

  // 注册页专属
  if (r.url.endsWith("/register") || r.url.endsWith("/register/")) {
    // 可根据需要再加手机号/密码强度等检测（这里保持轻量）
    lines.push("- [ ] **注册页建议**：标注密码规则并前端即时校验用户名唯一性。");
  }
}

fs.writeFileSync("issues.md", lines.join("\n"), "utf8");
console.log("\nDone. 已生成 audit-result.json 与 issues.md");
