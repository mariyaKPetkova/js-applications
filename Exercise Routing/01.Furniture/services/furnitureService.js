import { jsonRequest } from "../helpers/jsonRequest.js";

let url = 'http://localhost:3030/data/catalog';

async function getAll(){
    return await jsonRequest(url);
}

async function get(id){
    return await jsonRequest(`${url}/${id}`);
}

async function create(item){
    return await jsonRequest(`${url}`, 'Post', item, true);
}

async function update(item, id){
    return await jsonRequest(`${url}/${id}`, 'Put', item, true);
}

async function deleteItem(id){
    return await jsonRequest(`${url}/${id}`, 'Delete', undefined, true);
}

async function getMyFurniture(userId){
    return await jsonRequest(`${url}?where=_ownerId%3D%22${userId}%22`);
}

export default {
    getAll,
    get,
    create,
    update,
    deleteItem,
    getMyFurniture
}