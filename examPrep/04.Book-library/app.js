let booksElementToDelete = document.querySelectorAll('tbody tr');
let bookElementClone = booksElementToDelete[0].cloneNode(true);
let tableBooks = document.querySelector('tbody');
let formElement = document.querySelector('form');
let loadBooks = document.querySelector('#loadBooks');
let baseUrl = 'http://localhost:3030/jsonstore/collections/books';
let formButton = formElement.querySelector('button');
let idBookForChange = null;

deleteBooksFromTable();

loadBooks.addEventListener('click', async () => {  
    let books = null;

    try {
        books = await (await fetch(baseUrl)).json();
    } catch (error) {
        console.error(error);
        return;
    };

    deleteBooksFromTable();

    Object.keys(books).forEach(key => {
        createBookElement(key, books[key]); 
    })
    
});

formElement.addEventListener('submit', async (e)=> {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let title = data.get('title');
    let author = data.get('author');

    if (title.trim().length == 0 || author.trim().length == 0) {
        return;
    }

    try {
        if (formButton.textContent === 'Submit') {
                let book = await (await fetch(baseUrl, {
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({author, title})
            })).json();

            createBookElement(book._id, book);
        }else{
     
            await fetch(`${baseUrl}/${idBookForChange}`, {
                method: 'Put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({author, title})
            });
         
            let bookElement = document.getElementById(idBookForChange);
            let [titleElement, authorElement]  = bookElement.querySelectorAll('td');
            titleElement.textContent = title;
            authorElement.textContent = author;

            changeStateForm();
        }     
    } catch (error) {
        console.error(error);
    } finally {
        formElement.reset();
    }   
})


function buttonEditFunction(e) {
    let bookElement = e.target.closest('tr');
    let [title, author]  = bookElement.querySelectorAll('td');

    if (!idBookForChange) {
        changeStateForm();
    }
    
    document.querySelector('form #title').value = title.textContent;
    document.querySelector('form #author').value = author.textContent;
    
    idBookForChange = bookElement.id;
}

async function buttonDeleteFunction(e) {
    let bookElement = e.target.closest('tr');

    try {
        await fetch(`${baseUrl}/${bookElement.id}`, { method: 'Delete' });

        bookElement.remove();
        formElement.reset();

        if (idBookForChange) {
            changeStateForm();
        }
    } catch (error) {
        console.error(error);
    }   
}

function deleteBooksFromTable() {
    let booksElementToDelete = document.querySelectorAll('tbody tr');

    booksElementToDelete.forEach(book => book.remove());
}

function createBookElement(id, book) {
    let cloneElement = bookElementClone.cloneNode(true); 
    cloneElement.id = id; 
    let [title, author, buttons]  = cloneElement.querySelectorAll('td');
    title.textContent = book.title;
    author.textContent = book.author;
    let [edit, del] = buttons.querySelectorAll('td button');
    edit.addEventListener('click', buttonEditFunction);
    del.addEventListener('click', buttonDeleteFunction);
        
    tableBooks.append(cloneElement);
}

function changeStateForm() {
    idBookForChange = null;
    let formTitle = formElement.querySelector('h3');
    formTitle.textContent = formTitle.textContent === 'FORM' ? 'Edit FORM' : 'FORM';
    formButton.textContent = formButton.textContent === 'Submit' ? 'Save' : 'Submit';
}