import { html } from './../../node_modules/lit-html/lit-html.js'

export const catTemplate = (cat, showHide) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${showHide}>Show status code</button>
        <div class="status hidden" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`

export const allCatsTemplate = (cats, showHide) => html`
<ul>
    ${cats.map(x => catTemplate(x, showHide))}
</ul>`