import createElement from "../helper/createElement.js";
import fetcher from "../utils/fetcher.js";

async function createDashboard(){
    clearDashboard();
    const dashboard = document.querySelector('#dashboard-holder');
    let ideaData = await fetcher.getAllIdeas();
    if(ideaData.length ===0){
        createElement('h1','No ideas yet! Be the first one :)','', dashboard);
        return
    }
    let fragment = new DocumentFragment();
    ideaData.forEach(x => fragment.appendChild(createDashCard(x)));
    dashboard.appendChild(fragment);
}
function createDashCard(data){
    //wish I knew templating
    let cardMain = createElement('div','','card overflow-hidden current-card details');
    cardMain.style.width = '20rem';
    cardMain.style.height = '18rem';
    let cardBody = createElement('div','','card-body',cardMain);
    createElement('p',data.title,'card-text',cardBody);
    let img = createElement('img','','card-image',cardMain);
    img.src = data.img;
    img.alt = 'Card image cap';
    let detailsBtn =createElement('a','Details','btn',cardMain);
    detailsBtn.dataset.id = data._id;
    return cardMain;
}
function clearDashboard(){
    const dashboard = document.querySelector('#dashboard-holder');
    dashboard.innerHTML = ""; // easiest and fastest damn way to do it no idea why they don't introduce .flush() or something
}
export default {
    createDashboard,
    clearDashboard
}