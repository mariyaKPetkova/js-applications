
import itemsService from "../../services/itemsService.js";
import { editTemplate } from "./editTemplate.js";


let form = undefined;
async function submitHandler(context, id, e){
    e.preventDefault();
    let formData = new FormData(e.target);

    form.invalidFields = {};

    let make = formData.get('make');
    if(make.length < 4) {
        form.invalidFields.make = true;
    }

    let model = formData.get('model');
    if(model.length < 4) {
        form.invalidFields.model = true;
    }

    let year = Number(formData.get('year'));
    if(!(year >= 1950 && year <= 2050)) {
        form.invalidFields.year = true;
    }

    let description = formData.get('description');
    if(description.length <= 10) {
        form.invalidFields.description = true;
    }

    let price = Number(formData.get('price'));
    if(!(price > 0)) {
        form.invalidFields.price = true;
    }

    let img = formData.get('img');
    if(img.trim() === '') {
        form.invalidFields.img = true;
    }

    if(Object.keys(form.invalidFields).length > 0){
        let templateResult = editTemplate(form);
        return context.renderView(templateResult);
    }

    let material = formData.get('material');

    let itemF = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
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
            make: item.make,
            model: item.model,
            year: item.year,
            description: item.description,
            price: item.price,
            img: item.img,
            material: item.material,
        },
        invalidFields: {}
    }
    let templateResult = editTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}