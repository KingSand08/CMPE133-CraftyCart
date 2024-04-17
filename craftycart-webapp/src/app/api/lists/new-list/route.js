import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { clearExtraLists } from "@/helpers/server/clearExtraLists";

connect();
// Calls the connect function to establish a connection to the database.


export async function GET(request){
// Defines an asynchronous POST request handler.
    try {

        let userId = null;
        let logged = false;
        let newCookies = null;

        

        if ( request.cookies.get("token") === undefined && 
        request.cookies.get("tempToken") === undefined ) {
            console.log("Creating a new guest token");
            userId = new ObjectId();
            const tokenData = {
                id: userId,
                username: "guest",
                email: "guest"
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "7d"});

            newCookies = {
                name: "tempToken",
                token: token,
                options: {
                    httpOnly: true,
                },
            };
            
        } else {
            userId = await getDataFromToken(request);
        }
        
        if (request.cookies.get("token") !== undefined) {
            logged = true;
        }
        
        //console.log(userId, logged);
       
        if (!logged) {
            console.log("Deleting guest's lists");
            await ShoppingList.deleteMany({ownerId: userId});
        }

        const newList = new ShoppingList({
            ownerId: userId,
        });

        const savedList = await newList.save();
        const response = NextResponse.json({
            message: "List added successfully",
            success: true,
            savedList

        });
        if (newCookies) {
            response.cookies.set(newCookies.name, newCookies.token, newCookies.options)
        }

        if (logged) {
            const user = await User.findOne({_id: userId});
            user.activeList = savedList._id;
            await user.save();

            let numLists = ShoppingList.countDocuments({ownerId: userId});
            //e.log(numLists);

            clearExtraLists(userId);
        }

        return response;


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}