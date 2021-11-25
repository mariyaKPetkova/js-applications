import { homeTemplate } from "./homeTemplate.js"

async function getView(context) {
    const templateResult = homeTemplate()
    context.renderView(templateResult)
}

export default {
    getView
}