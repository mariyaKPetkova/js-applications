let rForm = document.querySelector('#register-form');
rForm.addEventListener('submit', register);
let lForm = document.querySelector('#login-form');
lForm.addEventListener('submit', login);
async function register(e){
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let pass = formData.get('password');
    let repeatPass = formData.get('rePass');
    if(pass !== repeatPass){
        console.error('Passwords don\'t match');
        return;
    }
    let newUser = {
        email: formData.get('email'),
        password: pass
    }
    let regResponse = await fetch('http://localhost:3030/users/register', 
    {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(newUser)
    });
    let regResult = await regResponse.json();
    localStorage.setItem('token', regResult.accessToken);
    localStorage.setItem('userId', regResult._id);
    location.assign('./index.html');
}
async function login(e){
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let password = formData.get('password');
    let logUser = {
        email: formData.get('email'),
        password: password
    }
    
    let logResponse = await fetch('http://localhost:3030/users/login', 
    {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(logUser)
    });
    let logResult = await logResponse.json();
    localStorage.setItem('token', logResult.accessToken);
    localStorage.setItem('userId', logResult._id);
    location.assign('./index.html');
}