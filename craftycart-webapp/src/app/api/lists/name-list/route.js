import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";
import ListEntry from "@/models/listModel";

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
// Defines an asynchronous POST request handler.

    if (!request.cookies.get("token") && !request.cookies.get("tempToken") ) {
        return NextResponse.json({
            error: "Not Logged in, no tempory account",
        }, {status:400});
    }

    const userId = getDataFromToken(request);
    if (request.cookies.get("token") === undefined) {
        return NextResponse.json({
            error: "not logged in"
        }, {status: 400});
    }

    try {

        const responseBody = await request.json();
        const { listId, newName } = responseBody;

        console.log(listId + " renamed to: " + newName);
        await ShoppingList.updateOne({_id: listId}, {$set: {name: newName}});
        
        return NextResponse.json({message: "renamed item"});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500});

    }
}