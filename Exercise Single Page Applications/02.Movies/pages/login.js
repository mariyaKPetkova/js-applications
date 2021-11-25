import viewFinder from "../viewFinder.js"
import auth from "./auth.js"
import { jsonRequest } from "./httpService.js"

let section = undefined
function initialize(domEl){
    section = domEl
    const form = section.querySelector('#login-form')
    form.addEventListener('submit', loginUser)
}
async function getView(){
    return section
}
async function loginUser(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const url = `http://localhost:3030/users/login`
    const result = await jsonRequest(url,'post', user)
    auth.setAuthToken(result.accessToken)
    form.reset()
    viewFinder.navTo('home')
}
const loginPage = {
    initialize,
    getView
}
export default loginPage