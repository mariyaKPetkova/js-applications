import create from "./pages/create.js";
import dashboard from "./pages/dashboard.js";
import details from "./pages/details.js";
import home from "./pages/home.js";
import login from "./pages/login.js";
import nav from "./pages/nav.js";
import register from "./pages/register.js";

const routing = { init, routingHandler, redirectToPage, returnViewPromise };

let routingElements;
let routeIdentifier;
let passMeTheViewFunc;

let route = {
  create: () => create.getView(),
  dashboard: () => dashboard.getView(),
  details: (id) => details.getView(id),
  home: () => home.getView(),
  login: () => login.getView(),
  logout: () => nav.logOut(),
  nav: () => nav.getView(),
  register: () => register.getView(),
};

function init(loc, identifier, mainChangeViewFunc) {
  routingElements = loc;
  routeIdentifier = identifier;
  passMeTheViewFunc = mainChangeViewFunc;
  [...routingElements].map((re) => re.addEventListener("click", routingHandler));
}

function routingHandler(ev) {
  let element = ev.target.closest(routeIdentifier);
  //   console.log(element.dataset.route);
  redirectToPage(element.dataset.route);
}

function redirectToPage(key) {
  let id;
  [key, id] = key.split("/");
  //   console.log(key, id);
  if (route.hasOwnProperty(key)) {
    passMeTheViewFunc(route[key](id));
  } else {
    throw new Error(`route obj does not have this key: ${key}`);
  }
}

function returnViewPromise(key) {
  return route[key]();
}

export default routing;
