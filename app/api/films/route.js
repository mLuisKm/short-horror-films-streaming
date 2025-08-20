import { NextResponse } from "next/server";
import { sp_list_films } from "@/db/services";

export async function GET() {
    try {
        const result = await sp_list_films();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching films:', error);
        return NextResponse.json({ error: 'Internal Server Error', reason: error.message }, { status: 500 });
    }
}