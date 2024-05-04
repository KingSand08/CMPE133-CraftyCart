"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BackButton } from "@/components/backButton";

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
        <div>
            <div className="flex flex-col  items-center h-screen ">
                <BackButton />
            <div className="px-14 py-20 text-7xl font-bold text-[color:var(--dark-green)]">Welcome {data.username}!</div>
            <div className="grid grid-cols-3 gap-4 items-center bg-[color:var(--dark-green)] shadow-md rounded py-6 px-8 text-white text-lg">
                <p className="text-lg font-bold text-2xl text-slate-100 col-span-3">Account Settings</p>
                <p className="text-slate-100">Username:</p>
                <p className="text-slate-200">{data.username}</p>
                <button onClick={() => {alert("INSERT FUNCTIONAILTY HERE")}}
                    className="shadow border rounded-full bg-white text-[color:var(--dark-green)] font-semibold">
                        Change Username
                </button>
            </div>
{/*         
            <div className="flex flex-col  bg-[color:var(--dark-green)] shadow-md rounded py-6 px-8 text-white text-lg space-y-1.5 > * + *">
                <p className="text-lg font-bold text-2xl text-slate-100">Account Settings</p>
                <div className="flex flex-row items-center space-x-2 > * + *">
                    <span className="text-slate-100">Username:</span>
                    <span className="text-slate-200 pr-10">{data.username}</span>
                    <button onClick={() => {alert("INSERT FUNCTIONAILTY HERE")}}
                    className="shadow border rounded-full px-2 py-1 bg-white text-[color:var(--dark-green)] font-semibold">
                        Change Username
                    </button>
                </div>
                <div className="flex flex-row items-center space-x-2 > * + *">
                    <span className="text-slate-100">Email: </span>
                    <span className="text-slate-200 pr-10">{data.email}</span>
                    <button onClick={() => {alert("INSERT FUNCTIONAILTY HERE")}}
                    className="shadow border rounded-full px-2 py-1 bg-white text-[color:var(--dark-green)] font-semibold">
                        Change Email
                    </button>
                </div>
            </div> */}
        </div>
        </div>
        
    )
    
}

