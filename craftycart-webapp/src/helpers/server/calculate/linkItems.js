import ListEntry from "@/models/entryModel";
import Item from "@/models/itemModel";
import Store from "@/models/storeModel";
import { ObjectId } from 'mongodb';

export default async function linkItems(list) {

    const listItems = await ListEntry.find({listId: list._id});
    console.log(listItems);

    listItems.forEach(async (entry) => {
       
        const  similar = await Item.fuzzySearch(entry.itemText);
        console.log("SEARCH FOR: " + entry.itemText);
        
        let seen = [];
        let toLink = [];
        // similar.forEach((item) => {
        //     const storeid = item.storeID;

        //         toLink.push(item);
        //         seen.push(item.storeID);
            
        // });

        ///// TODO: replace with better algorithm using confidence Scores
        toLink = similar.slice(0, 4);

        console.log(toLink);

        // don't know why this isnt working
        //////////////
        // const matching = similar.filter((item) => {
        //     console.log(item + " " + item.confidenceScore);
        //     return item.confidenceScore > 3;
        // });

        // console.log (matching);

        // console.log(similar);
        console.log("UPDATING: " + entry._id + " linked");
        ListEntry.updateOne({_id: entry._id}, {linked: toLink}).catch (() => {
            console.log ("ERROR");
        });
    });


}

// maybe use this
///https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose

