import viewFinder from "../viewFinder.js"
import homePage from "./home.js"
import { jsonRequest } from "./httpService.js"

export function setAuthToken(token){
    localStorage.setItem('authToken',token)
}
export function getAuthToken(token){
    return localStorage.getItem('authToken')
}
export function isLoggedIn(){
    return localStorage.getItem('authToken') != null
}
export async function logout(){
    let result = await jsonRequest('http://localhost:3030/users/logout','get',undefined,true,true)
    localStorage.clear()
    //return homePage.getView()
    return viewFinder.redirectTo('login')
}
const auth = {
    setAuthToken,
    getAuthToken,
    isLoggedIn,
    logout
}
export default auth