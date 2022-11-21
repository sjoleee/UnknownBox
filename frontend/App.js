import { qs } from "./utils/index.js";
import routes from "./router/index.js";
import { Header } from "./components/Layout/header.js";
import { Footer } from "./components/Layout/footer.js";
import { BASE_URL } from "./constants/url.js";

const navigateTo = url => {
  window.history.pushState(null, null, url);
  App();
};

const pathToRegex = path =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const App = async () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
  }

  const params = [];
  const pageMatches = routes.map(route => {
    const parsedPath = window.location.pathname.match(pathToRegex(route.path));

    if (parsedPath) {
      params.push(...parsedPath.filter((param, idx) => idx !== 0));
    }
    return {
      route,
      result: parsedPath
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.result);

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: true
    };
  } else if (!match.route.isPublic && !localStorage.getItem("accessToken")) {
    match = {
      route: routes[2],
      result: true
    };
  } else if (match.route?.isAdmin && localStorage.getItem("role") !== "admin") {
    match = {
      route: routes[routes.length - 1],
      result: true
    };
  }

  new Header(qs("#header"));
  new match.route.view(qs("#app"), params);
  new Footer(qs("#footer"));
};

window.addEventListener("popstate", App);

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  document.body.addEventListener("click", e => {
    const target = e.target.closest("a");
    if (!(target instanceof HTMLAnchorElement)) return;
    e.preventDefault();
    const targetURL = target.href.replace(BASE_URL, "");
    navigateTo(targetURL);
  });

  App();
});
