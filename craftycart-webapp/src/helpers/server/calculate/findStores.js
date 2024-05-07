import Store from "@/models/storeModel";
import User from "@/models/userModel";
import ListEntry from "@/models/listModel";
import Item from "@/models/itemModel";


export default async function findStores( list ) {
    let items = [];

    for (let i = 0; i < list.length; i++) {
        let sublist = [];
        const entry = list[i];
        for (let j = 0; j < entry.linked.length; j++) {
            const link = entry.linked[j];
            const item = await Item.findById(link);
            sublist.push(item);

        }
        items.push(sublist);
    }
    console.log(items);

    // TODO: make this dependant on local stores
    const stores = await Store.find();
    let storesWithPrice = [];
    stores.forEach((store, index) => {
        const newStore = {
            name: store.get('name'),
            locationName: store.get('locationName'),
            address: store.get('address'),
            total: 0,
            missing: 0,
            itemsFound: [],
            itemsMissing: []
        }
        storesWithPrice.push(newStore);
    });
    for (let i = 0; i < stores.length; i++) {
        for (let j = 0; j < items.length; j++) {
            let k = 0;
            for (k = 0; k < items[j].length; k++) {
                if (items[j][k].get('storeID').equals(stores[i].get('_id'))){
                    storesWithPrice[i].total += items[j][k].get('price') * list[j].get('quantity');

                    const selectedItem = {
                        name: items[j][k].get('name'),
                        price: items[j][k].get('price'),
                        quantity: list[j].get('quantity')
                    }

                    storesWithPrice[i].itemsFound.push(selectedItem);

                    console.log("added price of: " + items[j][k].get('name') + " to: " + stores[i].get('name'));
                    break;
                }
            }
            if (k === items[j].length) {
                storesWithPrice[i].missing += 1;
                //console.log(list[j].name);
                const missingItem = {
                    name: list[j].get('itemText'),
                    quantity: list[j].get('quantity')
                }

                storesWithPrice[i].itemsMissing.push(missingItem);
            }
        }
    }
    
    return storesWithPrice;
    
    


}