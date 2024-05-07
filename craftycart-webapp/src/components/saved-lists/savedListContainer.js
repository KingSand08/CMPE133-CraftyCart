"use client";

import { useContext, useState} from "react";
import SavedListEntry from "./savedListEntry";
import Button from "@/components/list/button";
import { ScreenContext } from "@/components/list/screenContext";

export default function SavedListContainer( {savedLists, historyLists } ) {


    const [nextId, setNextId] = useState(0);                                                 //create state variable controlling ID of the next list

     const [lists, setLists] = useState([]);                                                 //create state variable that contains user's lits
 
     const deleteList = ( listID ) => {                                                        //deletes a list                     

        console.log(listID + " removed");                  
        
        const updatedLists = lists.filter(entryData => entryData._id !== listID);             //creates updatedList containing every element of the 
                                                                                             //original list except the one to be deleted

        setLists(updatedLists);
     }

     const saveList = ( currOwnerID ) => {                                                    //saves a list to lists state varaible                                                 



        setNextId(n => n + 1);                                                              //same as setNextId(nextId + 1);

        const newSavedList = {

            _id: nextId,
            ownerId: currOwnerID,
            saved: true,
            name: "Shopping List",
            creationDate: "2024-05-05T01:45:31.532Z",                                       //replace with date object
            __v: 0

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

  const { screen, setScreen } = useContext(ScreenContext);

  return (
        <div>
            <div className="flex justify-center text-5xl px-10 py-5 text-green-500">
                <Button text={"History"} type={"History"} />
                <Button text={"Saved"} type={"Saved"} />
            </div>
        
            <div className ="grid grid-cols-2 gap-4"> 

            {screen === "Saved" && savedLists ? (
                savedLists.map((entry) => {
                    return (
                        <SavedListEntry
                            key={entry.title}
                            entryData={entry}
                            clickAction={() => {deleteList(entry._id) ; console.log("Delete list")}}
                        />
                    );
                })
            ) : (
            historyLists ? (
                historyLists.map((entry) => {
                    return (
                        <SavedListEntry
                        key={entry.title}
                        entryData={entry}
                        clickAction={() => {saveList(entryData.ownerId) ; console.log("Save list")}}
                        />
                    );
                })
            ) : (
                <p>No lists found</p>
            )
            )}


                {/* <SavedListEntry 
                            entryData={{
                            title: "Protein",
                            firstItem: "Eggs",
                            secondItem: "Beef",
                            thirdItem: "Deez Nuts"
                            }}
                            
                    />

                
                    <SavedListEntry
                            entryData={{
                            title: "Pizza Party",
                            firstItem: "Pepperoni",
                            secondItem: "Swiss Cheese",
                            thirdItem: "Flour"
                            }}
                            
                    /> */}

            </div>

            
        </div>
  );
}
