import { html } from "./../../node_modules/lit-html/lit-html.js";

export const allTownsTempl = (towns) => html`
<ul>${towns.map(x => townTempl(x))}</ul>
`
export const townTempl = (town) => html`
<li>${town}</li>
`