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
const IS_INVALID = (pr1, pr2, pr3) => !pr1 || !pr2 || !pr3;
let isNotANumber = (p) => {
    let num = Number(p);
    return num !== num;
};

const throwForInvalidInput = (pr1, pr2, pr3) => {
    if (IS_INVALID(pr1, pr2, pr3)) {
        throw new Error('All fields are required!')
    }
    if (isNotANumber(pr2) || isNotANumber(pr3)) {
        throw new Error('Should be a number')
    }
};
const createRow = ({img, name, price, decFactor}) => {
    let row = createElement('tr');
    let imgElement = createElement('img', null, [`src=${img}`]);
    let nameElement = createElement('p', `${name}`);
    let priceElement = createElement('p', `${price}`);
    let decorationFactorElement = createElement('p', `${decFactor}`);
    let checkbox = createElement('input', null, ['type=checkbox']);
    let elements = [imgElement, nameElement, priceElement, decorationFactorElement, checkbox];
    let tdElements = elements.reduce((acc, el) => {
        let td = createElement('td');
        td.appendChild(el);
        acc.push(td);
        return acc
    }, []);
    appendChildren(row, tdElements);
    return row;
};
const renderOnDom = (data) => {
    let tbody = document.querySelector('tbody');
    Object.values(data).forEach(e => {
        let row = createRow(e)
        tbody.appendChild(row)
    })
}
const requestFurniture = async () => {
    let response = await fetch(`http://localhost:3030/data/furniture`);
    let data = await response.json();
    renderOnDom(data);
};

const requestPost = async (url, httpMethod) => {
    let response = await fetch(url, httpMethod);
    return response.json();
};

const processPostRequest = async (data, token, id) => {
    let requestData = new FormData(data);
    throwForInvalidInput(requestData.get('name'), requestData.get('price'), requestData.get('factor'))
    let currData = {
        _ownerId: id,
        img: requestData.get('img'),
        name: requestData.get('name'),
        price: requestData.get('price'),
        decFactor: requestData.get('factor'),
    }
    await requestPost(`http://localhost:3030/data/furniture`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(currData)
    });
}
const collectDataForPickedFurniture = (data) => {
    return Array.from(data).reduce((acc, e) => {
        let parent = e.parentNode.parentNode;
        let arr = Array.from(parent.querySelectorAll('p'));
        let obj = {
            name: arr[0].textContent,
            price: arr[1].textContent,
            decFactor: arr[2].textContent,
        }
        acc.push(obj)
        return acc
    }, [])
}
window.onload = async () => {
    let bought = document.querySelector(`.orders`);
    let tbody = document.querySelector('tbody');
    tbody.textContent = ``;
    Array.from(bought.querySelectorAll('p')).forEach(e => e.style.display = 'none');
    document.querySelector('#logoutBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.pathname = `./home.html`;
    });

    try {

        await requestFurniture()
        let form = document.querySelector('form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            let token = localStorage.getItem('authToken');
            if (token === null) {
                throw new Error('You\'re not logged in');
            }
            let formData = e.currentTarget;
            try {
                await processPostRequest(formData, token, localStorage.getItem('userId'));
                await requestFurniture();
                location.reload();
            } catch (err) {
                console.log(err);
            } finally {
                formData.reset()
            }
        });


        let btnBuy = document.querySelectorAll('button')[1];
        btnBuy.addEventListener('click', () => {
            let checked = document.querySelectorAll('input[type="checkbox"]:checked');
            let dataPerRequest = Array.from(checked).length > 0 ? collectDataForPickedFurniture(checked) : '';

            dataPerRequest.forEach(async (e) => {
                let token = localStorage.getItem('authToken');
                if (token === null) {
                    throw new Error('You\'re not logged in');
                }
                await requestPost(`http://localhost:3030/data/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-Authorization': token
                    },
                    body: JSON.stringify(e)
                });
            });

        });


        let btnOrders = bought.querySelector('button');
        btnOrders.addEventListener('click', async () => {
            let token = localStorage.getItem('authToken');
            if (token === null) {
                throw new Error('You\'re not logged in');
            }

            let data = await requestPost(`http://localhost:3030/data/orders?where=_ownerId%3D"${localStorage.getItem('userId')}"`,
                {method: 'GET'}).catch(err => console.log(err));

            let totalPrice = 0;
            let furniture = []
            Object.values(data).forEach(({name, price}) => {
                furniture.push(name)
                totalPrice += Number(price);
            })
            if (Object.values(furniture).length > 0) {
                let span = Array.from(bought.querySelectorAll('span'));
                span[0].textContent = furniture.join(', ');
                span[1].textContent = `${totalPrice.toFixed(2)} $`;
                Array.from(bought.querySelectorAll('p')).forEach(e => e.style.display = 'block');
            } else {
                let p = createElement('p', 'You don\'t have anything bought');
            }

        });
    } catch (err) {
        console.log(err)
    }
};



