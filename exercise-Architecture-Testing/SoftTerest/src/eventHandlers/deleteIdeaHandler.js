import changeView from "../navigation/changeView.js";
import fetcher from "../utils/fetcher.js";

async function deleteIdeaHandler(e){
    let id = e.target.dataset.id;
    let deleted = await fetcher.deleteIdea(id);
    changeView('dashboard');
}
export default deleteIdeaHandler;