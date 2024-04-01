import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";

connect();
// Calls the connect function to establish a connection to the database.


export async function GET(request){
// Defines an asynchronous POST request handler.
    try {
        let token = null;
        let userId = null;
        if (request.cookies.get("token") === undefined && 
            request.cookies.get("tempToken") === undefined) {
            userId = new ObjectId();
            const tokenData = {
                id: userId,
                username: "guest",
                email: "guest"
            };
            token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        } else {
            
            userId = await getDataFromToken(request);
            
        }
        if (request.cookies.get("token") === undefined ) {
            
            await ShoppingList.deleteMany({ownerId: userId});
        }

        const newList = new ShoppingList({
            ownerId: userId,
        });
        
        const savedList = await newList.save();

        if (!userId) {
            console.log("internal error");
        }

        const response = NextResponse.json({
            message: "List added successfully",
            success: true,
            savedList
            
        });

        if (token != null)
        {
            response.cookies.set("tempToken", token, {
                httpOnly: true,
            });
        }
        return response;


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}