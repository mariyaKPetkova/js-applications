
import authService from "../../services/authService.js"
import { loginTemplate } from "./loginTemplate.js"

async function submitHandler(context, e) {
    e.preventDefault()
    try {
        const formData = new FormData(e.currentTarget)
        const user = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        const loginResult = await authService.login(user)
        context.page.redirect('/home')
    } catch (err) {
        alert(err)
    }
}
async function getView(context) {
    const bounsSubmitHandler = submitHandler.bind(null, context)
    const form = { submitHandler: bounsSubmitHandler }
    const templateResult = loginTemplate(form)
    context.renderView(templateResult)
}

export default {
    getView
}