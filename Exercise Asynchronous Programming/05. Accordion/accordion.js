function solution() {
    const sectionMain = document.querySelector('#main')
    fetch(`http://localhost:3030/jsonstore/advanced/articles/list `)
        .then(resp => resp.json())
        .then(res => {
            res.map(el => {
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${el._id}`)
                    .then(r => r.json())
                    .then(re => {
                        const divAcc = createAcc(re._id, re.title, re.content)
                        sectionMain.appendChild(divAcc)
                    })
            })
        })
    function createAcc(id, name, content) {
        const divAcc = createElements('div', undefined, 'accordion')

        const divHead = createElements('div', undefined, 'head')
        const span = createElements('span', name)
        const btn = createElements('button', 'More', 'button', id)
        btn.addEventListener('click', onClick)
        divHead.appendChild(span)
        divHead.appendChild(btn)
        const divExtra = createElements('div', undefined, 'extra')

        const pEl = createElements('p', content)
        divExtra.appendChild(pEl)
        divAcc.appendChild(divHead)
        divAcc.appendChild(divExtra)
        //!
        return divAcc
    }
    function onClick(e) {
        const dAcc = e.target.parentElement.parentElement;
        const dExtra = dAcc.querySelector('.extra')
        dExtra.style.display = dExtra.style.display === 'block'
            ? 'none'
            : 'block'
        e.target.textContent == 'More'
            ? e.target.textContent = 'Less'
            : e.target.textContent = 'More'
    }
    function createElements(type, text, className, id) {
        const element = document.createElement(type)
        if (text != undefined) {
            element.textContent = text
        }
        if (className != undefined) {
            element.classList.add(className)
        }
        if (id != undefined) {
            element.setAttribute('id', id)
        }
        return element
    }
}
solution()