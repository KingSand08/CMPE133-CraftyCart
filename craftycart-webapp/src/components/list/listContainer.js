"use client";
import Image from "next/image";
import SearchBar from "../searchbar";
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

    const addEntry = (itemName='') => {
        setNextId(nextId + 1);
        console.log(itemName)
        const newEntry = {
            id: nextId,
            text: itemName,
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
        <div className="bg-[color:var(--bg-white)] mb-24">            
            <SearchBar addEntry={addEntry}/>
            {entries.map((entry, index) => {
                //console.log(entry.id + " rendered");
                return (
                    <ListEntry 
                        deleteSelf={deleteEntry} 
                        key={entry.id} 
                        localId={entry.id}
                        entryInfo={entry}
                    />
                );
            })}
        </div>
    );
}