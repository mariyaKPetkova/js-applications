import itemsService from "../../services/itemsService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

export const detailsTemplate = (item, deleteHandler, isCreator) => html`
<section id="meme-details">
    <h1>Meme Title:${item.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${item.description}</p>

            ${isCreator
            ?html`
            <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button class="button danger" @click=${deleteHandler}>Delete</button>`
            :''
            }
        </div>
    </div>
</section>`

