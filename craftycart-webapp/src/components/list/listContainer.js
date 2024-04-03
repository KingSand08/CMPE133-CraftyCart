"use client";
import Image from "next/image";
import SearchBar from "../searchbar";
import ListEntry from "./listEntry";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../spinner";


export default function ListContainer ( ) {
    const [isLoading, setLoading] = useState(true);
    const [nextId, setNextId] = useState(1);
    const [entries, setEntries] = useState([
        {
            id: 0,
            text: '',
            completed: false,
        }
    ]);
    const [listId, setListId] = useState(0);
    const router = useRouter();
    const [needNewList, setNeedNewList] = useState(false);

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

    async function newList() {
        const response = await axios.get('/api/lists/new-list');
        console.log(response.data.message);
        router.refresh();
    }

    async function loadList() {
        let response = await axios.get('/api/lists/load-current');     
        console.log(response.data.currentShoppingList);  
        if (response.data.currentShoppingList === null) {
            await axios.get('/api/lists/new-list');
            response = await axios.get('/api/lists/load-current');
        } 
        setListId(response.data.currentShoppingList._id);
        setLoading(false);
        
         
    }

    useEffect(() => {
        loadList ();
    }, []);

    return (
        <div className="bg-[color:var(--bg-white)]">
            <SearchBar addEntry={addEntry}/>
            
            <div>
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
            {isLoading ? <Spinner /> : null }
            

            {/* Replaced by search bar:
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
            </div> */}
        </div>
        
        
    );
}