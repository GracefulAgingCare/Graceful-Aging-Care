import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, loadEnv } from "vite";
import { getMetaEntries, getPageMetadata, getSiteUrl, getStructuredData, pageMetadata } from "../src/siteMetadata.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");
const environment = loadEnv("production", root, "VITE_");
const siteUrl = getSiteUrl(environment.VITE_SITE_URL);
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
const template = await readFile(join(output, "index.html"), "utf8");
const server = await createServer({ root, mode: "production", server: { middlewareMode: true }, appType: "custom" });

try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  for (const path of [...Object.keys(pageMetadata), "/404"]) {
    const metadata = getPageMetadata(path, siteUrl);
    const head = [
      `<title>${escape(metadata.title)}</title>`,
      ...getMetaEntries(metadata).map(([attribute, key, content]) => `<meta data-page-seo ${attribute}="${escape(key)}" content="${escape(content)}" />`),
      ...(metadata.canonical ? [`<link data-page-seo rel="canonical" href="${escape(metadata.canonical)}" />`] : []),
      `<script data-page-seo type="application/ld+json">${JSON.stringify(getStructuredData(siteUrl)).replace(/</g, "\\u003c")}</script>`,
    ].join("\n    ");
    const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${head}\n    <!--seo:end-->`).replace('<div id="root"></div>', () => `<div id="root" data-route="${escape(path)}">${render(path)}</div>`);
    const destination = join(output, path === "/" ? "index.html" : path === "/404" ? "404.html" : `${path.slice(1)}/index.html`);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html);
  }
  await writeFile(join(output, ".nojekyll"), "");
  const publicPath = siteUrl ? `${new URL(siteUrl).pathname.replace(/\/+$/, "")}/` : "/";
  await writeFile(join(output, "robots.txt"), `User-agent: *\nAllow: ${publicPath}\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`);
  if (siteUrl) {
    const urls = Object.keys(pageMetadata).map((path) => `  <url><loc>${escape(getPageMetadata(path, siteUrl).canonical)}</loc></url>`).join("\n");
    await writeFile(join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  }
  console.log(`Prerendered 4 pages and a 404 page. ${siteUrl ? "Canonical URLs and sitemap generated." : "Set VITE_SITE_URL to generate canonical URLs and a sitemap for your domain."}`);
} finally {
  await server.close();
}
