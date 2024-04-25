"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import SavedListContainer from "@/components/saved-lists/savedListContainer";
import ListContainer from "@/components/list/listContainer";


export default function SavedLists() {
    
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
            
        try {
            const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
           
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return(
        <div className="flex justify-center items-center overflow-y-scroll">
            <div className = "mt-28 flex justify-center flex-col">
                <div className = "flex justify-center">
                    <button class="text-5xl px-10 py-5 mr-4 bg-white text-green-500 hover:bg-gray-200 border border-green-500 rounded-xl">History</button>
                    <button class="text-5xl px-10 py-5 bg-white text-green-500 border hover:bg-gray-200 border-green-500 rounded-xl">Saved</button>
                </div>
                <SavedListContainer /> 
            </div>
        </div>
        
    )
    
}