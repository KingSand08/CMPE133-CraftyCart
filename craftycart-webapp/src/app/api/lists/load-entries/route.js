import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";
import ListEntry from "@/models/entryModel";

connect();
// Calls the connect function to establish a connection to the database.


export async function POST(request){
// Defines an asynchronous POST request handler.
    try {
        const userId = getDataFromToken(request);
        const responseBody = await request.json();
        const { listId } = responseBody;

        if (!listId) {
            return NextResponse.json({error: error.message + " NO LIST ID PROVIDED"}, {status: 500});
        }

        if (ShoppingList.countDocuments({_id: listId, ownerId: userId}) === 0) { 
            return NextResponse.json({error: "List not found"}, {status: 404});
        }

        const entries = await ListEntry.find({listId: listId});
        return NextResponse.json({
            message: "Entries loaded successfully",
            success: true,
            entries
        });
        

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}