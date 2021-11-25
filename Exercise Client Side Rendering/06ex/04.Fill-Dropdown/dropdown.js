import { render } from './../node_modules/lit-html/lit-html.js'
import { allElsTemp, elTemp } from './templates/templates.js'

let options = []
const form = document.querySelector('form')
form.addEventListener('submit', addItem)
loadOptions()

async function loadOptions() {
    const r = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`)
    const res = await r.json()
    options = Object.values(res)
    render(allElsTemp(options), document.querySelector('#menu'))
}
async function addItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newOp = {
        text: formData.get('text')
    }
    const resp = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOp)
    })
    if (resp.ok) {
        const createdOption = await resp.json()
        options.push(createdOption)
        render(allElsTemp(options), document.querySelector('#menu'))
    }
}