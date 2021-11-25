import errorStyling from "../helper/errorStyling.js";
import changeView from "../navigation/changeView.js";

function register(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    let userEmail = formData.get('email');
    let userPassword = formData.get('password');
    let userRepeatPassword = formData.get('repeatPassword');
    //Clearing any erros styling that has been applied
    errorStyling.clear(e); 

    // Simple data validation
    let validated = true;
    if(!/.+@+.+\.+.+/.test(userEmail)){ // check to see if what is entered is an email (looks for @ and . sandwitched between any text)
        let emailElement = e.target.querySelector('input[name="email"');
        errorStyling.create('Please enter a valid email adress',emailElement);
        validated = false;
    }
    if(userPassword.trim().length < 3){ // to prevent 6 empty spaces
        let passwordElement = e.target.querySelector('input[name="password"');
        errorStyling.create('Password must be at least 3 characters',passwordElement);
        validated = false;
    }
    // if(userPassword.trim() === ''){ 
    //     let passwordElement = e.target.querySelector('input[name="password"');
    //     errorStyling.create('Password cannot be empty',passwordElement);
    //     validated = false;
    // }
    if(userPassword !== userRepeatPassword){
        let rePasswordElement = e.target.querySelector('input[name="repeatPassword"');
        errorStyling.create('Passwords do not match',rePasswordElement);
        validated = false;
    }
    if(!validated){
        return; // if any of the validations fail stop there
    }

    let registrationDetails = {
        email: userEmail,
        password: userPassword
    };
    e.target.reset(); // clearing the input form
    registerUser(registrationDetails, e.target);
}
async function registerUser(userDetails, form){
    const url = 'http://localhost:3030/users/register';
    let emailElement = form.querySelector('input[name="email"');
    try{
        let response = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userDetails)
        });
        
        if(!response.ok){
            if(response.status === 409){
                let message = `${userDetails.email} is already registered.`
                throw new Error(message);
            } else {  
                throw new Error('There was a problem connecting to the server, please try again.');
            }
        }
        let jsonResponse = await response.json();
        localStorage.setItem('token', jsonResponse.accessToken);
        localStorage.setItem('userEmail', jsonResponse.email);      
        localStorage.setItem('userId', jsonResponse._id);
        changeView('home'); // Probably needs to be refactored out of here
    } catch (error) {
        errorStyling.create(error.message,emailElement);
        emailElement.classList.add('error');
        return;
    }
}

export default register;