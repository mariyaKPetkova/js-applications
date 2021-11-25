export function createHomeViewTopic(t) {

    let topicDivWEl = document.createElement('div');
    topicDivWEl.classList.add('topic-name-wrapper');
    let topicDivNEl = document.createElement('div');
    topicDivNEl.classList.add('topic-name');
    let anchorEl = document.createElement('a');
    anchorEl.href = '#';
    anchorEl.id = t._id;
    anchorEl.classList.add('normal');
    anchorEl.addEventListener('click', openPage);
    let h2El = document.createElement('h2');
    h2El.textContent = t.title;
    let colDivEl = document.createElement('div');
    colDivEl.classList.add('colums');
    let divEl = document.createElement('div');
    let datePEl = document.createElement('p');
    datePEl.textContent = 'Date: ';
    let timeEl = document.createElement('time');
    timeEl.textContent = getTimeHomeFormat();
    datePEl.appendChild(timeEl);
    let nickNameDivEl = document.createElement('div');
    nickNameDivEl.classList.add('nick-name');
    let nickPEl = document.createElement('p');
    nickPEl.textContent = `Username: `;
    let span = document.createElement('span');
    span.textContent = t.username;
    nickPEl.appendChild(span);
    nickNameDivEl.appendChild(nickPEl);
    divEl.appendChild(datePEl);
    divEl.appendChild(nickNameDivEl);
    colDivEl.appendChild(divEl);
    anchorEl.appendChild(h2El);
    topicDivNEl.appendChild(anchorEl);
    topicDivNEl.appendChild(colDivEl);
    topicDivWEl.appendChild(topicDivNEl);
    return topicDivWEl;
}

function openPage(e) {
    e.preventDefault();
    let headline = e.target
        .parentElement;
    let selectedId = headline.id;
    localStorage.setItem('topicId', selectedId);
    location.assign('theme-content.html');
}

export function getTimeHomeFormat() {
    let time = new Date();
    let year = time.getFullYear()
    let month = time.getMonth()
        .toString()
        .padStart(2, 0);

    let day = time.getDay()
        .toString()
        .padStart(2, 0);

    let hours = time.getHours() > 12 ? (time.getHours() - 12).toString().padStart(2, 0)
        : (time.getHours()).toString().padStart(2, 0);
    let minutes = time.getMinutes()
        .toString()
        .padStart(2, 0);

    let seconds = time.getHours()
        .toString()
        .padStart(2, 0);

    let miliseconds = time.getMilliseconds()
        .toString()
        .padStart(3, 0);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliseconds}Z`;
}
const homeModule = {
    getTimeHomeFormat,
    createHomeViewTopic,
}

export default homeModule;