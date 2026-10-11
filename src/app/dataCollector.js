async function fetchJsonWeather(location, unitGroup) {
    const API_KEY = 'BNCLX3JP9DD3VCB79F7YL7PZH'
    const UrlBase =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
    const URL = `${UrlBase}/${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`
    try {
        const ApiResponse = await fetch(URL)
        return ApiResponse.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

function extractWeather(data) {
    return {
        location: data.resolvedAddress,
        currentTemperature: data.currentConditions.temp,
        currentCondition: data.currentConditions.conditions,
        nextDays: data.days.slice(0, 3).map((day) => ({
            date: day.datetime,
            temperature: day.temp,
            condition: day.conditions,
            temperatureMax: day.tempmax,
            temperatureMin: day.tempmin,
        })),
    }
}

async function fetchWeatherData(location) {
    const metrics = {
        us: 'us',
        metric: 'metric',
    }
    try {
        const weatherUS = await extractWeather(
            await fetchJsonWeather(location, metrics.us)
        )
        const weatherMetric = extractWeather(
            await fetchJsonWeather(location, metrics.metric)
        )

        return { weatherUS, weatherMetric }
    } catch (error) {
        console.error(error)
        return null
    }
}

export { fetchWeatherData }
