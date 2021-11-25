
import authService from "../../services/authService.js"
import { registerTemplate } from "./registerTemplate.js"

async function submitHandler(context, e) {
    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    const user = {
        email: formData.get('email'),
        password: formData.get('password'),
        username: formData.get('username'),
        gender: formData.get('gender')
    }
    const registerResult = await authService.register(user)
    context.page.redirect('/home')
}
async function getView(context) {
    const bounsSubmitHandler = submitHandler.bind(null, context)
    const form = { submitHandler: bounsSubmitHandler }
    const templateResult = registerTemplate(form)
    context.renderView(templateResult)
}

export default {
    getView
}