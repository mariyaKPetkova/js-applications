import { html } from "./../../node_modules/lit-html/lit-html.js";

export let myItemTemplate = (myItems) => html`
<section id="catalog-page">
            <h1>All Games</h1>
            ${myItems.length > 0
            ?html`${myItems.map(x => oneItem(x))}`
            :html`<h3 class="no-articles">No articles yet</h3>`}
        </section>`

export let oneItem = (item) => html`
<div class="allGames">
                <div class="allGames-info">
                    <img src=${item.imageUrl}>
                    <h6>${item.category}</h6>
                    <h2>${item.title}</h2>
                    <a href="/details/${item._id}" class="details-button">Details</a>
                </div>
            </div>`


{/* <div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${myItems.map(f => oneItem(f))}
</div> */}