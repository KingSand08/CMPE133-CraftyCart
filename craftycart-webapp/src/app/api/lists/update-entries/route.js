import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/helpers/server/dbConfig";
import ShoppingList from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { clearExtraLists } from "@/helpers/server/clearExtraLists";
import ListEntry from "@/models/entryModel";
import {ObjectId} from 'mongodb';

connect();
// Calls the connect function to establish a connection to the database.


export async function PUT(request){
    try {
    
        const userId = getDataFromToken(request);
        const reqBody = await request.json();
        const { listId, entries, toDelete } = reqBody;

        console.log("updating list: " + listId);

        // verify user permission to update list
        const list = await ShoppingList.findOne({_id: listId, ownerId: userId});
        if (!list) {
            console.log("List not found");
            return NextResponse.json({error: "List not found"}, {status: 404});
        }
        console.log("List found, owner: " + list.ownerId);

        
        
        let newIDs = [];
        entries.forEach( element => {
            if (!element.dbId || element.dbId === undefined) {
                console.log("creating new entry: " + element.text);
                const newEntry = new ListEntry({
                    _id: new ObjectId(),
                    listId: listId,
                    itemText: element.text,
                    brandText: element.brand,
                    checked: element.checked,
                    quantity: element.quantity,
                })

                newEntry.save();
                console.log("new id: " + newEntry._id);


                newIDs.push({localId: element.id, dbId: newEntry._id});

            } else {
                console.log("updating entry: " + element.text);
                ListEntry.updateOne({
                    _id: element.dbId
                }, {
                    itemText: element.text,
                    brandText: element.brand,
                    checked: element.checked,
                    quantity: element.quantity,
                });
            }
        });
            
    
        
        

        toDelete.forEach(async element => {
            console.log("deleting entry: " + element);
            await ListEntry.deleteOne({_id: element});
        });

        console.log(newIDs);
        return NextResponse.json({
            message: "update successful",
            success: true,
            newIDs: newIDs,
        });

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}