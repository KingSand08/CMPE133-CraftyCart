import {connect} from "@/helpers/server/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()
// Calls the connect function to establish a connection to the database.

export async function POST(request){
    
        const reqBody = await request.json();
        const {newEmail, newUsername} = reqBody;

        console.log(newEmail + " " + newUsername);

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);

        // Find the user in the database based on the user ID
        const user = await User.findOne({_id: userId}).select("-password");
        

        if (!user) {
            console.log("user not found");
            return NextResponse.json({error: "User not found"}, {status: 400})
        }
        
        try {
            if (newEmail != null) {
                user.email = newEmail;
                console.log("updating email");
            }
            if (newUsername != null) {
                user.username = newUsername;
                console.log("updating username");
            }
            await user.save();
        
            // Create a JSON response indicating successful login
            const response = NextResponse.json({
                message: "update successful",
                success: true,
            });
            return response;

        } catch (e) {
            console.log("Error saving");
            return NextResponse.json({
                error: "failed to update user info"
            }, {status: 500});
        }

   
}