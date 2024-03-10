"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
        setLoading(true);
        const responce = await axios.post("/api/users/login", user);
        router.push("/"); // Redirect to home page

    } catch (error) {
        console.log ("Login failed", error.message);

    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
        <div className = "bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-lg font-bold text-gray-700"> {loading ? "Processing" : "Login" }</h1>
            <hr className="mb-5" />

            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
                id="email"
                type="text"
                value = {user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value})}
                placeholder="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />

            <label htmlFor="password" className=" mt-2 block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
                id="password"
                type="password"
                value = {user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value})}
                placeholder="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
            <button 
                className=" mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onLogin}>
                    Login
            </button>
            <Link href="/account/register" className="ml-2 text-center mt-4">
                Create a new account
            </Link>
        </div>
    </div>



  )

}