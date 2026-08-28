import type { APIRoute } from "astro";
import { publishedGuideRoutes } from "../data/guidePages";
import { siteConfig } from "../data/site";

const urls = publishedGuideRoutes.map((route) => new URL(route, siteConfig.url).toString());

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
