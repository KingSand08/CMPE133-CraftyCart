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
        if (!request.cookies.get("token") && !request.cookies.get("tempToken") ) {
            return NextResponse.json({
                message: "Not Logged in",
                success: false,
                currentShoppingList: null,
            });
        }

        const userId = getDataFromToken(request);
        if (userId) {
            console.log ("USER: " + userId)
        }


        let logged = false;
        if (request.cookies.get("token") !== undefined) {
            logged = true;
        }

        let currentShoppingList = null;
       
        if (logged ) {
            console.log("user logged in");
            const user = await User.findOne({_id: userId});
            // console.log(user);
            const activeListId = await user.get('activeList');
            console.log("Active list: " + activeListId);
            currentShoppingList = await ShoppingList.findOne({_id: activeListId});
        } else {
            currentShoppingList = await ShoppingList.findOne({ownerId: userId});
        }
        console.log (currentShoppingList);
        
       
        //console.log(currentShoppingList);

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