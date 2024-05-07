"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { ScreenProvider } from "@/components/list/screenContext";
import Button from "@/components/list/button.js"
import Spinner from "@/components/spinner";
import SavedListEntry from "@/components/saved-lists/savedListEntry";



export default function SavedLists() {

    //  await axios.put('aip/lists/save-list', {listId: , saved: true});

    const router = useRouter()
    const [data, setData] = useState("nothing")                            //state variable containing userData

    const [loading, setLoading] = useState(true);
    const [userSavedLists, setUserSavedLists] = useState([]);
    const [userHistoryLists, setUserHistoryLists] = useState([]);
    const [currentTab, setCurrentTab] = useState("Saved");


    const getUserDetails = async () => {                                   //function that returns userData

        try {
            const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }

    }

    const getLists = async () => {

        const res = await axios.get("/api/lists/load-lists", { withCredentials: true, responseType: 'json' }).then((res) => {
            console.log(res.data.data);
            //setUserSavedLists([]);
            //setUserHistoryLists([]);
            setUserSavedLists(res.data.data.saved);
            //setUserHistoryLists(res.data.data.history);
            setLoading(false);
            console.log("loaded");
        })

    }

    useEffect(() => {                                                      //calls getUserDetails function on page mount (when new obj added to DOM)
        //getUserDetails();
        getLists();
    }, []);
    useEffect(() => {                                                      //calls getUserDetails function on page 
        getLists();
    }, [currentTab]);


    return (
            <div className="pb-28  flex-col flex justify-center items-center overflow-y-scroll ">

                <div className="flex justify-center text-xl  text-green-500">
                    <Button text={"History"} currTab={currentTab} setTab={setCurrentTab} />
                    <Button text={"Saved"} currTab={currentTab} setTab={setCurrentTab} />
                </div>

                
                    <div className={`flex justify-center 
                    text-blue-400 
                    transition-all 
                    duration-200
                    opacity-0 ${currentTab == "History" ? 'opacity-100' : ''}`}>
                        Warning: only 10 lists allowed in history, oldest lists will be deleted when new lits are made.
                    </div>
              

                {!loading? 
               
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userSavedLists.map((list, index) => {
                            if ((currentTab == "Saved") == list.saved){
                                return (
                                    <SavedListEntry
                                        key={index}
                                        entryData={list}
                                    />
                                )
                            }
                            return (null)
                            
                        })}
                    </div>

                   
            
                : <Spinner/> }


            </div>




    )

}

