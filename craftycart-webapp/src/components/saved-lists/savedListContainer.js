"use client";

import { useContext, useState } from "react";
import SavedListEntry from "./savedListEntry";
import Button from "@/components/list/button";
import { ScreenContext } from "@/components/list/screenContext";

export default function SavedListContainer({ lists }) {

    console.log(lists);

    return (
       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                
                {lists.map((list, index) => {
                    return (
                        <SavedListEntry
                            key={index}
                            entryData={list}
                        />
                    )
                })}




            </div>


       
    );
}

