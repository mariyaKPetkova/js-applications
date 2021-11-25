import { jsonRequest } from "../helpers/jsonRequest.js"

const url = 'http://localhost:3030/users'

function getAuthToken() {
    return localStorage.getItem('authToken')
}
function getUsername() {
    return localStorage.getItem('username')
}
function getUserId() {
    return localStorage.getItem('userId')
}
function isLogin() {
    return localStorage.getItem('authToken') !== null
}
async function login(user) {
    const result = await jsonRequest(`${url}/login`, 'Post', user)
    localStorage.setItem('authToken', result.accessToken)
    localStorage.setItem('userId', result._id)
    localStorage.setItem('username', result.email)
}
async function register(user) {
    const result = await jsonRequest(`${url}/register`, 'Post', user)
    localStorage.setItem('authToken', result.accessToken)
    localStorage.setItem('userId', result._id)
    localStorage.setItem('username', result.email)
}
async function logout() {
    await jsonRequest(`${url}/logout`, 'Get', undefined, true, true)
    localStorage.clear()
    
}
export default {
    getAuthToken,
    getUsername,
    getUserId,
    isLogin,
    login,
    register,
    logout
}

// let baseUrl = 'http://localhost:3030/users';

// function setUser(user) {
//     localStorage.setItem('user', JSON.stringify(user));
// }

// function getUser() {
//     let user = localStorage.getItem('user') === null
//         ? undefined
//         : JSON.parse(localStorage.getItem('user'));

//     return user;
// }

// async function login(user) {
//     let result = await jsonRequest(`${baseUrl}/login`, 'Post', user);
//     setUser(result);
// }

// async function register(user) {
//     let result = await jsonRequest(`${baseUrl}/register`, 'Post', user);
//     setUser(result);
// }

// async function logout() {
//     await jsonRequest(`${baseUrl}/logout`, 'Get', undefined, true, true);
//     localStorage.clear();
// }

// export default {
//     setUser,
//     getUser,
//     login,
//     register,
//     logout
// }
