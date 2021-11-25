function solve() {
    const spanEl = document.querySelector('#info .info');
    const depBtn = document.querySelector('#depart');
    const arrBtn = document.querySelector('#arrive');
    let nextStopId = 'depot'
    function depart() {
        if (spanEl.getAttribute('data-stop-id') !== null) {
            nextStopId = spanEl.getAttribute('data-stop-id')
        }
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
            .then(res => res.json())
            .then(r => {
                spanEl.setAttribute('data-stop-name', r.name);
                spanEl.setAttribute('data-stop-id', r.next)
                spanEl.textContent = `Next stop ${r.name}`
                depBtn.disabled = true;
                arrBtn.disabled = false;
            })
            .catch(err => {
                spanEl.textContent = `Error`
                depBtn.disabled = true;
                arrBtn.disabled = true;
            })
    }
    function arrive() {
        const nextStop = spanEl.getAttribute('data-stop-name')
        spanEl.textContent = `Arriving at ${nextStop}`
        depBtn.disabled = false;
        arrBtn.disabled = true;
    }
    return {
        depart,
        arrive
    };
}
let result = solve();