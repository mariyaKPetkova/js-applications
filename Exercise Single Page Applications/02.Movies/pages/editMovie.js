let section = undefined
function initialize(domEl){
    section = domEl
}
async function getView(){
    return section
}
const editMoviePage = {
    initialize,
    getView
}
export default editMoviePage