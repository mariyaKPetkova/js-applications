import { render } from "./../node_modules/lit-html/lit-html.js";
import { cats } from './catSeeder.js'
import { allCatsTemplate } from "./templates/catsTemplates.js";

render(allCatsTemplate(cats,showHide),document.querySelector('#allCats'))

export function showHide(e){
    const btn = e.target
    const infoDiv = btn.parentElement
    console.log(infoDiv);
    if(btn.textContent === 'Show status code'){
        infoDiv.children[1].classList.remove('hidden')
        btn.textContent = 'Hide status code'
    }else{
        infoDiv.children[1].classList.add('hidden')
        btn.textContent = 'Show status code'
    }
}