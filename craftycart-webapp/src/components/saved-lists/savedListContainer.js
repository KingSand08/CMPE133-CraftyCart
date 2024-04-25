"use client";

import { useState , useEffect } from "react";
import SavedListEntry from "./savedListEntry";

// const savedLists = [ {listID: abc},

//                     ];

export default function SavedListContainer() {
    // const [lists, setLists] = useState([]);


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

    return (
        <div>
            <div class="grid grid-cols-2 gap-4">

                
                {/* <SavedListEntry
                    data = {entry}
                    saveSelf =  */}

                <SavedListEntry 
                        title = "Protein" 
                        firstItem = "Eggs" 
                        secondItem = "Beef" 
                        thirdItem = "Deez Nuts"
                />
            
                <SavedListEntry
                        title="Pizza Party"
                        firstItem="Pepperoni"
                        secondItem="Swiss Cheese"
                        thirdItem="Flour"
                />
            </div>
        </div>
    )
}

//eventually get to point where no need to hard code entries, use maps method instead like brlow

// savedLists.maps(entry => <SavedListEntry 
//                         title = {entry.title} 
//                         firstItem = {entry.firstItem} 
//                         secondItem = {entry.secondItem} 
//                         thirdItem = {entry.thirdItem} 
// />);