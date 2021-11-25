
import authService from "../../services/authService.js"
import { registerTemplate } from "./registerTemplate.js"

async function submitHandler(context, e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)


    let invalidFields = {};

    const email = formData.get('email');
    if (email === "") {
        invalidFields.email = true;
    }
    const password = formData.get('password');
    if (password === "") {
        invalidFields.password = true;
    }
    const confPassword = formData.get('confirm-password');
    if (confPassword === "") {
        invalidFields.confPassword = true;
    }

    if (Object.keys(invalidFields).length > 0) {
        const templateResult = registerTemplate(form);
        return context.renderView(templateResult);
    }
    const user = {
        email,
        password
    }
    const registerResult = await authService.register(user)
    context.page.redirect('/home')
}
async function getView(context) {
    const bounsSubmitHandler = submitHandler.bind(null, context)
    const form = { 
        submitHandler: bounsSubmitHandler,
        invalidFields: {
            email:true,
            password:true
        }
     }
    const templateResult = registerTemplate(form)
    context.renderView(templateResult)
}

export default {
    getView
}