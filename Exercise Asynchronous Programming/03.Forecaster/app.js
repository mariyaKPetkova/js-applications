function attachEvents() {
    const inputData = document.querySelector('#location')
    const btnSubmit = document.querySelector('#submit');
    btnSubmit.addEventListener('click', getLocation);
    const wSymbols = {
        "Sunny": "☀",
        "Partly sunny": "⛅",
        "Overcast": "☁",
        "Rain": "☂",
        "Degrees": "°"
    };
    function getLocation() {
        let currentForecastContainer = document.querySelector('#current');
        Array.from(currentForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        let upcomingForecastContainer = document.querySelector('#upcoming');
        Array.from(upcomingForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(res => res.json())
            .then(r => {
                const locationName = inputData.value
                const location = r.find(x => x.name == locationName)
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                    .then(res => res.json())
                    .then(forecastToday => ({ code: location.code, forecastToday }))
            })
            .then(({ code, forecastToday }) => {
                const todayForecast = createTodayForecast(forecastToday)
                const divCurrCond = document.querySelector('#current')
                divCurrCond.appendChild(todayForecast)
                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            })
            .then(res => res.json())
            .then(forecastUpcoming => {
                const upcomingForecast = createUpcomingForecast(forecastUpcoming);
                const divUpcoming = document.querySelector('#upcoming')
                divUpcoming.appendChild(upcomingForecast)
            })
            .catch(err => `Error`)
        
    }
    function createTodayForecast(forecastToday) {
        
        const divForecast = document.querySelector('#forecast')
        divForecast.style.display = 'block'
        const divF = document.createElement('div')
        divF.className = 'forecasts'
        const spanSymbol = document.createElement('span')
        spanSymbol.className = 'condition sybol'
        spanSymbol.textContent = wSymbols[forecastToday.forecast.condition];
        divF.appendChild(spanSymbol)
        const spanCondition = document.createElement('span')
        spanCondition.className = 'condition'
        const spanCity = document.createElement('span')
        spanCity.className = 'forecast-data'
        spanCity.textContent = forecastToday.name
        const spanTemp = document.createElement('span')
        spanTemp.className = 'forecast-data'
        spanTemp.textContent = `${forecastToday.forecast.low}${wSymbols['Degrees']}/${forecastToday.forecast.high}${wSymbols['Degrees']}`
        const spanW = document.createElement('span')
        spanW.className = 'forecast-data'
        spanW.textContent = forecastToday.forecast.condition
        spanCondition.appendChild(spanCity)
        spanCondition.appendChild(spanTemp)
        spanCondition.appendChild(spanW)
        divF.appendChild(spanCondition)
        return divF
    }
    function createUpcomingForecast(forecastUpcomming) {
        const divForecastInfo = createElements('div', undefined, 'forecast-info')
        forecastUpcomming.forecast.map(el => {
            const spanUpcoming = createElements('span', undefined, 'upcoming')
            const spanS = createElements('span', wSymbols[el.condition], 'symbol')
            spanUpcoming.appendChild(spanS)
            const spanT = createElements('span', `${el.low}${wSymbols['Degrees']}/${el.high}${wSymbols['Degrees']}`, 'forecast-data')
            spanUpcoming.appendChild(spanT)
            const spanW = createElements('span', el.condition, 'forecast-data')
            spanUpcoming.appendChild(spanW)
            divForecastInfo.appendChild(spanUpcoming)
        })

        function createElements(type, text, className) {
            const element = document.createElement(type)
            if (text != undefined) {
                element.textContent = text
            }
            if (className != undefined) {
                element.classList.add(className)
            }
            return element
        }
        return divForecastInfo
    }
}
attachEvents();