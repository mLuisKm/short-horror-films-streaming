import { NextResponse } from "next/server";
import { film_details } from "@/db/services";

export async function GET(request, {params}) {
    try {
        const result = await film_details(await params);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching films:', error);
        return NextResponse.json({ error: 'Internal Server Error', reason: error.message }, { status: 500 });
    }
}