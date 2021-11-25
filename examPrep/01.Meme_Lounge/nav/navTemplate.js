import { html } from "./../node_modules/lit-html/lit-html.js";

export const navTemplate = (navInfo) => html`
<a href="/all-memes">All Memes</a>
${navInfo.isLogin
? html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${navInfo.username}</span>
        <a href="/my-items">My Profile</a>
        <a href="/logout">Logout</a>
    </div>
</div>`
: html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/home">Home Page</a>
</div>`}
`