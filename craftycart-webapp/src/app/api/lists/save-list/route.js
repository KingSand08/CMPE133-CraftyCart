import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
   
    console.log (request);
    const userId = getDataFromToken(request);
    if (!userId) {
        return NextResponse.json(
            {error: "user not logged in"}, 
            {status: 400});
    }

    const reqBody = await request.json();
    const { listId, save } = reqBody;

    const list = await ShoppingList.findOne({_id: listId, ownerId: userId});

    if (!list) {
        return NextResponse.json(
            {error: "user does not own list"}, 
            {status: 400});
    }

    try {
        list.saved = save;
        await list.save();
    } catch (e) {
        return NextResponse.json(
            {error: "error updating list"}, 
            {status: 500});
    }

    return  NextResponse.json({
        message: "List saved successfully",
        success: true
    });



    


}