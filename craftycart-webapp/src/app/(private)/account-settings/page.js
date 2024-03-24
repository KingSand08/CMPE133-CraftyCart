"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function AccountInfo() {
    
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
        <div className="flex justify-center items-center h-screen ">
            <div className="bg-slate-400 shadow-md rounded p-4">
                <div className="text-lg font-bold text-gray-700">Account Settings</div>
                <span className="text-gray-700">Username: </span>
                <span className="text-slate-800">{data.username}</span>
                <br></br>
            
                <span className="text-gray-700">Email: </span>
                <span className="text-slate-800">{data.email}</span>
            </div>
        </div>
        
    )
    
}