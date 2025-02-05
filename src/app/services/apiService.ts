import axios from 'axios';


export const fetchUsers = async (count: number = 8, page: number = 1) => {
    try {
        const response = await axios.get(`/api/users?results=${count}&page=${page}`);
        return await response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const fetchWeather = async (latitude: string, longitude: string) => {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
        const response = await axios.get(`/api/fetchWeather?latitude=${latitude}&longitude=${longitude}&currentDate=${currentDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
};
export const getLatLonFromAddress = async (address: string) => {
    try {
        const response = await axios.get(`/api/geocode?address=${encodeURIComponent(address)}`);
        return response.data;
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
};

