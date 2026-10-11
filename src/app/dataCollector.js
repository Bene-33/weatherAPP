async function fetchWeatherData(location) {
    try {
        const urlFahrenheit = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=BNCLX3JP9DD3VCB79F7YL7PZH&contentType=json`
        const urlMetric = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=BNCLX3JP9DD3VCB79F7YL7PZH&contentType=json`

        const fahrenheitResponse = await (await fetch(urlFahrenheit)).json()
        const metricResponse = await (await fetch(urlMetric)).json()
        const weatherFahrenheit = {
            location: fahrenheitResponse.resolvedAddress,
            currentTemperature: fahrenheitResponse.currentConditions.temp,
            currentCondition: fahrenheitResponse.currentConditions.conditions,
            nextDays: fahrenheitResponse.days.slice(0, 3).map((day) => ({
                date: day.datetime,
                temperature: day.temp,
                condition: day.conditions,
                temperatureMax: day.tempmax,
                temperatureMin: day.tempmin,
            })),
        }
        const weatherMetric = {
            location: metricResponse.resolvedAddress,
            currentTemperature: metricResponse.currentConditions.temp,
            currentCondition: metricResponse.currentConditions.conditions,
            nextDays: metricResponse.days.slice(0, 3).map((day) => ({
                date: day.datetime,
                temperature: day.temp,
                condition: day.conditions,
                temperatureMax: day.tempmax,
                temperatureMin: day.tempmin,
            })),
        }
        return { weatherFahrenheit, weatherMetric }
    } catch (error) {
        return null
    }
}

export { fetchWeatherData }
