import authService from "../../services/authService.js";
import itemsService from "../../services/itemsService.js";
import { myItemTemplate } from "./myItimsTemplate.js";


async function getView(context) {
    console.log(context);
    const userName = authService.getUsername();
    const userId = authService.getUserId();
    const myItem = await itemsService.getMyItem(userId);
    
    const templateResult = myItemTemplate(userName, myItem);
    context.renderView(templateResult);
}

export default {
    getView
}