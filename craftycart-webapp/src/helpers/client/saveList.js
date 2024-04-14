import axios from "axios";

export async function saveList(entries, setEntries, listInfo, toDelete, setToDelete) {
    // entries is an array of all current list entries
    // entry {
        // id: local id of the element
        // dbId: database id of the element
        // text: the user entered item name
        // brand: user chosen brand
        // quantity: int
        // checked: boolean
    //}

    // listInfo is list object of the list that is currently loaded
    // id is db id for the list
    const listId = listInfo._id;

    const responce  = await axios.put('/api/lists/update-entries', {listId: listId, entries: entries, toDelete: toDelete});

    console.log(responce.data);

    const toModify = responce.data.newIDs;
    toModify.forEach((pair) => {
        entries.find(entry => entry.id === pair.localId).dbId = pair.dbId;
    });

    setEntries(entries);
    setToDelete([]);
      

    

}

