import auth from "./pages/auth.js";
import homePage from "./pages/home.js";
import loginPage from "./pages/login.js";
import registerPage from "./pages/register.js";

const views = {
    'home': async()=> await homePage.getView(),
    'login':  async()=> await loginPage.getView(),
    'register': async()=> await registerPage.getView(),
    'logout':async()=> await auth.logout()
}

function initialize([...allLinkEl]) {
    allLinkEl.map(x => x.addEventListener('click', changeViewHandler))
}

export async function changeViewHandler(e) {
    const route = e.target.dataset.route
    navTo(route)
}

export async function navTo(route) {
    if (views.hasOwnProperty(route)) {
        const view = await views[route]()
        const mainEl = document.querySelector('#main')
        Array.from(mainEl.querySelectorAll('.view')).map(x => x.remove())
        mainEl.appendChild(view)
    }
}
export async function redirectTo(route){
    if (views.hasOwnProperty(route)) {
        const viewFn = views[route]()
        return viewFn
    }
}
const viewFinder = {
    initialize,
    changeViewHandler,
    navTo,
    redirectTo
}
export default viewFinder