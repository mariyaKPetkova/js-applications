async function solve() {
    //That is private module, and it shouldn't be use for test! Please do not use admin credential for testing
    const fetchData = async (url, method) => {
        let response = await fetch(url, method);
        return await response.json();
    }
    const loggUserForcefully = async () => {
        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: `admin@abv.bg`, password: `admin`})
        })
        return response.json();
    }
    const transferDataFromJsonToServer = async () => {
        let userInfo = await loggUserForcefully();
        localStorage.setItem('authToken',userInfo.accessToken)
        localStorage.setItem('idUser',userInfo._id)
        let dataFromPreviousLog = await fetchData(`http://localhost:3030/data/furniture`, {method: 'GET'});


        await Promise.all(dataFromPreviousLog.map(async (e) => {
            if(e._ownerId === localStorage.getItem('idUser') ){
                await fetchData(`http://localhost:3030/data/furniture/${e._id}`, {
                    method: 'DELETE',
                    headers: {'X-Authorization': localStorage.getItem('authToken')},
                });
            }
        }));


        let data = await fetchData(`http://localhost:3000/furniture.json`, {method: 'GET'});
        let arrData = Object.values(data);


        await Promise.all(arrData.map(async (e) => {
            await fetchData(`http://localhost:3030/data/furniture`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify(e)
            });
        }));
        localStorage.clear();
    };

    await transferDataFromJsonToServer();
    window.location.pathname = `./home.html`;
}
