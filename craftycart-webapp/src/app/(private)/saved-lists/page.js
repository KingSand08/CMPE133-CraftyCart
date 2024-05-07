"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import SavedListContainer from "@/components/saved-lists/savedListContainer";
import { ScreenProvider } from "@/components/list/screenContext";


export default function SavedLists() {
    
    //  await axios.put('aip/lists/save-list', {listId: , saved: true});

    const router = useRouter()
    const [data, setData] = useState("nothing")                            //state variable containing userData

    const [userSavedLists, setUserSavedLists] = useState([]);
    const [userHistoryLists, setUserHistoryLists] = useState([]); 
    // const [currentTab, setCurrentTab] = useState("Saved");
    

    const getUserDetails = async () => {                                   //function that returns userData
            
        try {
            const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
           
    }

    const getLists = async () => {   

        const res = await axios.get("/api/lists/load-lists", { withCredentials: true, responseType: 'json' });
        setUserSavedLists(res.data.savedLists);
        setUserHistoryLists(res.data.historyLists);

    }

    useEffect(() => {                                                      //calls getUserDetails function on page mount (when new obj added to DOM)
        getUserDetails();
        getLists();
    }, []);


    return(
        <div className="flex justify-center items-center overflow-y-scroll">
                <div className = "mt-28 flex justify-center flex-col">
                    <ScreenProvider>     
                        <SavedListContainer

                        savedLists = {userSavedLists}
                        historyLists = {userHistoryLists}

                        /> 
                    </ScreenProvider>
                </div>  
        </div> 
    )
    
}

