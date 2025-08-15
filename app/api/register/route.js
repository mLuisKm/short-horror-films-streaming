import { NextResponse } from 'next/server';
import { sp_register_client } from '@/db/services';
export async function POST(request) {
    const reqData = await request.json()
    try {
        const response = await sp_register_client(reqData);
        console.log("Successfully registered client");
        return NextResponse.json({ reqData })
    } catch (error) {
        //console.error('Error in POST /register:', error.message);
        return NextResponse.json({ error: 'Bad request', reason: error.message}, { status: 400 });
    }
}