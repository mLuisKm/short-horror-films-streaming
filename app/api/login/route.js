import { NextResponse } from 'next/server'
import { sp_login_client } from '@/db/services'

export async function POST(request) {
    const reqData = await request.json()
    try {
        const result = await sp_login_client(reqData)
        return NextResponse.json( result )
    } catch (error) {
        return NextResponse.json({ error: 'Bad request', reason: error.message }, { status: 400 })
    }
}