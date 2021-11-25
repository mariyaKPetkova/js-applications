import { html } from "./../node_modules/lit-html/lit-html.js";

export const navTemplate = (navInfo) => html`
<section class="navbar-dashboard">
                    <a href="/home">Dashboard</a>
                    ${navInfo.isLogin
            ? html`<div id="user">
                        <span>Welcome, ${navInfo.email}</span>
                        <a class="button" href="/my-items">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a class="button" href="/logout">Logout</a>
                    </div>`
            : html`<div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`}
                </section>`

{/*<h1><a href="/">Furniture Store</a></h1>
 <nav>
    <a id="catalogLink" href="/home"
        class=${ifDefined(navInfo.currPage.startsWith('/home') ? "active" : undefined)}>Dashboard </a> 
        ${navInfo.isLogin
            ? html`
        <div id="user">
            <a id="createLink" href="/create" class=${ifDefined(navInfo.currPage.startsWith('/create') ? "active" : undefined)}>Create Furniture</a> 
            <a id="profileLink" href="my-items" class=${ifDefined(navInfo.currPage.startsWith('/my-items') ? "active" : undefined)}>My Publications</a> 
            <a id="logoutBtn" href="/logout">Logout</a>
        </div>`
            : html`
        <div id="guest">
            <a id="loginLink" href="/login" class=${ifDefined(navInfo.currPage.startsWith('/login') ? "active" : undefined)}>Login</a>
            <a id="registerLink" href="/register" class=${ifDefined(navInfo.currPage.startsWith('/register') ? "active" : undefined)}>Register</a>
        </div>`}
</nav> */}