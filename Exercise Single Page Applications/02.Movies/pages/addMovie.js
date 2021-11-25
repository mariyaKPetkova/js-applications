let section = undefined
export function initialize(domEl){
    section = domEl
}
export async function getView(){
    return section
}
const addMoviePage = {
    initialize,
    getView
}
export default addMoviePage