function createElement(type, text, attributes = []) {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
        value ? element.setAttribute(name, value) : element.setAttribute(name, '');
    });
    return element;
}

const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));


const createRow = ({img, name, price, decFactor}) => {
    let row = createElement('tr');
    let imgElement = createElement('img', null, [`src=${img}`]);
    let nameElement = createElement('p', `${name}`);
    let priceElement = createElement('p', `${price}`);
    let decorationFactorElement = createElement('p', `${decFactor}`);
    let checkbox = createElement('input', null, ['type=checkbox', 'disabled']);
    let elements = [imgElement, nameElement, priceElement, decorationFactorElement, checkbox];
    let tdElements = elements.reduce((acc, el) => {
        let td = createElement('td');
        td.appendChild(el);
        acc.push(td);
        return acc
    }, []);
    appendChildren(row, tdElements);
    return row;
}

const requestFurniture = async () => {
    let response = await fetch(`http://localhost:3030/data/furniture`);
    return response.json();
}
window.onload = async () => {
    let tbody = document.querySelector('tbody');
    tbody.textContent = ``;
    try{
        let data = await requestFurniture();
        Object.values(data).forEach(e => {
            let row = createRow(e)
            tbody.appendChild(row)
        })
    }catch(err) {
        console.log(err)
    }

}