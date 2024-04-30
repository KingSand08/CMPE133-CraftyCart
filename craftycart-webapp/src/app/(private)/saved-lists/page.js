"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import SavedListContainer from "@/components/saved-lists/savedListContainer";
import ListContainer from "@/components/list/listContainer";

export const ScreenContext = createContext();                               //create global "state" variable (called context)


export default function SavedLists() {
    
    const router = useRouter()
    const [data, setData] = useState("nothing")                            //state variable containing userData

    const getUserDetails = async () => {                                   //function that returns userData
            
        try {
            const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
           
    }

    useEffect(() => {                                                      //calls getUserDetails function on page mount (when new obj added to DOM)
        getUserDetails();
    }, []);


    const [screen, setScreen] = useState("Saved")                          //state variable controlling whether user sees SavedLists or History Screen

    const screenType = (type) => {                                         //updates the screen based on the parameter                             
        setScreen(type);
    }

    return(
        <div className="flex justify-center items-center overflow-y-scroll">

            <ScreenContext.Provider value = {screen}>                     
                                                        {/* wrapping div in context created earlier, value of context will be "screen," 
                                                        allows for nested components to access "Screen" */}

                <div className = "mt-28 flex justify-center flex-col">

                    <div className = "flex justify-center text-5xl px-10 py-5 text-green-500">

                        <button className ={`px-10 py-5 mr-4 hover:bg-gray-200 border border-green-500 rounded-xl 
                                            ${screen === "History" ? "bg-gray-500": "bg-white"}`} onClick={() => screenType("History")}>History
                                                        {/* When button is clicked, calls screenType function with "History" as the parameter */}
                        </button>


                        <button className ={`px-10 py-5 mr-4 hover:bg-gray-200 border border-green-500 rounded-xl 
                                            ${screen === "Saved" ? "bg-gray-500": "bg-white"}`} onClick={() => screenType("Saved")}>Saved
                                                        {/* When button is clicked, calls screenType function with "Saved" as the parameter */}
                        </button>
                        
                    </div>
                    
                    <SavedListContainer /> 
                                                        {/* Creates SavedListContainer Object, see savedListContainer.js */}

                </div>  

            </ScreenContext.Provider>

        </div>
        
    )
    
}

//buttoners will be the setters for the state set in savedListContainer