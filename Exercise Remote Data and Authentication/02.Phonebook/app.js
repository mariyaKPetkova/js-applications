function attachEvents() {
    const phoneBookUlEl = document.querySelector('#phonebook')
    const btnLoad = document.querySelector('#btnLoad')
    btnLoad.addEventListener('click', loadPhoneBook)
    const newPerson = document.querySelector('#person')
    const newNumber = document.querySelector('#phone')
    const btnCreate = document.querySelector('#btnCreate')
    btnCreate.addEventListener('click', createPhonenumber)
    async function loadPhoneBook(e) {
        const res = await fetch(`http://localhost:3030/jsonstore/phonebook`)
        const phonebook = await res.json()
        Object.values(phonebook).map(phoneNumber => {
            const liEl = document.createElement('li')
            liEl.dataset.id = phoneNumber._id
            liEl.textContent = `${phoneNumber.person}: ${phoneNumber.phone}`
            const btnDel = document.createElement('button')
            btnDel.textContent = 'Delete'
            btnDel.addEventListener('click', deletePhonenumber)
            liEl.appendChild(btnDel)
            phoneBookUlEl.appendChild(liEl)
        })
    }
    async function createPhonenumber(e) {
        const newPhonenumber = {
            person: newPerson.value,
            phone: newNumber.value 
        }
        const createPhone = await fetch('http://localhost:3030/jsonstore/phonebook',
            {
                headers: {
                    "Content-type": "application/json"
                },
                method: 'Post',
                body: JSON.stringify(newPhonenumber)
            }
        )
        const res = await createPhone.json()
        const liEl = document.createElement('li')
        liEl.dataset.id = res._id
        liEl.textContent = `${res.person}: ${res.phone}`
        const btnDel = document.createElement('button')
        btnDel.textContent = 'Delete'
        btnDel.addEventListener('click', deletePhonenumber)
        liEl.appendChild(btnDel)
        phoneBookUlEl.appendChild(liEl)
    }
    async function deletePhonenumber(e) {
        const phoneNum = e.target.parentElement
        const id = phoneNum.dataset.id
        const deleteResp = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`,
        {
            method: 'Delete'
        }) 
        if (deleteResp.status === 200) {
            phoneNum.remove();
        }
    }
}
attachEvents();