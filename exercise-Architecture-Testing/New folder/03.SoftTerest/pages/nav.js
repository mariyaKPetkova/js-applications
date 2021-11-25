import routing from "../routing.js";

const nav = { init, getView, logIn, logOut };

let location;

function init(loc) {
  location = loc;
  //   console.log(loc);
}

function getView() {
  return location;
}

function logIn() {
  [...location.querySelectorAll(".user")].map((e) => e.classList.remove("hidden"));
  [...location.querySelectorAll(".guest")].map((e) => e.classList.add("hidden"));
  routing.redirectToPage("home");
  // console.log("logging in");
}
function logOut() {
  [...location.querySelectorAll(".user")].map((e) => e.classList.add("hidden"));
  [...location.querySelectorAll(".guest")].map((e) => e.classList.remove("hidden"));
  // console.log("logging out");
  return routing.returnViewPromise("home");
}

export default nav;
