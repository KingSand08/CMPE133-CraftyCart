import Store from "@/models/storeModel";
import User from "@/models/userModel";
import ListEntry from "@/models/listModel";
import Item from "@/models/itemModel";


export default async function findStores( list ) {
    console.log ("finding stores...");
     
    // const exampleStores = [
    //     {name: "Target", address: "492 St. Road", total: 44.0, missing: 12},
    //     {name: "Trader Joes", address: "492 St. Road Long address that might go off the screen", total: 6150, missing: 3},
    //     {name: "Walmart", address: "", total: 2.65, missing: 20},
    //     {name: "7-11", address: "492 St. Road", total: 10000, missing: 2},
    //     {name: "Safeway", address: "492 St. Road", total: 134.65, missing: 200},
    // ]
      
    // return exampleStores;
    let foundYetPerStore = [];
    
    // TODO: filter to nearby stores
    const stores = await Store.find().lean();
    stores.forEach((store, index) => {
        store.total = 0;
        store.missing = 0;
        foundYetPerStore.push({store: store._id, item_found: false});
    });
 
    await list.forEach(async (entry) => {
        // used when picking only one item for each store
        foundYetPerStore.forEach((curr) => {
            curr.item_found = false;
        });

       
        await entry.linked.forEach( async (item, index) => {

            const itemData = await Item.findOne({_id: item}).lean();
            console.log("item id: " + item + " name " + itemData.name + " store id: " + itemData.storeID);

            for (let i = 0; i < stores.length; i++) {
                console.log(
                    "Store: " + foundYetPerStore[i].store +
                    " item found: " + foundYetPerStore[i].item_found
                );
                

                if ( foundYetPerStore[i].store.equals(itemData.storeID)) {
                    console.log("match");
                    if (foundYetPerStore[i].item_found === false) {
                        console.log(itemData.name + " added to total of: " + stores[i].name);
                        foundYetPerStore[i].item_found = true;
                        stores[i].total += itemData.price * entry.get('quantity');
                        console.log(itemData.price * entry.get('quantity'));
                    }
                }
            }
            
            
        });
        for (let i = 0; i < stores.length; i++) {
            if (foundYetPerStore[i].item_found === false) {
                stores.missing ++;
            }
        }
        //console.log(stores);
    })


    stores.forEach((store)=>{
        console.log("-----> " + store.name + ": " + store.total + " missing: " + store.missing);
    })
    return stores;


}