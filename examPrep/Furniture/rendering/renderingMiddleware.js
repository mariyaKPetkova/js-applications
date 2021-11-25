import { render } from "./../node_modules/lit-html/lit-html.js";

let viewContainer = undefined
let navContainer = undefined

function initialize(viewContainerDomEl, navContainerDomEl){
viewContainer = viewContainerDomEl
navContainer = navContainerDomEl
}
async function renderView (templateResult){
    render(templateResult, viewContainer )
}
async function renderNavigation (templateResult){
    render(templateResult, navContainer )
}
function decorateContext (context,next){
    context.renderView = renderView
    context.renderNavigation = renderNavigation
    next()
}
export default {
    initialize,
    renderView,
    renderNavigation,
    decorateContext
}