async function fetchWeatherData(location) {
    try {
        const urlFahrenheit = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=BNCLX3JP9DD3VCB79F7YL7PZH&contentType=json`
        const urlMetric = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=BNCLX3JP9DD3VCB79F7YL7PZH&contentType=json`

        const fahrenheitResponse = (await fetch(urlFahrenheit)).json()
        const metricResponse = (await fetch(urlMetric)).json()

        console.log(fahrenheitResponse, metricResponse)
    } catch (error) {
        console.log(error)
    }
}

export { fetchWeatherData }
