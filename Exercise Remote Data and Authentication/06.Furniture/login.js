const isValid  = (arr) => {
    if(arr.length === 3){
        if(arr[1] !== arr[2]){
            return false;
        }
    }
    let flag = true;
    arr.forEach(e => {
        if(e.trim() === ''){
            flag = false;
        }
    });
    return flag;
};

const getDataFromForm = (form) => {
    let newForm = new FormData(form);
    let email = newForm.get('email');
    let password = newForm.get('password');

    let formType = form.action.split('/')[3];
    let flag = formType === 'register' ? isValid([email,password,newForm.get('rePass')]) : isValid([email,password]);
    if(!flag){
        throw new Error('Invalid format');
    }
    return {
        email,
        password
    };
};
const buildRequestUrl = (endPoint) =>{
    return `http://localhost:3030/users/${endPoint}`;
};
const getHttpMethodRequest = (data) =>{
    return {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(data)
    };
};

const setTokenInStorage = (token,id) =>{
    localStorage.setItem('authToken',token);
    localStorage.setItem('userId',id);
    window.location.pathname = `./homeLogged.html`;
};
const responsePostUser = async (url,methodHttp) =>{
    let response = await fetch(url, methodHttp);
    if(!response.ok){
        throw new Error(`cannot fetch ${JSON.stringify(response)}`);
    }
    let jsonResponse = await response.json();
    setTokenInStorage(jsonResponse.accessToken,jsonResponse._id);
};
const processUserRequest   = async (form) => {
    let requestData = getDataFromForm(form);
    let requestUrl =buildRequestUrl( form.action.split('/')[3]);
    let methodHttp = getHttpMethodRequest(requestData);
    await responsePostUser(requestUrl, methodHttp);
};

const formRegister = document.querySelector(`form[action="\/register"]`);
const formLogin = document.querySelector(`form[action="\/login"]`);

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = e.currentTarget;
    try {
        await processUserRequest(formData);
    } catch (err) {
        console.log(err);
    } finally {
        formData.reset()
    }
});

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = e.currentTarget;
    try {
        await processUserRequest(formData);
    } catch (err) {
        console.log(err);
    } finally {
        formData.reset()
    }
});
