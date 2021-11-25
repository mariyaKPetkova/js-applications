import nav from "./pages/nav.js";

const auth = {
  clearLocalStorage,
  askServer,
  isLoggedIn,
  getUserName,
  getUserId,
  register,
  login,
  logout,
};

const baseUrl = "http://localhost:3030";
const registerUrl = `${baseUrl}/users/register`;
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;

async function register(dataObj) {
  try {
    let res = await askServer(registerUrl, "post", dataObj, true);
    console.log(res);
    localStorage.setItem("userId", res._id);
    localStorage.setItem("userToken", res.accessToken);
    localStorage.setItem("userEmail", res.email);
    nav.logIn();
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

async function login(dataObj) {
  try {
    let res = await askServer(loginUrl, "post", dataObj, true);
    localStorage.setItem("userId", res._id);
    localStorage.setItem("userToken", res.accessToken);
    localStorage.setItem("userEmail", res.email);
    nav.logIn();
  } catch (err) {
    throw new Error(err.message);
  }
}
// logout
async function logout() {
  try {
    await askServer(logoutUrl, "get", undefined, false, true);
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    nav.logOut();
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

function clearLocalStorage() {
  localStorage.clear();
}

function isLoggedIn() {
  return getUserToken() === undefined ? false : true;
}

function getUserName() {
  return localStorage.getItem("userEmail");
}

function getUserId() {
  return localStorage.getItem("userId");
}

function getUserToken() {
  return localStorage.getItem("userToken");
}

async function askServer(url, method = "get", body, skipReply, isLogged) {
  method = method.toLowerCase();
  const headers = {};

  if (typeof body === "object") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  if (isLogged) {
    headers["X-Authorization"] = getUserToken();
  }

  let answer = await fetch(url, { headers, method, body });

  if (!answer.ok) {
    let res = await answer.json();
    // console.log(JSON.stringify(res));
    throw new Error(JSON.stringify(res));
  }

  if (skipReply) {
    return await answer.json();
  }

  return answer;
}

export default auth;
