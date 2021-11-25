import changeView from "../navigation/changeView.js";
import singleIdea from "../pages/singleIdea.js";

function dashboardClickHandler(e){
    if(!e.target.classList.contains('btn')){
        return;
    }
    changeView('single');
    singleIdea.create(e.target.dataset.id);
}
export default dashboardClickHandler;