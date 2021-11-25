
import itemsService from "../../services/itemsService.js";
import { myItemTemplate } from "./myItimsTemplate.js";

async function getView(context) {
    const myItem = await itemsService.getMyItem();
    const templateResult = myItemTemplate(myItem);
    context.renderView(templateResult);
}

export default {
    getView
}