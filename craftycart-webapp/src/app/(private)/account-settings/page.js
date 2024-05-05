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
            <div className="flex flex-col items-center h-screen ">
                <BackButton />
            <div className="text-center px-14 pt-28 pb-12 text-7xl font-bold text-[color:var(--dark-green)]">Welcome {data.username}!</div>
            <div className="flex flex-col  bg-[color:var(--dark-green)] shadow-md rounded py-6 px-8 text-white text-lg space-y-1.5 > * + *">
                <p className="pb-2 text-2xl font-bold text-slate-100 self-center">Account Settings</p>
                <hr className="w-48 h-1 mx-auto bg-white"></hr>
                <div className="pt-2 flex flex-row items-center space-x-2 > * + *">
                    <span className="text-slate-100 font-medium">Username: </span>
                    <span className="text-slate-200 pr-10">{data.username}</span>
                </div>
                <button onClick={() => {changeUsername()}}
                    className="shadow border rounded-full px-2 py-1 bg-white text-[color:var(--dark-green)] font-semibold hover:bg-green-200">
                        Change Username
                </button>
                <div className="pt-4 flex flex-row items-center self-center space-x-2 > * + *">
                    <span className="text-slate-100 font-medium">Email: </span>
                    <span className="text-slate-200 ">{data.email}</span>
                </div>
                <button onClick={() => {changeEmail()}}
                    className="shadow border rounded-full px-2 py-1 bg-white text-[color:var(--dark-green)] font-semibold hover:bg-green-200">
                        Change Email
                </button>
            </div>
            <button onClick={() => {deleteAccount()}}
                    className="shadow border rounded-full mt-10 px-10 py-3 bg-red-800 text-slate-200 font-semibold hover:bg-red-700 hover:font-bold hover:text-white">
                        Delete Account
                </button>
        </div>
    </div>
    )
    
    function changeUsername(){
        let newUsername = prompt ("Put in your new username:");
        if (newUsername != "") {
            data.username = newUsername;            
            location.reload()
        }
    }

    function changeEmail(){
        let newEmail = prompt ("Put in your new email:");
        if (newEmail != "") {
            data.email = newEmail;            
            location.reload()
        }
    }
    
    function deleteAccount(){
        var result = confirm('Are you sure you want to delete your account?');
        if (result == false){
            event.preventDefault();
        }
    }
}

