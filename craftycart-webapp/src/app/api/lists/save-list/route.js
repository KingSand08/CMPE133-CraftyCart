import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
   try {
    console.log (request);
    if (request.cookies.get('token') === undefined) {
        return NextResponse.json(
            {error: "user not logged in"}, 
            {status: 400});
    }
    const userId = getDataFromToken(request);
    if (!userId) {
        return NextResponse.json(
            {error: "user not logged in"}, 
            {status: 400});
    }

    const reqBody = await request.json();
    const { listId, save } = reqBody;

    try {
        const list = await ShoppingList.updateOne({_id: listId, ownerId: userId}, {$set: {
            saved: save
            }
        })
    } catch (e) {
        return NextResponse.json(
            {error: "error updating list"}, 
            {status: 500});
    }
    
    // if (!list) {
    //     return NextResponse.json(
    //         {error: "user does not own list"}, 
    //         {status: 400});
    // }

    // try {
    //     list.saved = save;
    //     await list.save();
    // } catch (e) {
    //     return NextResponse.json(
    //         {error: "error updating list"}, 
    //         {status: 500});
    // }

    return  NextResponse.json({
        message: "List saved successfully",
        success: true
    });
} catch (e) {
    return NextResponse.json({
        error: "error saving list"
    }, {status: 500})
}


    


}