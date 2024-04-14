"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })


    const onSignup = async () => {
        try {
            console.log("Signing up");
            const response = await axios.post("/api/users/register", user);
            router.push("/account/login");
            
        } catch (error) {
            console.log("Signup failed", error.message);
        }
    }

    function loginRedirect() {
        window.location = "/account/login";
         }    

    const inputCSS = "shadow border rounded w-full py-2 px-3 text-bg-[color:var(--dark-green)] leading-tight focus:shadow-outline focus:ring-2 focus:ring-green-300 focus:border-green-300 focus:bg-green-100"
    return (
        <div className="flex justify-center items-center w-screen">
            {/* <div className="bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
            <div className = "bg-green-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">


                <h1 className="text-lg font-bold text-white"> Create an Account </h1>
                <hr className="mb-5"/>

                <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                    className={inputCSS}
                    />
                <label htmlFor="email" className="mt-2 block text-white text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    className={inputCSS}
                    />
                <label htmlFor="password" className="mt-2 block text-white text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    className={inputCSS}
                    />
                
                {/* <button
                    onClick={onSignup}
                    className=" mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign Up
                </button> */}
                
                {/* <Link href="/account/login" className="ml-2 text-center mt-4">
                    Visit login page
                </Link> */}
                
                <div className="grid grid-cols-2 gap-4 content-center mt-5">
                <button 
                    className="bg-white hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded focus:shadow-outline"
                    onClick={onSignup}
                >
                    Sign Up
                </button>

                {/* <Link href="/account/register" className="ml-2 text-center mt-4">
                        Create a new account
                </Link> */}

                {/* <Link href="/account/register" className="text-center font-bold text-slate-50">
                    <div className="text-center font-bold py-2 px-4 rounded focus:shadow-outline text-white hover:text-green-800 hover:bg-green-200">
                            Create a new account
                    </div>
                </Link> */}

                <button
                onClick={() => {loginRedirect()}}
                className="w-[234.16px] font-bold py-2 px-4 rounded focus:shadow-outline text-white hover:bg-green-200 hover:text-green-800">
                        <span className="my-2 mx-4 rounded focus:shadow-outline hover:text-green-800">
                            Login
                        </span>
                </button>
            </div>

            </div>
        </div>
    );

}