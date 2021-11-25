
import nav from './nav/nav.js'
import page from './node_modules/page/page.mjs'
import allPage from './pages/all/allPage.js'
import createPage from './pages/create/createPage.js'
import detailsPage from './pages/details/detailsPage.js'
import editPage from './pages/edit/editPage.js'
import homePage from './pages/home/homePage.js'
import loginPage from './pages/login/loginPage.js'
import myProfile from './pages/myProfile/myProfile.js'
import registerPage from './pages/register/registerPage.js'
import renderingMiddleware from './rendering/renderingMiddleware.js'
import authService from './services/authService.js'

const navEl = document.querySelector('nav') // ! 
const viewEl = document.querySelector('main') // !
renderingMiddleware.initialize(viewEl, navEl)

page('/index.html', '/home')
page('/', '/home')
page('/home', renderingMiddleware.decorateContext, nav.getView, homePage.getView)

page('/login', renderingMiddleware.decorateContext, nav.getView, loginPage.getView)
page('/register', renderingMiddleware.decorateContext, nav.getView, registerPage.getView)
page('/logout', async (context) => { await authService.logout(); context.page.redirect('/login'); })
page('/details/:id', renderingMiddleware.decorateContext, nav.getView, detailsPage.getView)
page('/create', renderingMiddleware.decorateContext, nav.getView, createPage.getView);
page('/edit/:id', renderingMiddleware.decorateContext, nav.getView, editPage.getView)
page('/my-profile', renderingMiddleware.decorateContext, nav.getView, myProfile.getView)
page('/all-memes', renderingMiddleware.decorateContext, nav.getView, allPage.getView)
page.start()