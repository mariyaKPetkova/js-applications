import { html } from "./../../node_modules/lit-html/lit-html.js";

export const allElsTemp = (options) => html`${options.map(el => elTemp(el))}`
export const elTemp = (el) => html`
<option .value=${el._id}>${el.text}</option>
`