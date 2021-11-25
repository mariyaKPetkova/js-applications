import { jsonRequest } from "../helpers/jsonRequest.js";

async function getAllBooks(){
    let books = await jsonRequest('http://localhost:3030/jsonstore/collections/books');
    return books;
}
async function getBook(id){
    let book = await jsonRequest(`http://localhost:3030/jsonstore/collections/books/${id}`);
    return book;
}

async function createBook(book){
    let createdBook = await jsonRequest('http://localhost:3030/jsonstore/collections/books', 'Post', book);
    return createdBook;
}

async function editBook(id, book){
    let editedBook = await jsonRequest(`http://localhost:3030/jsonstore/collections/books/${id}`, 'Put', book);
    return editedBook;
}

async function deleteBook(id){
    let deleteResult = await jsonRequest(`http://localhost:3030/jsonstore/collections/books/${id}`, 'Delete');
    return deleteResult;
}


let booksService = {
    getAllBooks,
    getBook,
    createBook,
    editBook,
    deleteBook
}

export default booksService;