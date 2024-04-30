
//get list data from DB

import Image from "next/image"
import PropTypes from 'prop-types';
import { useContext } from "react";
import { ScreenContext } from "@/app/(private)/saved-lists/page";

SavedListEntry.propTypes = {                                        //defines what an object (prop) of SavedListEntry should contain

    entryData: PropTypes.shape( {
        title: PropTypes.string,
        firstItem: PropTypes.string,
        secondItem: PropTypes.string,
        thirdItem: PropTypes.string,
    })
  };

  //need to add function to restore list 

export default function SavedListEntry({ entryData, clickAction }) {             //entryData is the parameter of a SavedListEntry

    const screen = useContext(ScreenContext);

    return (
        <div>
            <div className = " m-2 p-4 w-96 flex flex-row grow box-border rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] items-center">
                <div className = "flex flex-col grow m-3">
                    <p className = "text-green-500 text-4xl my-4">{entryData.title}</p>

                    <li className = "mx-2">{entryData.firstItem}</li>
                    <li className = "mx-2">{entryData.secondItem}</li>
                    <li className = "mx-2">{entryData.thirdItem}</li>   
                </div>
                <div className = "flex flex-col">
                    <button className = "mx-4 mb-6">
                        <Image src = {screen === "Saved" ? "/menu.svg" : "/plus.svg" }
                                                onClick={()=> clickAction(entryData.ID)}
                                                width="60" height="60"></Image>
                                                                        {/* displays a minus/plus sign depending on if screen is "Saved" or "History" */}
                    </button> 

                    <button>
                        <p className = "border border-black rounded-md" onClick={()=> restoreList}>Restore</p>
                    </button> 
                </div>
            </div>
        </div>
    )
}

// Shopping lists are tied to a user id
// So you query the shopping lists for ones that match userid