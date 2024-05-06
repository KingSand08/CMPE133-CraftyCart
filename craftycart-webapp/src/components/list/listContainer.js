
"use client";

import Image from "next/image";
import SearchBar from "../searchbar";
import ListEntry from "./listEntry";
import { use, useEffect, useState, useMemo, componenetDidMount } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../spinner";
import {saveList} from "@/helpers/client/saveList";
import { set } from "mongoose";


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
       
    // when time is 0, save the list, modifiying functions set the timer > 0, and delay a save
    const[timeLeft, setTimeLeft] = useState(-1);

    useEffect(() => {
        loadList();
        
    }, []);

    useEffect(() => {
        if (timeLeft < 0) {
            return;
        }

        if (timeLeft === 0) {
            console.log("SAVING...");
            console.log(entries);
            saveList(entries, setEntries, currentList, toDelete, setToDelete,);
            setTimeLeft(-1);
            return;
        }

        const interval = setInterval(() => {
            
            setTimeLeft(timeLeft - .25);
            console.log(timeLeft);
        }, 250);

        return () => clearInterval(interval);

    }, [timeLeft]);


    


    const addEntry = (itemName='', brandName='', quantity=1) => {
        addEntryLocal(itemName, brandName, quantity);

        // Code to run on an entry addition that shouldn't be after loading the list
        // I am not using this right now so essentially, this is just a wrapper for addEntryLocal
    }
    const addEntryLocal = (itemName='', brandName='', quantity=1) => {
        setNextId(nextId + 1);
        console.log(itemName)
        const newEntry = {
            id: nextId,
            dbId: null,
            text: itemName,
            brand: brandName,
            quantity: quantity,
            completed: false,
        }
        
        setEntries([...entries, newEntry]);
        setTimeLeft(1);
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
        setTimeLeft(1);
    }

    async function newList() {
        const response = await axios.get('/api/lists/new-list');
        console.log(response.data.message);
        //router.refresh();
        window.location.reload();
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
        setToDelete([...toDelete, ...entries.map(entry => entry.dbId)]);
        setEntries([]);
        setTimeLeft(1);
    }

    function modifyEntry(newEntry, index) {
        const newEntries = [...entries];
        newEntries[index] = newEntry;
        setEntries(newEntries);
        setTimeLeft(1);
    }

    return (
        <div className="bg-[color:var(--bg-white)] mb-24">
            <div className="fixed top-22 w-screen pr-12 z-10">
            <SearchBar addEntry={addEntry} clear={newList}/>
            {
                timeLeft <= 0 &&
                <div className={`
                    flex justify-center 
                    text-blue-400 
                    transition-all 
                    duration-200
                    opacity-0
                     ${timeLeft === -1 ? "translate-y opacity-100" : "-translate-y-5"}
                    `}>
                    All Changes Saved!
                </div> 
             
            }
            {
                timeLeft > 0 &&
                <div className={`
                    flex justify-center 
                    text-blue-400 
                    transition-all 
                    duration-200
                    opacity-100
                     ${timeLeft === -1 ? "-translate-y-5 opacity-0" : "-translate-y-0"}
                    `}>
                    Saving...
                </div> 
             
            }
            </div>
            <div className="relative pt-28 z-0"> 
            {/*
            A button that can be used to manually save the list

            <button
                className="w-full bg-red border-black border-2 p-2"
                onClick={() => saveList(entries, setEntries, currentList, toDelete, setToDelete)}>
                    Debug Save All
            </button> */}
            
             
            <div>
                {entries.map((entry, index) => {
                    //console.log(entry.id + " rendered");
                    return (
                        <ListEntry 
                            updateEntry={modifyEntry}
                            deleteSelf={deleteEntry} 
                            key={entry.id} 
                            localId={entry.id}
                            entryInfo={entry}
                            
                        />
                    );
                })}

                 
            </div>
            { entries.length === 0 &&
                <button className="opacity-100 w-full" onClick={() => addEntry('New Item', 'Any Brand', 1)}>
                    <ListEntry
                        deleteSelf={()=>{return null}}
                        localId={-1}
                        entryInfo={{text: "New Item...", brand: "Brand Name", quantity: 0, checked: false, completed: false, template: true}}
                    />
                </button>
            } 
           

            {/* {isLoading ? <Spinner /> : null }
            <div className="h-20 bg-transparent"></div> */}

            </div>
        </div>
        
        
    );
}