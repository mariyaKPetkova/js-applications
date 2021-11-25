import { html } from "./../../node_modules/lit-html/lit-html.js";

export const homeTemplate = (allItems) => html`
<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
    ${allItems.length > 0
            ?html`${allItems.map(x => oneItem(x))}`
            :html`<p class="no-articles">No games yet</p>`}
</div>
</section>`
        
export let oneItem = (item) => html`
<div class="game">
        <div class="image-wrap">
            <img src=${item.imageUrl}>
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>`

// export const homeTemplate = (allItems) => html`
// <section id="dashboard-page" class="dashboard">
//             <h1>Dashboard</h1>
//             ${allItems.length > 0
//             ?html`<ul class="other-books-list">${allItems.map(x => oneItem(x))}</ul>`
//             :html`<p class="no-books">No books in database!</p>`}
//         </section>`
        
// export let oneItem = (item) => html`
// <li class="otherBooks">
//                     <h3>${item.title}</h3>
//                     <p>Type: ${item.type}</p>
//                     <p class="img"><img src=${item.imageUrl}></p>
//                     <a class="button" href="/details/${item._id}">Details</a>
//                 </li>`
{/* <div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>Description here</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${item._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`



<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${allItems.map(x => oneItem(x))}
</div> */}