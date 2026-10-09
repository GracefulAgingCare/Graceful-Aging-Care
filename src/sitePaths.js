export const basePath = import.meta.env.BASE_URL;
export const routerBasename = basePath.replace(/\/+$/, "") || "/";

// Public assets and route URLs must stay inside the GitHub Pages project path.
export function assetUrl(path) {
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path.replace(/^\/+/, "")}`;
}

export function routePathname(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (routerBasename === "/") return path;
  if (path === routerBasename) return "/";
  if (path.startsWith(`${routerBasename}/`)) return path.slice(routerBasename.length);
  return null;
}
