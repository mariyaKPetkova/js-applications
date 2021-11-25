import authService from "../../services/authService.js"
import itemsService from "../../services/itemsService.js"
import { detailsTemplate } from "./detailsTemplate.js"

async function deleteHandler(context, e) {
    const id = context.params.id
    const confirmed = confirm('Delete?')
    if (confirmed) {
        const deleteResult = await itemsService.deleteItem(id)
        context.page.redirect('/home')
    }

}
async function getView(context) {
    const id = context.params.id
    const boundDeleteHandler = deleteHandler.bind(null, context, id)
    const item = await itemsService.get(id)

    item.img = item.img.startsWith('.') ? item.img.substring(1) : item.img;

    const isCreator = authService.getUserId() === item._ownerId

    const templateResult = detailsTemplate(item, boundDeleteHandler, isCreator)
    context.renderView(templateResult)
}

export default {
    getView
}