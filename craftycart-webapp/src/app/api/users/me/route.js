
import {connect} from "@/helpers/server/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
// Calls the connect function to establish a connection to the database.

export async function GET(request){
    try {

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);

        // Find the user in the database based on the user ID
        const user = await User.findOne({_id: userId}).
        select("-password");
        

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 400})
        }


        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({error: "get request internal error"}, {status: 400})
        
    }
}