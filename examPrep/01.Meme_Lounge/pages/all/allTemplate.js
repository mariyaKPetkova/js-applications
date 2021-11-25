import { html } from "./../../node_modules/lit-html/lit-html.js";

export const allTemplate = (items) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${items.length > 0
        ? items.map(x => oneTemplate(x))
        : html`<p class="no-memes">No memes in database.</p>`
    }
    </div>
</section>`

export const oneTemplate = (item) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`