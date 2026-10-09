import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { assetUrl, routerBasename } from "./sitePaths.js";

export function render(url) {
  return renderToString(<StaticRouter basename={routerBasename} location={assetUrl(url)}><App /></StaticRouter>);
}
