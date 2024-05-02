import { connect } from "@/helpers/server/dbConfig";
import Store from "@/models/storeModel";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
    console.log("request recieved");
    if (req.method == "POST") {
        const storeData = await req.json();
        console.log(storeData);
        try {
            const result = await Store.insertMany(storeData);
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
        console.log("no POST");
        return NextResponse.json({
            error: "method not allowed :(",
            success: false
        }, { status: 405 })
    }
}