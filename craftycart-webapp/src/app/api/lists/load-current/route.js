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

        let currentShoppingList = null;
        const activeListId = await User.findOne({_id: userId}).activeList;
        if (!activeListId) {
            currentShoppingList = await ShoppingList.findOne({ownerId: userId});
        } else {
            currentShoppingList = await ShoppingList.findOne({_id: activeListId});
        }

        console.log(currentShoppingList);

        const response = NextResponse.json({
            message: "List loaded successfully",
            success: true,
            currentShoppingList
        });


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}