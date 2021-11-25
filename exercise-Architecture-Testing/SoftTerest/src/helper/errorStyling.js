function clear(e){
    e.target.querySelectorAll('.error-message').forEach(x => x.remove());
    e.target.querySelectorAll('.error').forEach(x => x.classList.remove('error'));
}
function create(message,element){
    let small = document.createElement('small');
    small.textContent = message;
    small.classList.add('error-message');
    element.classList.add('error');
    element.parentElement.appendChild(small);
}

export default {
    clear,
    create
}