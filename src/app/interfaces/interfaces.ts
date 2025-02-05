export interface User {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    location: {
        city: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        }
        postcode: string;
        street: {
            number: number;
            name: string;
        }
    };
    email: string;
    picture: {large: string};
}


export interface WeatherDataToDisplay {
    hourlyWeather: {
        id: number;
        hour: string;
        temperature: number;
        weatherCode: number;
    }[];
    dailyHighestTemperature: number;
    dailyLowestTemperature: number;
    currentTemperature: number | undefined;
    currentWeatherCode: number | undefined;
    time: string[];
}

export interface Weather {
    current_weather: {
        temperature: number;
        weathercode: number;
        time: string;
        winddirection: number;
        windspeed: number;
    };
    daily : {
        temperature_2m_max: string[];
        temperature_2m_min: string[];
        time: string[];
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        weathercode: number[];
    }
    current_weather_units: {
        temperature: string;
        windspeed: string;
    };
}

