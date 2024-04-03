import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";

connect();
// Calls the connect function to establish a connection to the database.


export async function GET(request){
// Defines an asynchronous POST request handler.
    try {
        const userId = getDataFromToken(request);
        let logged = false;
        if (request.cookies.get("token") !== undefined) {
            logged = true;
        }

        let currentShoppingList = null;
       
        if (logged ) {
            const user = await User.findOne({_id: userId});
            const activeListId = user.activeList;
            currentShoppingList = await ShoppingList.findOne({_id: activeListId});
        } else {
            currentShoppingList = await ShoppingList.findOne({ownerId: userId});
        }
        
       
        console.log(currentShoppingList);

        const response = NextResponse.json({
            message: "List loaded successfully",
            success: true,
            currentShoppingList
        });
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}