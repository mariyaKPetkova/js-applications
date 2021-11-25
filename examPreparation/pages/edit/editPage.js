import itemsService from "../../services/itemsService.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;
async function submitHandler(context, id, e){
    e.preventDefault();
    let formData = new FormData(e.target);

    form.invalidFields = {};

    const title = formData.get('title');
    if (title === "") {
        form.invalidFields.title = true;
    }

    const description = formData.get('description');
    if (description === "") {
        form.invalidFields.description = true;
    }

    const imageUrl = formData.get('imageUrl');
    if (imageUrl.trim() === '') {
        form.invalidFields.imageUrl = true;
    }
    const type = formData.get('type');
    if (type === "") {
        form.invalidFields.type = true;
    }

    if(Object.keys(form.invalidFields).length > 0){
        let templateResult = editTemplate(form);
        return context.renderView(templateResult);
    }

    let material = formData.get('material');

    let itemF = {
        title,
        description,
        imageUrl,
        type
    }

    let updateResult = await itemsService.edit(itemF, id);
    context.page.redirect('/home');
}

async function getView(context) {
    let id = context.params.id;
    let item = await itemsService.get(id);

    let boundSubmitHandler = submitHandler.bind(null, context, id);
    form = {
        submitHandler: boundSubmitHandler,
        values: {
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            type: item.type
        },
        invalidFields: {}
    }
    let templateResult = editTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}