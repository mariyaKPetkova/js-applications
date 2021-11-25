import { createHomeViewTopic } from "./homeViewTopic.js";

let tContainerEl = document.querySelector('.topic-container');
fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .then(function (res) {
        Object.values(res).forEach(t => {
            tContainerEl.appendChild(createHomeViewTopic(t));
        })
    })

let form = document.querySelector('main form');
form.addEventListener('submit', createPost);
let cancelBtn = form.querySelector('.cancel');
cancelBtn.addEventListener('click', cleaningForm);
function cleaningForm(e) {
    e.target.reset();
}
function createPost(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('topicName');
    let username = formData.get('username');
    let post = formData.get('postText');
    if ([title, username, post].some(x => x === '')) {
        alert('Required fields cannot be empty!');
        return;
    }
    e.target.reset();
    let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            title,
            post
        })
    })
        .then(res => res.json())
        .then(res => tContainerEl.appendChild(createHomeViewTopic(res)));
}