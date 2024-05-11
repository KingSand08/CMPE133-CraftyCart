import { connect } from "@/helpers/server/dbConfig";
import Item from "@/models/itemModel";
import Store from "@/models/storeModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
    
   
        try {
            await Store.deleteMany({});
            await Item.deleteMany({});
            return NextResponse.json({
                message: "Database cleared successfully.",
                success: true
            });
        } catch (err) {
            return NextResponse.json({
                error: err.message,
                success: false
            }, { status: 500 });
        }
   
}