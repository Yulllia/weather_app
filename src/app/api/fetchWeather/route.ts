import axios from 'axios';


export async function GET(req: { url: string | URL; }) {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const currentDate = searchParams.get('currentDate');

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&start_date=${currentDate}&end_date=${currentDate}`
        );
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error fetching weather data", { status: 500 });
    }
}
