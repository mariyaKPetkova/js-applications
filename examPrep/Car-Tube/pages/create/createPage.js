import itemsService from "../../services/itemsService.js";
import { createTemplate } from "./createTemplate.js";

let form = undefined;
async function submitHandler(context, e){
    e.preventDefault();
    const formData = new FormData(e.target);

    form.invalidFields = {};

    const make = formData.get('make');
    if(make.length < 4) {
        form.invalidFields.make = true;
    }

    const model = formData.get('model');
    if(model.length < 4) {
        form.invalidFields.model = true;
    }

    const year = Number(formData.get('year'));
    if(!(year >= 1950 && year <= 2050)) {
        form.invalidFields.year = true;
    }

    const description = formData.get('description');
    if(description.length <= 10) {
        form.invalidFields.description = true;
    }

    const price = Number(formData.get('price'));
    if(!(price > 0)) {
        form.invalidFields.price = true;
    }

    const img = formData.get('img');
    if(img.trim() === '') {
        form.invalidFields.img = true;
    }

    if(Object.keys(form.invalidFields).length > 0){
        const templateResult = createTemplate(form);
        return context.renderView(templateResult);
    }

    const material = formData.get('material');

    const newItem = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    }

    await itemsService.create(newItem);
    context.page.redirect('/home');
}

async function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            make: true,
            model: true,
            year: true,
            description: true,
            price: true,
            img: true
        }
    }
    const templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}