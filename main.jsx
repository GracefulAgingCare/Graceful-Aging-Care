
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { assetUrl, routerBasename, routePathname } from "./sitePaths.js";

// Keep links saved from the earlier hash-based site working.
if (/^#\//.test(window.location.hash)) {
  const legacyPath = window.location.hash.slice(1);
  if (legacyPath.startsWith("/") && !legacyPath.startsWith("//") && !legacyPath.includes("\\")) {
    window.location.replace(assetUrl(legacyPath));
  }
}

const app = (
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root");
const currentPath = routePathname(window.location.pathname);
if (root.hasChildNodes() && root.dataset.route === currentPath) hydrateRoot(root, app);
else createRoot(root).render(app);
