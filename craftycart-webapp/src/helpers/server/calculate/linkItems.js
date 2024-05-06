import ListEntry from "@/models/entryModel";
import Item from "@/models/itemModel";
import Store from "@/models/storeModel";
import { ObjectId } from 'mongodb';

export default async function linkItems(listItems) {

    
    //console.log(listItems);
    try {
        await listItems.forEach(async (entry) => {
        
            const  similar = await Item.fuzzySearch(entry.itemText).lean();
            console.log("SEARCH FOR: " + entry.itemText);
            
            //let seen = [];
            //let toLink = [];
            // similar.forEach((item) => {
            //     const storeid = item.storeID;

            //         toLink.push(item);
            //         seen.push(item.storeID);
                
            // });

            ///// TODO: replace with better algorithm using confidence Scores
            //toLink = similar.slice(0, 4);

            //console.log(toLink);

            // don't know why this isnt working
            //////////////
            const matching = similar.filter((item) => {
                
                //console.log("item: " + item.name + " " + "confidence: " + item.confidenceScore);
                return item.confidenceScore > 3;
            });

            await matching.forEach((item)=>{
                console.log(item.name);
            });
            // console.log("similar: " + similar);
            // console.log("confidence: " + similar.confidenceScore);

            console.log("UPDATING: " + entry._id + " linked");
            await ListEntry.updateOne({_id: entry._id}, {linked: matching}).catch (() => {
                console.log ("ERROR");
            });
        });
        return true;
    } catch (e) {
        return false;
    }


}

// maybe use this
///https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose

