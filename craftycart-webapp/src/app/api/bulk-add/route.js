import { connect } from "@/helpers/server/dbConfig";
import Item from "@/models/itemModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


connect();

export async function POST(req) {
    if (req.method == "POST") {
        const items = await req.json();
        console.log(items);
        try {
            const result = await Item.insertMany(items);
            return NextResponse.json({
                message: result,
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
        return NextResponse.json({
            error: "method not allowed :(",
            success: false
        }, { status: 405 })
    }
}