import { html } from "./../../node_modules/lit-html/lit-html.js";
import { oneItem } from "../home/homeTemplate.js";


export let myItemTemplate = (myItems) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${myItems.map(f => oneItem(f))}
</div>`;