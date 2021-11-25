import { jsonRequest } from "../helpers/jsonRequest.js";

let url = 'http://localhost:3030/data/games';


async function getAll(){
    return await jsonRequest(`${url}?sortBy=_createdOn%20desc&distinct=category`);
}
                                
async function get(id){
    return await jsonRequest(`${url}/${id}`);
}

async function create(item){
    return await jsonRequest(`${url}`, 'Post', item, true);
}

async function edit(item, id){
    return await jsonRequest(`${url}/${id}`, 'Put', item, true);
}

async function deleteItem(id){
    return await jsonRequest(`${url}/${id}`, 'Delete', undefined, true);
}

async function getMyItem(){
    return await jsonRequest(`${url}?sortBy=_createdOn%20desc`);
}

export default {
    getAll,
    get,
    create,
    edit,
    deleteItem,
    getMyItem
}