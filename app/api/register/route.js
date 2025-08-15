import { NextResponse } from 'next/server'
import { sp_register_client } from '@/db/services'
export async function POST(request) {
    const reqData = await request.json()
    try {
        await sp_register_client(reqData)
        return NextResponse.json({ reqData })
    } catch (error) {
        return NextResponse.json({ error: 'Bad request', reason: error.message}, { status: 400 })
    }
}