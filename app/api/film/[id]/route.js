import { NextResponse } from 'next/server'
import { sp_film } from '@/db/services'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request, {params}) {
    const session = await getServerSession(authOptions);
    const reqData = await params;
    const data = {
        userId: session.user.id,
        filmId: parseInt(reqData.id)
    }
    try {
        const result = await sp_film(data)
        return NextResponse.json( result )
    } catch (error) {
        return NextResponse.json({ error: 'Bad request', reason: error.message }, { status: 400 })
    }
}