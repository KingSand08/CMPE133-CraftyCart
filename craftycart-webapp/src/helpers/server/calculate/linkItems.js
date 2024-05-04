import ListEntry from "@/models/entryModel";

export default async function linkItems(list) {

    const listItems = await ListEntry.find({listId: list._id});
    console.log(listItems);

    listItems.forEach((entry) => {
        


    });


}


///https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose

