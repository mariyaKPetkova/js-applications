import itemsService from "../../services/itemsService.js"
import { allTemplate } from "./allTemplate.js"

async function getView(context) {
    const allItems = await itemsService.getAllSorted()
    const templateResult = allTemplate(allItems)
    context.renderView(templateResult)
}

export default {
    getView
}