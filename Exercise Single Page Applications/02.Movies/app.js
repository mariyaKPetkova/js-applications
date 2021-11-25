import addMoviePage from "./pages/addMovie.js"
import editMoviePage from "./pages/editMovie.js"
import loginPage from "./pages/login.js"
import detailMoviePage from "./pages/movieDetails.js"
import registerPage from "./pages/register.js"
import homePage from "./pages/home.js"
import nav from "./pages/nav.js"
import viewFinder from "./viewFinder.js"

setup()

async function setup() {

    const mainEl = document.querySelector('#main')

    loginPage.initialize(document.querySelector('#form-login'))
    addMoviePage.initialize(document.querySelector('#add-movie'))
    registerPage.initialize(document.querySelector('#form-sign-up'))
    editMoviePage.initialize(document.querySelector('#edit-movie'))
    detailMoviePage.initialize(document.querySelector('#movie-details'))
    homePage.initialize(document.querySelector('#home-page'))
    nav.initialize(document.querySelector('#container'))
    viewFinder.initialize(document.querySelectorAll('.link'))
    viewFinder.navTo('home')

}


