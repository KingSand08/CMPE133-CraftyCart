import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import {ObjectId } from 'mongodb';
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { clearExtraLists } from "@/helpers/server/clearExtraLists";
import ListEntry from "@/models/entryModel";

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
    try {
    
        const userId = getDataFromToken(request);
        const reqBody = await request.json();
        const { listId, entries } = reqBody;

        console.log("updating list: " + listId);

        // verify user permission to update list
        const list = await ShoppingList.findOne({_id: listId, ownerId: userId});
        if (!list) {
            console.log("List not found");
            return NextResponse.json({error: "List not found"}, {status: 404});
        }
        console.log("List found, owner: " + list.ownerId);
        
        entries.forEach(async element => {
            if (!element.dbId || element.dbId === undefined) {
                console.log("creating new entry: " + element.itemText);
                await new ListEntry({
                    dbId: new ObjectId(),
                    listId: listId,
                    itemText: element.text,
                    brandText: element.brand,
                    checked: element.checked,
                    quantity: element.quantity,
                }).save();

            } else {
                console.log("updating entry: " + element.itemText);
                await ListEntry.updateOne({
                    _id: element.dbId
                }, {
                    itemText: element.text,
                    brandText: element.brand,
                    checked: element.checked,
                    quantity: element.quantity,
                });
            }
        });

        console.log("update successful");       
        return NextResponse.json({
            message: "update successful",
            success: true,

        });

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}