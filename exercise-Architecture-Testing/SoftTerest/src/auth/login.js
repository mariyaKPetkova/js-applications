import errorStyling from "../helper/errorStyling.js";
import changeView from "../navigation/changeView.js";

function login(e){ // Pretty much the same like registre except no need for second password
    e.preventDefault();
    const formData = new FormData(e.target);
    let userEmail = formData.get('email');
    let userPassword = formData.get('password');
    errorStyling.clear(e);
    let validated = true;
    if(!/.+@+.+\.+.+/.test(userEmail)){ // i think bootstrap also does some checks ?
        let emailElement = e.target.querySelector('input[name="email"');
        errorStyling.create('Please enter a valid email adress',emailElement);
        validated = false;
    }
    if(userPassword.trim() === ''){    
        let passwordElement = e.target.querySelector('input[name="password"');
        errorStyling.create('Password cannot be empty',passwordElement);
        validated = false;
    }
    if(!validated){
        return;
    }
    let userDetails = {
        email: userEmail,
        password: userPassword
    };
    e.target.reset();
    loginUser(userDetails, e.target);
}

async function loginUser(userDetails, form){
    const url = 'http://localhost:3030/users/login';
    let emailElement = form.querySelector('input[name="email"');
    let passwordElement = form.querySelector('input[name="password"');
    try{
        let response = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userDetails)
        });
        if(response.status === 403){
            throw new Error('Wrong email/password')
        }
        let jsonResponse = await response.json();
        localStorage.setItem('token', jsonResponse.accessToken);      
        localStorage.setItem('userId', jsonResponse._id);
        localStorage.setItem('userEmail', jsonResponse.email);
        changeView('home');
    } catch (e) {
        errorStyling.create(e.message,emailElement);
        emailElement.classList.add('error');
        passwordElement.classList.add('error');
        return;
    }
}

export default login;