import { NextResponse } from 'next/server';
import { sp_register_client } from '@/db/services';
export async function POST(request) {
    const reqData = await request.json()
    const response = await sp_register_client(reqData);
    if (response instanceof Error) {
        return NextResponse.json({ error: response.message }, { status: 500 });
    }
    console.log("Response from stored procedure:", response);
    return NextResponse.json({ reqData })
}