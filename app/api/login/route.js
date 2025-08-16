import { NextResponse } from 'next/server'
import { sp_login_client } from '@/db/services'

export async function POST(request) {
    const reqData = await request.json()
    console.log('Login request data:', reqData)
    try {
        const result = await sp_login_client(reqData)
        console.log('Login result:', result)
        return NextResponse.json( result )
    } catch (error) {
        return NextResponse.json({ error: 'Bad request', reason: error.message }, { status: 400 })
    }
}