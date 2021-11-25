import isLogged from "../auth/isLogged.js";
import changeView from "../navigation/changeView.js";

function getStartedBtnClickHandler(e){
    e.preventDefault();
    // if user is logged take him to create
    if(isLogged()) changeView('create');
    //If user is not logged take him to the login page
    if(!isLogged()) changeView('login');
}

export default getStartedBtnClickHandler;