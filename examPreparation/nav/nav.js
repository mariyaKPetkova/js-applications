
import authService from "../services/authService.js";
import { navTemplate } from "./navTemplate.js";

function getView(context, next) {
    const navInfo = {
        currPage: context.pathname,
        isLogin: authService.isLogin(),
        email: authService.getUsername()
    }
    const templateResult = navTemplate(navInfo)
    context.renderNavigation(templateResult)
    next()
}
export default {
    getView
}
