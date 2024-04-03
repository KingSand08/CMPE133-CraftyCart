import ShoppingList from "@/models/listModel";

export async function clearExtraLists(userId) {
    const maxLists = 10;

    const count = await ShoppingList.countDocuments({
            ownerId: userId, saved: false
        });
    if (count > maxLists) {
        const excess = count - maxLists;

        const listsToDelete = await ShoppingList.find({
            ownerId: userId, saved: false
        }).sort({creationDate: 1}).limit(excess);

        for (const list of listsToDelete) {
            await ShoppingList.deleteOne({_id: list._id});
        }
    }
    
}