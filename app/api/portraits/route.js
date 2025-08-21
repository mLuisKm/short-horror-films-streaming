import { NextResponse } from "next/server";
import { select_portraits } from "@/db/services";

export async function GET() {
    try {
        const result = await select_portraits();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching films:', error);
        return NextResponse.json({ error: 'Internal Server Error', reason: error.message }, { status: 500 });
    }
}