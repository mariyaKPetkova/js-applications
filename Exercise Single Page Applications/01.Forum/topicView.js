let commentElement = document.querySelector('.comment');
let replyForm = document.querySelector('.answer form');
let commentsElement = document.querySelector('#user-comment');
let homeElement = document.querySelector('li a');
homeElement.addEventListener('click', goHome);
replyForm.addEventListener('submit', createReply);

fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${localStorage.getItem('topicId')}`)
    .then(res => res.json())
    .then(function (res) {
        commentElement.appendChild(createHtmlTopic(res));
    });

fetch(`http://localhost:3030/jsonstore/collections/myboard/comments?where=postId%3D"${localStorage.getItem('topicId')}`)
    .then(res => res.json())
    .then(function (res) {
        Object.values(res).forEach(r => {
            commentElement.appendChild(createHtmlReply(r));
        });
    });

function createReply(e) {
    e.preventDefault();
    let formData = new FormData(replyForm);
    let comment = formData.get('postText');
    let username = formData.get('username');
    replyForm.reset();
    if (!username) {
        alert('Username cannot be empty!');
        return;
    }
    fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            comment,
            postId: localStorage.getItem('topicId')
        })
    })
        .then(res => res.json())
        .then(res => commentElement.appendChild(createHtmlReply(res)));
}

function createHtmlTopic(t) {
    let hDivEl = document.createElement('div');
    hDivEl.classList.add('header');
    let imgEl = document.createElement('img');
    imgEl.src = './static/profile.png';
    imgEl.alt = 'avatar';
    let mpEl = document.createElement('p');
    let userSpanEl = document.createElement('span');
    userSpanEl.textContent = t.username;
    let timeEl = document.createElement('time');
    timeEl.textContent = getPostTime();
    mpEl.textContent = ' posted on ';
    mpEl.prepend(userSpanEl);
    mpEl.appendChild(timeEl);
    let contPEl = document.createElement('p');
    contPEl.classList.add('post-content');
    contPEl.textContent = t.post;
    hDivEl.appendChild(imgEl);
    hDivEl.appendChild(mpEl);
    hDivEl.appendChild(contPEl);
    return hDivEl;
}

function createHtmlReply(r) {
    let replyWDivEl = document.createElement('div');
    replyWDivEl.classList.add('topic-name-wrapper');
    let topicNameDivEl = document.createElement('div');
    topicNameDivEl.classList.add('topic-name');
    let infoPEl = document.createElement('p');
    infoPEl.textContent = ' commented on ';
    let nameStrongEl = document.createElement('strong');
    nameStrongEl.textContent = r.username;
    infoPEl.prepend(nameStrongEl);
    let timeEl = document.createElement('time');
    timeEl.textContent = getReplyTime();
    infoPEl.appendChild(timeEl);
    let contDiv = document.createElement('div');
    contDiv.classList.add('post-content');
    let contP = document.createElement('p');
    contP.textContent = r.comment;
    contDiv.appendChild(contP);
    topicNameDivEl.appendChild(infoPEl);
    topicNameDivEl.appendChild(contP);
    replyWDivEl.appendChild(topicNameDivEl);
    return replyWDivEl;
}

function getPostTime() {
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

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function getReplyTime() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDay();
    let hours = time.getHours()
        .toString()
        .padStart(2, 0);

    let minutes = time.getMinutes()
        .toString()
        .padStart(2, 0);

    let seconds = time.getSeconds()
        .toString()
        .padStart(2, 0);

    let format = hours > 12 ? "PM" : "AM";

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${format}`;
}

function goHome() {
    location.assign('index.html');
}