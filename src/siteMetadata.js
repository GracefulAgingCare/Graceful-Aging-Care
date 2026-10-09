import { businessContact } from "./businessContact.js";

export const pageMetadata = {
  "/": {
    title: "Home Care in Charlotte, NC | Graceful Aging Care",
    description: "Compassionate non-medical home care in Charlotte, NC. Discover personalized personal care, companionship, and home support with Graceful Aging Care.",
  },
  "/about": {
    title: "Home Care Services in Charlotte, NC | Graceful Aging Care",
    description: "Explore personal care, companionship, home support, medication reminders, and flexible non-medical care arrangements at Graceful Aging Care in Charlotte.",
  },
  "/founder": {
    title: "Meet Our Founder | Graceful Aging Care, Charlotte",
    description: "Meet the founder of Graceful Aging Care and discover the story of family, perseverance, and compassion behind our Charlotte non-medical home care agency.",
    image: "/images/founder.webp",
    imageAlt: "The founder of Graceful Aging Care",
  },
  "/contact": {
    title: "Contact Us About Home Care | Graceful Aging Care",
    description: "Start a conversation with Graceful Aging Care in Charlotte, North Carolina. Tell us about the personal care, companionship, or home support your family needs.",
  },
};

export function getSiteUrl(value = "") {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) {
      return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
    }
  } catch { /* Leave canonical URLs unset until the real domain is provided. */ }
  return "";
}

export function getPageMetadata(pathname, siteUrl = "") {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = pageMetadata[path];
  const imagePath = page?.image || "/images/family-at-home.webp";
  const publicUrl = getSiteUrl(siteUrl);
  return {
    title: page?.title || "Page Not Found | Graceful Aging Care",
    description: page?.description || "This page could not be found. Explore Graceful Aging Care's non-medical home care services in Charlotte, North Carolina.",
    robots: page ? "index, follow, max-image-preview:large" : "noindex, follow",
    canonical: page && publicUrl ? `${publicUrl}${path === "/" ? "/" : `${path}/`}` : "",
    image: publicUrl ? `${publicUrl}${imagePath}` : "",
    imageAlt: page?.imageAlt || "Children enjoying time together at home",
  };
}

export function getStructuredData(siteUrl = "") {
  const publicUrl = getSiteUrl(siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Graceful Aging Care",
    legalName: "Graceful Aging Care LLC",
    email: businessContact.email,
    telephone: businessContact.phones[0].international,
    contactPoint: businessContact.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.international,
      email: businessContact.email,
      contactType: "customer service",
    })),
    description: "Compassionate, personalized non-medical home care based in Charlotte, North Carolina.",
    ...(publicUrl ? { url: `${publicUrl}/`, logo: `${publicUrl}/favicon.svg`, image: `${publicUrl}/images/family-at-home.webp` } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Charlotte", addressRegion: "NC", addressCountry: "US" },
    knowsAbout: ["Non-medical home care", "Personal care", "Companionship", "Home support"],
  };
}

export function getMetaEntries(meta) {
  return [
    ["name", "description", meta.description], ["name", "robots", meta.robots],
    ["property", "og:type", "website"], ["property", "og:site_name", "Graceful Aging Care"],
    ["property", "og:locale", "en_US"], ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["name", "twitter:card", meta.image ? "summary_large_image" : "summary"],
    ["name", "twitter:title", meta.title], ["name", "twitter:description", meta.description],
    ...(meta.canonical ? [["property", "og:url", meta.canonical]] : []),
    ...(meta.image ? [["property", "og:image", meta.image], ["property", "og:image:alt", meta.imageAlt], ["name", "twitter:image", meta.image], ["name", "twitter:image:alt", meta.imageAlt]] : []),
  ];
}
