import { allMemestTemplate } from "./allMemesTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;

function initialize(router, renderHandler, memesService) {
    _router = router;
    _renderHandler = renderHandler;
    _memesService = memesService;
}

async function getView(context) {
    let allMemes = await _memesService.getAllMemes();
    console.log(allMemes);
    let templateResult = allMemestTemplate(allMemes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}