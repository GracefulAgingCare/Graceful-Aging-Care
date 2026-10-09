import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMetaEntries, getPageMetadata, getSiteUrl, getStructuredData } from "./siteMetadata.js";

const siteUrl = getSiteUrl(import.meta.env.VITE_SITE_URL);

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = getPageMetadata(pathname, siteUrl);
    document.title = metadata.title;
    document.head.querySelectorAll("[data-page-seo]").forEach((element) => element.remove());
    getMetaEntries(metadata).forEach(([attribute, key, content]) => {
      const element = document.createElement("meta");
      element.setAttribute(attribute, key);
      element.content = content;
      element.dataset.pageSeo = "";
      document.head.append(element);
    });
    if (metadata.canonical) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = metadata.canonical;
      canonical.dataset.pageSeo = "";
      document.head.append(canonical);
    }
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.pageSeo = "";
    schema.textContent = JSON.stringify(getStructuredData(siteUrl));
    document.head.append(schema);
  }, [pathname]);
  return null;
}
