import { NextResponse } from 'next/server'
import { sp_purchase } from '@/db/services'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function POST(request) {
    const reqData = await request.json()
    const session = await getServerSession(authOptions)
    try {
        const result = await sp_purchase({userId: await session.user.id , film_id: reqData.filmId})
        console.log('Purchase result:', result)
        return NextResponse.json( result )
    } catch (error) {
        console.error('Purchase error:', error)
        return NextResponse.json({ error: 'Bad request', reason: error.message }, { status: 400 })
    }
}