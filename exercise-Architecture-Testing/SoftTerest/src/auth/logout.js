import changeView from "../navigation/changeView.js";

async function logout(){
    const url = 'http://localhost:3030/users/logout';
    try{
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'X-Authorization': localStorage.getItem('token')
            }
        });
        localStorage.clear();
        changeView('home'); //i don't think it should be here
    } catch (e){
        console.log(e);
    }
}
export default logout;