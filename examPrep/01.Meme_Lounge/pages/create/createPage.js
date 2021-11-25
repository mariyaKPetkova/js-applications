import itemsService from "../../services/itemsService.js";
import { createTemplate } from "./createTemplate.js";

let form = undefined;
async function submitHandler(context, e){
    e.preventDefault();
    const formData = new FormData(e.target);

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
        const templateResult = createTemplate(form);
        return context.renderView(templateResult);
    }

    const newItem = {
        title,
        description,
        imageUrl: imageUrl
    }

    await itemsService.create(newItem);
    context.page.redirect('/all-memes');
}

async function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            title: true,
            description: true,
            imageUrl: true
        }
    }
    const templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}