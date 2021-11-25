import changeView from "../navigation/changeView.js";

function navbarClickHandler(e){
    e.preventDefault(); // stopping link from refreshing
    let view = e.target.dataset.view 
    if(view){
        changeView(view);
    }
}
export default navbarClickHandler;