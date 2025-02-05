import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get('results');
    const page = searchParams.get('page');

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_API}?results=${count}&page=${page}`);
        return new NextResponse(JSON.stringify(response.data.results), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new NextResponse('Error fetching users', { status: 500 });
    }
}