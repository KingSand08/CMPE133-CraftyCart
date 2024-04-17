
import {connect} from "@/helpers/server/dbConfig";
import ListEntry from "@/models/entryModel";
import User from "@/models/userModel";
import ShoppingList from "@/models/listModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect();

export async function GET(request){ 

    let currentListId = 0;
    
    const userId = await getDataFromToken(request);

    const user = await User.findOne({_id: userId});
    if (user) {
        console.log(user.activeList);
        currentListId = user.activeList;
    } else {
        const currList = await ShoppingList.findOne({ownerId: userId});
        //console.log(currList);
        currentListId = currList._id;
    }
    //console.log(currentListId);
    await ListEntry.deleteMany({listId: currentListId});

    for (let i = 0; i < 20; i++) {
        const newEntry = new ListEntry({
            listId: currentListId,
            itemText: "Item " + i,
            brandText: "Brand " + i,
            checked: false,
            quantity: i,
            linked: []
        });
        await newEntry.save();
    }

    return NextResponse.json({message: "Entries added successfully", success: true});
}