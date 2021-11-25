function isLogged(){
    if(!localStorage.getItem('token')){ // if no token exist 
      return false;
    }
  
    return fetch('http://localhost:3030/users/me',{ //try to get your data with the token if it is denied then the token is expired
      method: 'GET',
      headers: {
          'Content-Type' : 'application/json',
          'X-Authorization': localStorage.getItem('token')
      },
    })  
    .then(response => {
      if(!response.ok){ // Token expired go to home and delete token
        localStorage.clear(); // clear any storage for the site  
        return false;
      }
      return true;
    })
    .catch(e => {
        console.error(e);
    })  
  }

  export default isLogged;