import isLogged from "./auth/isLogged.js";
import changeHeader from "./navigation/changeHeader.js";
import navbarClickHandler from "./eventHandlers/navbarClickHandler.js";
import dashboardClickHandler from "./eventHandlers/dashboardClickHandler.js";
import getStartedBtnClickHandler from "./eventHandlers/getStartedBtnClickHandler.js";
import changeView from "./navigation/changeView.js";

//getting DOM items
const navbar = document.querySelector('.navbar');

//Adding Event Listeners
navbar.addEventListener('click', navbarClickHandler);

//checking if logged and changing the header accrodingly
if(isLogged()) changeHeader.logged();
if(!isLogged()) changeHeader.notLogged();

changeView('home');