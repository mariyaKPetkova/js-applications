import changeView from "../navigation/changeView.js";

function redirectToLoginHandler(e){
    e.preventDefault();
    //since i'm not deleting stuff from the dom gotta zero out the form just in case
    let form = e.target.closest('form');
    form.reset();
    changeView('login');
}
export default redirectToLoginHandler;