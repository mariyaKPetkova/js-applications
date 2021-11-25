import { html } from "./../../node_modules/lit-html/lit-html.js";
import{ ifDefined} from"./../../node_modules/lit-html/directives/if-defined.js"
export const allStudents = (students) => html`${students.map(x => student(x))}`

export const student = (student) => html`
<tr class=${ifDefined(student.class)}>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.course}</td>
</tr>`