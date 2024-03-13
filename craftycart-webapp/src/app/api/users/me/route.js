import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "mongoose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import React from "react"; // Import React library


try {
    connect();
    console.log("Database connected");
} catch (error) {  
    console.log(error.message);
}

export async function GET(request){
    try {

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);

        // Find the user in the database based on the user ID
    
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
        
    }
}