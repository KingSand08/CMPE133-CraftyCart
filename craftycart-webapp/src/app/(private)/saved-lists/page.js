"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import SavedListContainer from "@/components/saved-lists/savedListContainer";
import { ScreenProvider } from "@/components/list/screenContext";
import Button from "@/components/list/button.js"
import Spinner from "@/components/spinner";


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
            setUserSavedLists(res.data.data.saved);
            setUserHistoryLists(res.data.data.history);
            setLoading(false);
            console.log("loaded");
        })

    }

    useEffect(() => {                                                      //calls getUserDetails function on page mount (when new obj added to DOM)
        //getUserDetails();
        getLists();
    }, []);


    return (
            <div className="pb-28  flex-col flex justify-center items-center overflow-y-scroll ">

                <div className="flex justify-center text-xl  text-green-500">
                    <Button text={"History"} currTab={currentTab} setTab={setCurrentTab} />
                    <Button text={"Saved"} currTab={currentTab} setTab={setCurrentTab} />
                </div>

                {true? 
                <>{currentTab == 'Saved' ? 
                    <SavedListContainer lists={userSavedLists} />
                    :
                    <SavedListContainer lists={userHistoryLists} />
                }</>
                : <Spinner/> }


            </div>




    )

}

