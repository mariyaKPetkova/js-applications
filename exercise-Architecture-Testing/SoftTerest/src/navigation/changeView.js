import isLogged from "../auth/isLogged.js";
import logout from "../auth/logout.js";
import homePage from "../pages/homePage.js";
import changeHeader from "./changeHeader.js";
import register from "../auth/register.js";
import login from "../auth/login.js";
import redirectToRegisterHandler from "../eventHandlers/redirectToRegisterHandler.js";
import redirectToLoginHandler from "../eventHandlers/redirectToLoginHandler.js";
import createFormSubmitHandler from "../eventHandlers/createFormSubmitHandler.js";
import createPage from "../pages/createPage.js";
import registerPage from "../pages/registerPage.js";
import loginPage from "../pages/loginPage.js";
import dashboardClickHandler from "../eventHandlers/dashboardClickHandler.js";
import getStartedBtnClickHandler from "../eventHandlers/getStartedBtnClickHandler.js";
import singleIdeaPage from "../pages/singleIdeaPage.js";
import dashboardPage from "../pages/dashboardPage.js";
import dashboardCreator from "../pages/dashboardCreator.js";

// had to redo it all as the damn description sasys i can hide unhide but the tests look for it to be recreated so innerHTML GALOREEEEEEEE
function changeView(view, movieId){
    const root = document.querySelector('#root');
    root.innerHTML = '';
    switch(view){
        case 'register':
            root.innerHTML = registerPage.init();
            const registerForm = document.querySelector('#register-holder form');
            const loginRedirect = document.querySelector('#register-holder .sign-in-link');
            registerForm.addEventListener('submit', register);
            loginRedirect.addEventListener('click', redirectToLoginHandler);
            break;
        case 'login':
            root.innerHTML = loginPage.init();
            const loginForm = document.querySelector('#login-holder form');
            const signUpRedirect = document.querySelector('#login-holder .register-link');
            loginForm.addEventListener('submit', login);
            signUpRedirect.addEventListener('click', redirectToRegisterHandler);
            break;
        case 'home':
            //checking if logged and changing the header accrodingly
            if(isLogged()) changeHeader.logged();
            if(!isLogged()) changeHeader.notLogged();
            root.innerHTML = homePage.init();
            //No idea what this button is supposed to do it is not explained in the doc
            const getStartedBtn = document.querySelector('#home-holder .btn');
            getStartedBtn.addEventListener('click', getStartedBtnClickHandler);
            break;
        case 'logout': //probably shouldn't be here
            logout();
            break;
        case 'dashboard':
            root.innerHTML = dashboardPage.init();
            const dashboardDiv = document.querySelector('#dashboard-holder');
            dashboardCreator.createDashboard(dashboardDiv);
            document.querySelector('#dashboard-holder').classList.remove('hidden');
            const dashboard = document.querySelector('#dashboard-holder');
            dashboard.addEventListener('click', dashboardClickHandler);
            break;
        case 'single':
            root.innerHTML = singleIdeaPage.init();
            
            break;
        case 'create':
            root.innerHTML = createPage.init();
            const createForm = document.querySelector('#create-holder form');
            createForm.addEventListener('submit', createFormSubmitHandler);
            break;
     }
}
export default changeView;