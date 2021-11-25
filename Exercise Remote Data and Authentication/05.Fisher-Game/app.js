let loadBtn = document.querySelector('main aside .load');
loadBtn.addEventListener('click', getCatches);
let catchesCont = document.querySelector('#catches');
catchesCont.querySelectorAll('.catch').map(x => x.remove());
let addBtn = document.querySelector('#addForm .add');
addBtn.disabled = localStorage.getItem('token') === null;
addBtn.addEventListener('click', createCatch);
async function getCatches() {
    let url = 'http://localhost:3030/data/catches';
    let catchesResp = await fetch(url);
    let catches = await catchesResp.json();
    catchesCont.querySelectorAll('.catch').forEach(x => x.remove());
    catchesCont.append(...catches.map(c => createHtmlCatch(c)));
}
async function createCatch(){
    let anglerInput = document.querySelector('#addForm .angler');
    let weightInput = document.querySelector('#addForm .weight');
    let speciesInput = document.querySelector('#addForm .species');
    let locationInput = document.querySelector('#addForm .location');
    let baitInput = document.querySelector('#addForm .bait');
    let captureTimeInput = document.querySelector('#addForm .captureTime');
    let newCatch = {
        angler: anglerInput.value,
        weight: Number(weightInput.value),
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: Number(captureTimeInput.value)
    };
    let createResp = await fetch('http://localhost:3030/data/catches',
    {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Post',
        body: JSON.stringify(newCatch)
    });
    let createResult = await createResp.json();
    let createdCatch = createHtmlCatch(createResult);
    catchesCont.appendChild(createdCatch);
}
async function updateCatch(e){
    let curCatch = e.target.parentElement;
    let anglerInput = curCatch.querySelector('.angler');
    let weightInput = curCatch.querySelector('.weight');
    let speciesInput = curCatch.querySelector('.species');
    let locationInput = curCatch.querySelector('.location');
    let baitInput = curCatch.querySelector('.bait');
    let captureTimeInput = curCatch.querySelector('.captureTime');
    let updatedCatch = {
        angler: anglerInput.value,
        weight: Number(weightInput.value),
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: Number(captureTimeInput.value)
    };
    let id = curCatch.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;
    let updateResp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Put',
        body: JSON.stringify(updatedCatch)
    });
    await updateResp.json();
}
async function deleteCatch(e){
    let curCatch = e.target.parentElement;
    let id = curCatch.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;
    let deleteResp = await fetch(url, {
        headers: {
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Delete'
    });
    let deleteResult = await deleteResp.json();
    console.log(deleteResult);
    if(deleteResp.status === 200){
        curCatch.remove();
    }
}
function createHtmlCatch(curCatch) {
    let anglL = createElements('label', undefined, 'Angler');
    let anglInp = createElements('input', {type: 'text', class:'angler'}, curCatch.angler);
    let hr1El = createElements('hr');
    let weightL = createElements('label', undefined, 'Weight');
    let weightInp = createElements('input', {type:'number', class:'weight'}, curCatch.weight);
    let hr2El = createElements('hr');
    let speciesL = createElements('label', undefined, 'Species');
    let speciesInp = createElements('input', {type:'text', class:'species'}, curCatch.species);
    let hr3El = createElements('hr');
    let locationL = createElements('label', undefined, 'Location');
    let locationInp = createElements('input', {type:'text', class:'location'}, curCatch.location);
    let hr4El = createElements('hr');
    let baitLabel = createElements('label', undefined, 'Bait');
    let baitInput = createElements('input', {type:'text', class:'bait'}, curCatch.bait);
    let hr5El = createElements('hr');
    let captureTimeLabel = createElements('label', undefined, 'Capture Time');
    let captureTimeInput = createElements('input', {type:'number', class:'captureTime'}, curCatch.captureTime);
    let hr6El = createElements('hr');
    let updateBtn = createElements('button', {disabled:true, class:'update'}, 'Update');
    updateBtn.addEventListener('click', updateCatch);
    updateBtn.disabled = localStorage.getItem('userId') !== curCatch._ownerId;
    let deleteBtn = createElements('button', {disabled:true, class:'delete'}, 'Delete');
    deleteBtn.addEventListener('click', deleteCatch);
    deleteBtn.disabled = localStorage.getItem('userId') !== curCatch._ownerId;
    let catchDiv = createElements('div', {class:'catch'},
    anglL, anglInp, hr1El, weightL, weightInp, hr2El, speciesL, speciesInp,
    hr3El, locationL, locationInp, hr4El, baitLabel, baitInput, hr5El, captureTimeLabel,
    captureTimeInput, hr6El, updateBtn, deleteBtn);
    catchDiv.dataset.id = curCatch._id;
    catchDiv.dataset.ownerId = curCatch._ownerId;
    return catchDiv;
}
function createElements(tag, attributes, ...params) {
    let el = document.createElement(tag);
    let firstValue = params[0];
    if (params.length === 1 && typeof (firstValue) !== 'object') {
        if (['input', 'textarea'].includes(tag)) {
            el.value = firstValue;
        } else {
            el.textContent = firstValue;
        }
    } else {
        el.append(...params);
    }
    if (attributes !== undefined) {
        Object.keys(attributes).forEach(key => {
            el.setAttribute(key, attributes[key]);
        })
    }
    return el;
}