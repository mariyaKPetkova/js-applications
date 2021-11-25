import itemsService from "../../services/itemsService.js"
import { homeTemplate } from "./homeTemplate.js"

async function getView(context) {
    const allItems = await itemsService.getAll()
    const templateResult = homeTemplate(allItems)
    context.renderView(templateResult)
}

export default {
    getView
}