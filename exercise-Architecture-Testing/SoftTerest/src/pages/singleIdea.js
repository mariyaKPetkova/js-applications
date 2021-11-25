import deleteIdeaHandler from "../eventHandlers/deleteIdeaHandler.js";
import createElement from "../helper/createElement.js";
import fetcher from "../utils/fetcher.js";

async function create(id){
    const singleHolder = document.querySelector('#single-holder');
    clear();
    let data = await fetcher.getSingleIdea(id);
    let fragment = new DocumentFragment();
    let img = createElement('img','','det-img',fragment);
    img.src = data.img;
    let desc = createElement('div','','desc',fragment);
    createElement('h2',data.title,'display-5',desc);
    createElement('p','Description:','infoType',desc);
    createElement('p',data.description,'idea-description',desc);
    if(data._ownerId === localStorage.getItem('userId')){
        let div = createElement('div','','text-center',fragment);
        let btn = createElement('a','Delete','btn detb',div);
        btn.dataset.id = id;
        btn.addEventListener('click', deleteIdeaHandler)
    }   
    singleHolder.appendChild(fragment);
}
function clear(){
    const singleHolder = document.querySelector('#single-holder');
    singleHolder.innerHTML = '';
}
export default{
    create
}