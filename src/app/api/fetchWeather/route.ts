import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const currentDate = searchParams.get('currentDate');

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&start_date=${currentDate}&end_date=${currentDate}`
        );
        return new NextResponse(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Error fetching weather data", { status: 500 });
    }
}
