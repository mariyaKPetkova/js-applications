import { html } from "../../node_modules/lit-html/lit-html.js";

export const allTowns = (towns) => html`
<ul>
    ${towns.map(x => town(x))}
</ul>`

export const town = (town) => html`<li>${town}</li>`