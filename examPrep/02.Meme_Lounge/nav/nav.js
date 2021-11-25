
import authService from "../services/authService.js";
import { navTemplate } from "./navTemplate.js";

function getView(context, next) {
    //console.log(context);
    const navInfo = {
        currPage: context.pathname,
        isLogin: authService.isLogin(),
        username: authService.getUsername()
    }
    const templateResult = navTemplate(navInfo)
    context.renderNavigation(templateResult)
    next()
}
export default {
    getView
}
