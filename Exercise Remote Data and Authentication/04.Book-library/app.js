const tableBody = document.querySelector('#table')
const btnLoadAllBooks = document.querySelector('#loadBooks')
btnLoadAllBooks.addEventListener('click', loadingBook)
const tableBooks = document.querySelector('#table tbody')
const form = document.querySelector('#form')
form.addEventListener('submit', handleFormSubmit)

function handleEdit(e) {
    const currBook = e.target.closest('.book')
    const title = currBook.querySelector('.title')
    const author = currBook.querySelector('.author')
    const formEditEl = document.querySelector('#formEdit')
    formEditEl.textContent = 'EDIT'
    form.dataset.entryId = currBook.dataset.id
    form.dataset.isEdit = true
    const authorInput = form.querySelector('input[name="author"]')
    const titleInput = form.querySelector('input[name="title"]')
    authorInput.value = author.textContent
    titleInput.value = title.textContent
}
async function handleFormSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    if (form.dataset.isEdit !== undefined) {
        const id = form.dataset.entryId
        editBook(formData, id)
    } else {
        addNewBook(formData)
    }
}
async function deleteBook(e) {
    let bookToDelete = e.target.closest('.book');
    let id = bookToDelete.dataset.id;
    let url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    let deleteResponse = await fetch(url, {
        method: 'Delete'
    });

    if (deleteResponse.status === 200) {
        bookToDelete.remove();
    }
}
async function editBook(formData, id) {
    const editB = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    const editResp = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Put',
        body: JSON.stringify(editB)
    })
    const editResult = await editResp.json()
    const editedBook = tableBooks.querySelector(`tr.book[data-id="${id}"]`);

    const editedHtmlBook = createBook(editResult._id, editResult.title, editResult.author);
    editedBook.replaceWith(editedHtmlBook);
}
async function addNewBook(formData) {
    const newBook = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    const createRes = await fetch(`http://localhost:3030/jsonstore/collections/books`,
        {
            headers: {
                "Content-type": "application/json"
            },
            method: 'Post',
            body: JSON.stringify(newBook)
        })
    const createdBook = await createRes.json()
    const htmlBook = createBook(createdBook._id, createdBook.title, createdBook.author)
    tableBooks.appendChild(htmlBook)
}
async function loadingBook() {
    const res = await fetch(`http://localhost:3030/jsonstore/collections/books`)
    const books = await res.json();
    Array.from(tableBody.querySelectorAll('tbody tr')).map(tr => tr.remove())
    Object.keys(books).map(book => {
        const trBook = createBook(book, books[book].title, books[book].author)
        tableBooks.appendChild(trBook)
    })
}
function createBook(id, title, author) {
    const trEl = createElements('tr', undefined, { class: 'book' })
    trEl.dataset.id = id
    const tdT = createElements('td', title, { class: 'title' })
    const tdA = createElements('td', author, { class: 'author' })
    const tdB = createElements('td')
    const btnEdit = createElements('button', 'Edit')
    btnEdit.addEventListener('click', handleEdit)
    const btnDel = createElements('button', 'Delete')
    btnDel.addEventListener('click', deleteBook)
    tdB.appendChild(btnEdit)
    tdB.appendChild(btnDel)
    trEl.appendChild(tdT)
    trEl.appendChild(tdA)
    trEl.appendChild(tdB)
    return trEl
}
function createElements(type, text, attribute) {
    const el = document.createElement(type)
    if (text != undefined) {
        el.textContent = text
    }
    if (attribute !== undefined) {
        Object.keys(attribute).map(key => {
            el.setAttribute(key, attribute[key])
        })
    }
    return el
}