import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";
import ListEntry from "@/models/listModel";

connect();
// Calls the connect function to establish a connection to the database.


export async function GET(request){
// Defines an asynchronous POST request handler.

    if (!request.cookies.get("token") && !request.cookies.get("tempToken") ) {
        return NextResponse.json({
            error: "Not Logged in, no tempory account",
        }, {status:400});
    }

    const userId = getDataFromToken(request);
    if (request.cookies.get("token") === undefined) {
        return NextResponse.json({
            error: "not logged in"
        }, {status: 400});
    }

    try {

        

        const savedLists = await ShoppingList.find({ 
            ownerId: userId,
            saved: true,
        });


        const historyLists = await ShoppingList.find({
            ownerId: userId,
            saved: false,
        });
       
            
        // console.log(savedLists);
        // console.log(historyLists);

        async function getPreview(inList) {
            let preview = [];
            for (let i = 0; i < inList.length; i++) {

                const entries = await ListEntry.find({listId: inList[i].get('_id')});
                console.log("Entries of " + inList[i].get('name') + ": ");
                console.log(entries);
                preview.push({
                    listId: inList[i].get('_id'),
                    name: inList[i].get('name'),
                    creationDate: inList[i].get('creationDate'),
                    saved: inList[i].get('saved'),
                    entriesPreview: entries.slice(0, 3)
                    // Entries preview is not working so front end just calls load-entries
                })
            } 
            return preview;
        }

        const savedWithEntries = await getPreview(savedLists);
        const historyWithEntries = await getPreview(historyLists);
        
        console.log(savedWithEntries);
        console.log(historyWithEntries);
            
        

        // if (logged ) {
        //     const user = await User.findOne({_id: userId});
        //     const activeListId = user.activeList;
        //     currentShoppingList = await ShoppingList.findAll({_id: activeListId});
        // } else {
        //     currentShoppingList = await ShoppingList.findAll({ownerId: userId});
        // }
        
       
        //console.log(currentShoppingList);

        const response = NextResponse.json({
            message: (savedLists.length + historyLists.length) + " lists loaded successfully",
            success: true,
            data: {saved: savedWithEntries, history: historyWithEntries}
        });
        return response;

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500});

    }
}