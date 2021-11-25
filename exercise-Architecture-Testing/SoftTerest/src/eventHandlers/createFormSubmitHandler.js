import errorStyling from "../helper/errorStyling.js";
import changeView from "../navigation/changeView.js";
import fetcher from "../utils/fetcher.js";

async function createFormSubmitHandler(e){
    e.preventDefault();
    //gonna need the nodes for error handling
    let form = e.target;
    let title = form.querySelector('#title');
    let description = form.querySelector('textarea[name="description"]');
    let img = form.querySelector('input[name="imageURL"]');
     //Clearing any erros styling that has been applied
     errorStyling.clear(e); 
    let validated = true;
    if(title.value.trim().length < 6){
        validated = false;
        errorStyling.create('Title must be 6 characters or longer.', title)
    }
    if(description.value.trim().length < 10){
        validated = false;
        errorStyling.create('Description must be 10 characters or longer.', description)
    }
    if(img.value.trim().length < 5){
        validated = false;
        errorStyling.create('Image URL must be 5 characters or longer.', img)
    }
    if(!validated) return;

    let ideaObj = {
        title : title.value,
        description : description.value,
        img : img.value
    }
    let response = await fetcher.createIdea(ideaObj);
    if(response.ok){
        form.reset();
        changeView('dashboard');
        return;
    } else {
        alert('Something went wrong, please try again');
    }
}
export default createFormSubmitHandler;