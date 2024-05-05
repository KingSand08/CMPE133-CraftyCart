
'use client'
import Image from "next/image"
import PropTypes from 'prop-types';
import { useContext, useState } from "react";
import { ScreenContext } from "@/components/list/screenContext";


// SavedListEntry.propTypes = {                                        //defines what an object (prop) of SavedListEntry should contain

//     entryData: PropTypes.shape( {
//         title: PropTypes.string,
//         firstItem: PropTypes.string,
//         secondItem: PropTypes.string,
//         thirdItem: PropTypes.string,
//     })
//   };

  //need to add function to restore list 

  const restoreList = ( listID ) => {                       //should restoreList be a funciton of entry or the container?

    //set current ID of list 

  }

export default function SavedListEntry({ entryData, clickAction }) {           

    const { screen } = useContext(ScreenContext);

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
                                                width="60" height="60"
                                                onClick={clickAction}>
                        </Image>
                                                                       
                    </button> 

                    <button>
                        <p className = "border border-black rounded-md" onClick={()=> restoreList({entryData._id})}>Restore</p>
                    </button> 
                </div>
            </div>
        </div>
    )
}
