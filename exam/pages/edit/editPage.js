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

    const summary = formData.get('summary');
    if (summary === "") {
        form.invalidFields.summary = true;
    }

    const imageUrl = formData.get('imageUrl');
    if (imageUrl.trim() === '') {
        form.invalidFields.imageUrl = true;
    }
    const category = formData.get('category');
    if (category === "") {
        form.invalidFields.category = true;
    }
    const maxLevel = formData.get('maxLevel');
    if (maxLevel === "") {
        form.invalidFields.maxLevel = true;
    }

    if(Object.keys(form.invalidFields).length > 0){
        let templateResult = editTemplate(form);
        return context.renderView(templateResult);
    }

    

    let itemF = {
        title,
        summary,
        imageUrl,
        category,
        maxLevel
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
            summary: item.summary,
            imageUrl: item.imageUrl,
            category: item.category,
            maxLevel:item.maxLevel
        },
        invalidFields: {}
    }
    let templateResult = editTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}