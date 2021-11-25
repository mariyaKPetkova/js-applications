import { render } from "./../node_modules/lit-html/lit-html.js";
import { allTownsTempl } from "./tempalte/townsTemp.js";
import { towns } from "./towns.js";

render(allTownsTempl(towns), document.querySelector('#towns'))

const searchedTown = document.querySelector('#searchText')
const matchesResult = document.querySelector('#result')
const btn = document.querySelector('button')
btn.addEventListener('click', search)
function search() {
   const liEls = Array.from(document.querySelectorAll('li'))
   let matches = 0
   cleaning()
   liEls.map(town => {
      if (town.textContent.includes(searchedTown.value)) {
         town.classList.add('active')
         matches += 1
      }
   })
   matchesResult.textContent = `${matches} matches found`
}

function cleaning(){
   matchesResult.textContent = ''
   Array.from(document.querySelectorAll('li')).map(town=> town.classList.remove('active'))
}

