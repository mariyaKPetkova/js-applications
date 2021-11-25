const navigationBar = document.querySelector('.navbar')

function logged(){
    navigationBar.querySelector('.dashboard').parentElement.classList.remove('hidden');
    navigationBar.querySelector('.create').parentElement.classList.remove('hidden');
    navigationBar.querySelector('.logout').parentElement.classList.remove('hidden');
    navigationBar.querySelector('.login').parentElement.classList.add('hidden');
    navigationBar.querySelector('.register').parentElement.classList.add('hidden');
}

function notLogged(){
    navigationBar.querySelector('.dashboard').parentElement.classList.remove('hidden');
    navigationBar.querySelector('.create').parentElement.classList.add('hidden');
    navigationBar.querySelector('.logout').parentElement.classList.add('hidden');
    navigationBar.querySelector('.login').parentElement.classList.remove('hidden');
    navigationBar.querySelector('.register').parentElement.classList.remove('hidden');
}
export default{
    logged,
    notLogged
}