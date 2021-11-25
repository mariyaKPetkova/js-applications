import { html } from "./../../node_modules/lit-html/lit-html.js";

export let myItemTemplate = (myItems) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${myItems.length > 0
            ?html`<ul class="my-books-list">${myItems.map(x => oneItem(x))}</ul>`
            :html` <p class="no-books">No books in database!</p>`}
        </section>`;

export let oneItem = (item) => html`
<li class="otherBooks">
                    <h3>${item.title}</h3>
                    <p>Type: ${item.type}</p>
                    <p class="img"><img src=${item.imageUrl}></p>
                    <a class="button" href="/details/${item._id}">Details</a>
                </li>`

{/* <div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${myItems.map(f => oneItem(f))}
</div> */}