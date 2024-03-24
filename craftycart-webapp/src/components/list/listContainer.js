"use client";
import Image from "next/image";
import ListEntry from "./listEntry";
import { useState } from "react";


export default function ListContainer () {

    const [nextId, setNextId] = useState(1);
    

    const [entries, setEntries] = useState([
        {
            id: 0,
            text: '',
            completed: false,
        }
    ]);

    const addEntry =  () => {
        setNextId(nextId + 1);
        const newEntry = {
            id: nextId,
            text: '',
            completed: false,
        }
        
        setEntries([...entries, newEntry]);
        console.log(nextId + " added");
    }

    const deleteEntry = (localId) => {
        console.log(localId + " removed");
        const newEntries = entries.filter(entry => entry.id !== localId);
        setEntries(newEntries);
    }

    return (
        <div>
            <div>
                {entries.map((entry, index) => {
                    //console.log(entry.id + " rendered");
                    return (
                        <ListEntry deleteSelf={deleteEntry} key={entry.id} localId={entry.id}/>
                    );
                })}
            </div>
            <div className="flex align-center">
                <button onClick={addEntry} className="mx-auto">
                    <Image 
                        src="/plus.svg"
                        alt="add"
                        className="invert-color w-20 h-20"
                        width={200}
                        height={48}
                        priority
                    />
                </button>
            </div>
            <div className="h-16">
                {
                    // stupid fix for keeping the 
                    // add button on the screen 
                    // when you reach the bottom
                }
            </div>
        </div>
        
        
    );
}