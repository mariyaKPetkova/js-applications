import authService from "../../services/authService.js";
import itemsService from "../../services/itemsService.js";
import { myItemTemplate } from "./myItimsTemplate.js";

async function getView(context) {
    const userId = authService.getUserId();
    const myItem = await itemsService.getMyItem(userId);
    const templateResult = myItemTemplate(myItem);
    context.renderView(templateResult);
}

export default {
    getView
}