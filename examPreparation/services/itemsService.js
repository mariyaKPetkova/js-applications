import { jsonRequest } from "../helpers/jsonRequest.js";

let url = 'http://localhost:3030/data/books';

async function getAll(){
    return await jsonRequest(`${url}?sortBy=_createdOn%20desc`);
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

async function getMyItem(userId){
    return await jsonRequest(`${url}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export default {
    getAll,
    get,
    create,
    edit,
    deleteItem,
    getMyItem
}