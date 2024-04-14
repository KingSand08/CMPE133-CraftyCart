"use client";
import Image from "next/image";
import SearchBar from "../searchbar";
import ListEntry from "./listEntry";
import { use, useEffect, useState, componenetDidMount } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../spinner";
import {saveList} from "@/helpers/client/saveList";


export default function ListContainer ( ) {
    const [isLoading, setLoading] = useState(true);
    // the next id to be assigned to a new entry
    const [nextId, setNextId] = useState(0);
    // the local list of entries
    const [entries, setEntries] = useState([]);

    // for routing
    const router = useRouter();

    // holds the list object of the currently loaded list
    const [currentList, setList] = useState(null);
    // holds a list of db ids to be removed on next update
    const [toDelete, setToDelete] = useState([]);

    useEffect(() => {
        
        loadList();
        
    }, []);


    const addEntry = (itemName='', brandName='', quantity=1) => {
        addEntryLocal(itemName, brandName, quantity);
    }
    const addEntryLocal = (itemName='', brandName='', quantity=1) => {
        setNextId(nextId + 1);
        console.log(itemName)
        const newEntry = {
            id: nextId,
            dbid: null,
            text: itemName,
            brand: brandName,
            quantity: quantity,
            completed: false,
        }
        
        setEntries([...entries, newEntry]);
        console.log(nextId + " added");


    }

    const deleteEntry = (localId) => {
        console.log(localId + " removed");
        const removed = entries.find(entry => entry.id === localId);
        const newEntries = entries.filter(entry => entry.id !== localId);
        setEntries(newEntries);
        if (removed.dbId) {
            setToDelete([...toDelete, removed.dbId]);
        }
    }

    async function newList() {
        const response = await axios.get('/api/lists/new-list');
        console.log(response.data.message);
        router.refresh();
    }

    async function loadList() {
        let response = await axios.get('/api/lists/load-current');     
         
        if (response.data.status === 401 || response.data.currentShoppingList === null) {
            await axios.get('/api/lists/new-list');
            response = await axios.get('/api/lists/load-current');
        } 
        console.log(response.data.currentShoppingList); 
        
        const listId =  response.data.currentShoppingList;
        const responseEntries = await axios.post('/api/lists/load-entries', {listId: listId});
        console.log(responseEntries.data);
        
        let id = 0;

        const newEntries = [];
        responseEntries.data.entries.forEach((entry) => {
            
            //console.log(id);
            newEntries.push({
                id: id,
                dbId: entry._id,
                text: entry.itemText,
                brand: entry.brandText,
                quantity: entry.quantity,
                checked: entry.checked,
                completed: false,
            });
            id++;
        });

        
        setEntries(newEntries);
        
        // newEntries.data.entries.forEach((entry) => {
        //     addEntryLocal(entry.itemText, entry.brandText, entry.quantity);
        // });

        setLoading(false);
        console.log("List loaded, nextId = " + id);
       
        setNextId(id);

        setList(listId);
        
         
    }

    function clearAll() {
        setEntries([]);
    }

    return (
        <div className="bg-[color:var(--bg-white)]">
            <SearchBar addEntry={addEntry} clear={clearAll}/>
            
            
            <button
                className="w-full bg-red border-black border-2 p-2"
                onClick={() => saveList(entries, setEntries, currentList, toDelete, setToDelete)}>
                    Debug Save All
            </button>
             
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
            {
                entries.length === 0 &&
                <button className="opacity-75 w-full" onClick={() => addEntry()}>
                    <ListEntry
                        deleteSelf={()=>{return null}}
                        localId={-1}
                        entryInfo={{text: "New Item...", brand: "", quantity: 0, checked: false, completed: false, template: true}}
                    />
                </button>
            } 
           

            {isLoading ? <Spinner /> : null }
            <div className="h-20 bg-transparent"></div>

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