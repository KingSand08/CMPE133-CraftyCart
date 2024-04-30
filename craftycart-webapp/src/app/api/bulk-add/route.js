import { connect } from "@/helpers/server/dbConfig";
import Item from "@/models/itemModel";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
    if (req.method == "POST") {
        const items = await req.json();
        console.log(items);
        try {
            const result = await Item.insertMany(items);
            return NextResponse.json({
                message: "items successfully generated",
                success: true
            })
        }
        catch (err) {
            console.log(err);
            return NextResponse.json({
                error: err.message,
                success: false
            }, { status: 500 })
        }
    } else {
        // res.status(405).json({ "message": 'Method Not Allowed' });
        return NextResponse.json({
            error: "method not allowed :(",
            success: false
        }, { status: 405 })
    }
}