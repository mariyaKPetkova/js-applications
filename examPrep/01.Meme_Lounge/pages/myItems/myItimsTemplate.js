import { html } from "./../../node_modules/lit-html/lit-html.js";

export let myItemTemplate = (user, items) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${user.gender == 'male' ? '/images/male.png' : '/images/female.png'}>
        <div class="user-content">
            <p>Username: ${user}</p>
            <p>Email: ${user.slice(0,user.indexOf('@'))}</p>
            <p>My memes count: ${items.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${items.length > 0
        ?html`${items.map(x => itemTemp(x))}`
        :html`<p class="no-memes">No memes in database.</p>`
        }
    </div>
</section>
`;
export let itemTemp = (itemMeme) => html`
<div class="user-meme">
<p class="user-meme-title">${itemMeme.title} </p>
<img class="userProfileImage" alt="meme-img" src=${itemMeme.imageUrl}>
<a class="button" href="/details/${itemMeme._id}">Details</a>
</div>`