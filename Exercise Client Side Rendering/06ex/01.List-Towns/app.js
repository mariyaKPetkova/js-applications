import { render } from "./../node_modules/lit-html/lit-html.js";
import { allTowns } from "./templates/towns.js";
const rootEl = document.querySelector('#root')
const formEl = document.querySelector('#form')
formEl.addEventListener('submit', showTowns)

function showTowns(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const townsStr = form.get('towns')
    const townsArr = townsStr.split(', ')

    render(allTowns(townsArr), rootEl)
}