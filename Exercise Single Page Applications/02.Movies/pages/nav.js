let section = undefined
function initialize(domEl){
    section = domEl
}
async function getView(){
    return section
}
const nav = {
    initialize,
    getView
}
export default nav