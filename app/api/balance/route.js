import { NextResponse } from 'next/server';
import { sp_balance } from '@/db/services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

export async function GET() {
    const session = await getServerSession(authOptions);
    const data = session ? session.user.id : null;
    console.log(session.user);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const balanceData = await sp_balance(data);
        return NextResponse.json(balanceData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Bad request', reason: error.message }, { status: 400 });
    }
}