import viewFinder from "../viewFinder.js"
import auth from "./auth.js"
import { jsonRequest } from "./httpService.js"

let section = undefined
function initialize(domEl) {
    section = domEl
    const form = section.querySelector('#register-form')
    form.addEventListener('submit', registerUser)
}
async function getView() {
    return section
}
async function registerUser(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    let email = formData.get('email')
    let password = formData.get('password')
    let repeatPassword = formData.get('repeatPassword')
    if (email === '' || password === '' || password.length < 6 || password != repeatPassword) {
        alert('Fields must not be empty and passwords must match')
    }
    const user = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const url = `http://localhost:3030/users/register`
    const result = await jsonRequest(url, 'post', user)
    auth.setAuthToken(result.accessToken)
    section.querySelector('#register-form').reset()
    viewFinder.navTo('home')
}
const loginPage = {
    initialize,
    getView
}
export default loginPage