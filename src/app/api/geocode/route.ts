import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json(
            { error: 'Address query parameter is required' },
            { status: 400 }
        );
    }

    const encodedAddress = encodeURIComponent(address);

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'API key not configured on the server' },
            { status: 500 }
        );
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK' && data.results?.[0]) {
            const location = data.results[0].geometry.location;
            return NextResponse.json({ lat: location.lat, lon: location.lng });
        } else {
            return NextResponse.json({ error: 'Address not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch geocoding data' },
            { status: 500 }
        );
    }
}
