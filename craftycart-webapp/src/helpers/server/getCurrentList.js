import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import ShoppingList from "@/models/listModel";

export default async function  getCurrentList(request) {

    if (!request.cookies.get("token") && !request.cookies.get("tempToken") ) {
       return null;
    }

    const userId = getDataFromToken(request);
    let logged = false;
    if (request.cookies.get("token") !== undefined) {
        logged = true;
    }

    let currentShoppingList = null;
   
    if (logged ) {
        const user = await User.findOne({_id: userId});
        const activeListId = user.activeList;
        currentShoppingList = await ShoppingList.findOne({_id: activeListId});
    } else {
        currentShoppingList = await ShoppingList.findOne({ownerId: userId});
    }

    return currentShoppingList;

}