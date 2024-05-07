import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
// Defines an asynchronous POST request handler.
    try {
        if (!request.cookies.get("token") ) {
            return NextResponse.json({
                error: "Not Logged in",
               
            }, {status:400});
        }

        const userId = getDataFromToken(request);
        if (userId) {
            console.log ("USER: " + userId)
        }

        const responseBody = await request.json();
        const { listId } = responseBody;

        const res = await User.updateOne({_id: userId}, {$set: {activeList: listId}} );
        
       
        //console.log(currentShoppingList);
        if (res) {
            const response = NextResponse.json({
                message: "Active List set",
                success: true
            });
            return response;
        }

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}