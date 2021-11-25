import itemsService from "../../services/itemsService.js";
import { createTemplate } from "./createTemplate.js";

let form = undefined;
async function submitHandler(context, e) {
    e.preventDefault();
    const formData = new FormData(e.target);

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

    if (Object.keys(form.invalidFields).length > 0) {
        const templateResult = createTemplate(form);
        return context.renderView(templateResult);
    }

    const newItem = {
        title,
        summary,
        imageUrl,
        category,
        maxLevel
    }

    await itemsService.create(newItem);
    context.page.redirect('/home');
}

async function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            title: true,
            summary: true,
            imageUrl: true,
            type: true,
            maxLevel:true
        }
    }
    const templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}