import {Weather} from "@/app/interfaces/interfaces";

export const weatherIconMapping: Record<number, string> = {
    0: '☀️',  // Clear sky
    1: '🌤️',  // Mainly clear
    2: '⛅',   // Partly cloudy
    3: '☁️',   // Overcast
    45: '🌫️',  // Fog
    48: '🌫️',  // Fog
    51: '🌧️',  // Drizzle
    53: '🌧️',  // Drizzle
    55: '🌧️',  // Drizzle
    56: '🌧️❄️',// Freezing Drizzle
    57: '🌧️❄️',// Freezing Drizzle
    61: '🌧️',  // Rain
    63: '🌧️',  // Rain
    65: '🌧️',  // Rain
    66: '🌧️❄️',// Freezing Rain
    67: '🌧️❄️',// Freezing Rain
    71: '❄️',   // Snow
    73: '❄️',   // Snow
    75: '❄️',   // Snow
    77: '❄️',   // Snow grains
    80: '🌦️',  // Showers
    81: '🌦️',  // Showers
    82: '🌦️',  // Showers
    85: '❄️🌨️',// Snow showers
    86: '❄️🌨️',// Snow showers
    95: '⛈️',  // Thunderstorm
    96: '⛈️🌨️',// Thunderstorm with hail
    99: '⛈️🌨️' // Thunderstorm with hail
};

export const getWeatherIcon = (weatherCode: number): string => {
    return weatherIconMapping[weatherCode] || '❓';
};

export const getCurrentWeather = (weatherData: Weather) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const currentTime = currentDate.toISOString().split('T')[0] + 'T' + currentHour.toString().padStart(2, '0') + ':00';
    const currentIndex = weatherData.hourly.time.indexOf(currentTime);

    if (currentIndex !== -1) {
        const currentTemperature = weatherData.hourly.temperature_2m[currentIndex];
        const currentWeatherCode = weatherData.hourly.weathercode[currentIndex];
        return {
            currentTemperature,
            currentWeatherCode
        };
    }
    return null;
};
