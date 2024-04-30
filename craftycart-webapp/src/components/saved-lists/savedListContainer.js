"use client";

import { useState , useEffect } from "react";
import SavedListEntry from "./savedListEntry";
import { useContext } from "react";
import { ScreenContext } from "@/app/(private)/saved-lists/page";

// const savedLists = [ {listID: abc},

//                     ];

export default function SavedListContainer() {

    const [nextId, setNextId] = useState(1);                                                 //create state variable controlling ID of the next list

     const [lists, setLists] = useState([]);                                                 //create state variable that contains user's lits
 
     function deleteList ( listID ) {                                                        //deletes a list                     

        console.log(listID + " removed");                  
        
        const updatedLists = lists.filter(entryData => entryData.id !== listID);             //creates updatedList containing every element of the 
                                                                                             //original list except the one to be deleted

        setLists(updatedLists);
     }

     const saveList = (itemName='') => {                                                    //saves a list to lists state varaible                                                 

        //setNextId(nextId + 1);

        setNextId(n => n + 1);
        console.log(itemName)

        const newList = {
            // id: nextId,
            // text: itemName,
            // completed: false,

            //add properties of list you want to save into an object
        }
        
        setLists([...entries, newList]);
        console.log(nextId + " added");
    }


    // useEffect( () => {
    //      setLists(...lists, {
    //         title: "testlist",
    //         entries: [
    //             "item1", "item2", "item3"
    //         ]

    //      });
    //      console.log(lists);

    // },
    // []      
    // );

    
    //use another context to add elements to the list
    //remember setState(...state, newItem )
        //(can access newItem using document.getElementById("ID"))

    //use another context to remove elemements from the list (argument is itemID)
    //remember setState(...state.filter(element, index) => index !== itemID));
        //if not using first argument ("element" -> can use underscore _ to ignore it)

    //remember that these functions need to be set to the onclick properties of components  

    const screen = useContext(ScreenContext);                                            //creates instance of ScreenContext (check page.js)

    return (
        <div>
            <div class="grid grid-cols-2 gap-4">

                
                {/* <SavedListEntry
                    data = {entry}
                    saveSelf =  */}

                <SavedListEntry 
                        entryData={{
                        title: "Protein",
                        firstItem: "Eggs",
                        secondItem: "Beef",
                        thirdItem: "Deez Nuts"
                        }}
                        clickAction={deleteList} //add conditional to add if screen is on history
                />

            
                <SavedListEntry
                        entryData={{
                        title: "Pizza Party",
                        firstItem: "Pepperoni",
                        secondItem: "Swiss Cheese",
                        thirdItem: "Flour"
                        }}
                        clickAction={deleteList} //add conditional to add if screen is on history
                />
            </div>
        </div>
    )
}

//eventually get to point where no need to hard code entries, use maps method instead like brlow

// savedLists.maps((entry, index) => <SavedListEntry 
//                         title = {entry.title} 
//                         firstItem = {entry.firstItem} 
//                         secondItem = {entry.secondItem} 
//                         thirdItem = {entry.thirdItem} 
// />);