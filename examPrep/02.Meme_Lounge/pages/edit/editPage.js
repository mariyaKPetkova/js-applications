
import itemsService from "../../services/itemsService.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;
async function submitHandler(context, id, e){
    e.preventDefault();
    let formData = new FormData(e.target);

    form.invalidFields = {};

    const title = formData.get('title');
    if(title.length == '') {
        form.invalidFields.title = true;
    }

    const description = formData.get('description');
    if(description.length == '') {
        form.invalidFields.description = true;
    }

    const imageUrl = formData.get('imageUrl');
    if(imageUrl.trim() === '') {
        form.invalidFields.imageUrl = true;
    }

    if(Object.keys(form.invalidFields).length > 0){
        let templateResult = editTemplate(form);
        return context.renderView(templateResult);
    }

    const newItem = {
        title,
        description,
        imageUrl: imageUrl
    }


    await itemsService.edit(newItem, id);
    context.page.redirect('/all-memes');
}

async function getView(context) {
    let id = context.params.id;
    await itemsService.get(id);

    let boundSubmitHandler = submitHandler.bind(null, context, id);
    
        form = {
            submitHandler: boundSubmitHandler,
            invalidFields: {
                title: true,
                description: true,
                imageUrl: true
            }
        }
    
    let templateResult = editTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}