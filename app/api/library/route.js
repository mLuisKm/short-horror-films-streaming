import { NextResponse } from "next/server";
import { sp_library } from "@/db/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function GET() {
    const session = await getServerSession(authOptions)
    //if (!session) {
        try {
            const result = await sp_library( { userId: session.user.id } );
            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error('Error fetching films:', error);
            return NextResponse.json({ error: 'Internal Server Error', reason: error.message }, { status: 500 });
        }
    // } else {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
}