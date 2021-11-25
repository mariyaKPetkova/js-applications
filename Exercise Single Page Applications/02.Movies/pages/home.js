let section = undefined

function initialize(domEl){
    section = domEl
}

async function getView(){
    return section
}
const homePage = {
    initialize,
    getView
}
export default homePage