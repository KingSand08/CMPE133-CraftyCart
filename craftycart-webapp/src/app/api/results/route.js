import { connect } from "@/helpers/server/dbConfig";
import Item from "@/models/itemModel";
import ListEntry from "@/models/entryModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import linkItems  from "@/helpers/server/calculate/linkItems.js";
import findStores from "@/helpers/server/calculate/findStores.js";
import ShoppingList from "@/models/listModel";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import getCurrentList from "@/helpers/server/getCurrentList.js";


connect();

export async function GET(req) {
   
    // const exampleStores = [
    //     {name: "Target", address: "492 St. Road", total: 44.0, missing: 12},
    //     {name: "Trader Joes", address: "492 St. Road Long address that might go off the screen", total: 6150, missing: 3},
    //     {name: "Walmart", address: "", total: 2.65, missing: 20},
    //     {name: "7-11", address: "492 St. Road", total: 10000, missing: 2},
    //     {name: "Safeway", address: "492 St. Road", total: 134.65, missing: 200},
    //   ]
    
    // return NextResponse.json({
    //         message: "top 5 stores found",
    //         success: true,
    //         topStores: exampleStores
    // });

    

    const currentShoppingList = await getCurrentList(req);
    if (currentShoppingList === null) {
        return NextResponse.json({
            message: "No token",
            success: false,
            topStores: null,
        });
    }

    console.log("current list: " + currentShoppingList);
    console.log("listid: " + currentShoppingList.get('_id'));

    const listItems = await ListEntry.find({listId: currentShoppingList.get('_id')});
    console.log (listItems);
    
    // items linked after every update of list
    //
    // const res = await linkItems(listItems);
    // if (!res) {
    //     return NextResponse.json({
    //         error: "could not link",
    //     }, {status: 500});
    // }


    let calculatedStores;
    console.log ("Items should be linked, finding stores:");
    calculatedStores =  await findStores(listItems);

    calculatedStores.sort((a, b) => {
        if (a.missing == b.missing) {
            return a.total - b.total;
        } else {
            return a.missing - b.missing;
        }
    })

    calculatedStores = calculatedStores.slice(0, 5);
    calculatedStores.forEach((store, index) => {
        store.index = index;
    })

    if (calculatedStores !== null) {
        return NextResponse.json({
            message: "top 5 stores found",
            success: true,
            topStores: calculatedStores
         });
    } else {
        return NextResponse.json({
            error: "no stores found",
            success: false,
            topStores: null,
        }, { status: 405 });
    }
    

}

