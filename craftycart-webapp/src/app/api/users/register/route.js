import {connect} from "@/helpers/server/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();
// Calls the connect function to establish a connection to the database.


export async function POST(request){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
// Parses the request body to extract username, email, and password.
        if (!username) {
            console.log("invalid username");
            return NextResponse.json({error: "Must fill out Username feild"}, {status: 300});
        }
        if (email.length < 2) {
            console.log("invalid email");
            return NextResponse.json({error: "Must fill out Email feild"}, {status: 300});
        }

        if (password.length < 6) {
            console.log("invalid password");
            return NextResponse.json({error: "Please enter a password longer than 7 characters"}, {status: 300});
        }
//Checks if a user with the provided email already exists. 
        const user = await User.findOne({email});

//If yes, returns a 400 response.
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 300});
        }

//hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

// Saves the new user to the database.
        const savedUser = await newUser.save();


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}