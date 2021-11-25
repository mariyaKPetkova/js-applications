let section = undefined
function initialize(domEl){
    section = domEl
}
async function getView(){
    return section
}
const detailMoviePage = {
    initialize,
    getView
}
export default detailMoviePage