function getInfo() {
    const inputData = document.getElementById('stopId').value;
    const divEl = document.getElementById('stopName');   //name or err
    const ulEl = document.querySelector('#buses');      //number of the bus and time

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputData}`)
        .then(res => res.json())
        .then(stopInfo => {
            const name = stopInfo.name;
            divEl.textContent = name
            cleanData()
            Object.keys(stopInfo.buses).map(bus => {
                const liEl = document.createElement('li')
                liEl.textContent = `Bus ${bus} arrives in ${stopInfo.buses[bus]} minutes`
                ulEl.appendChild(liEl)
            })
        })
        .catch(err => {
            divEl.textContent = `Error`
            cleanData()
        })

    function cleanData() {
        Array.from(ulEl.querySelectorAll('li')).map(li => li.remove())
    }
}