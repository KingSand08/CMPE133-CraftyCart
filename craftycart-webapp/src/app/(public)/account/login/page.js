"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { redirect } from "@/components/redirect";

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
            console.log("Login failed", error.message);

        } finally {
            setLoading(false);
        }
    }

    const inputCSS = "shadow border rounded w-full py-2 px-3 text-bg-[color:var(--dark-green)] leading-tight focus:shadow-outline focus:ring-2 focus:ring-green-300 focus:border-green-300 focus:bg-green-100"

    function redirect(link) {
        window.location = link;
    }

    return (
        <div className="flex justify-center items-center w-screen">
            <div className="bg-green-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-lg font-bold text-white"> {loading ? "Processing..." : "Login"}</h1>
                <hr className="mb-5" />

                <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    className={inputCSS}

                />

                <label htmlFor="password" className=" mt-2 block text-bg-[color:var(--dark-green)] text-sm text-white font-bold mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    className={inputCSS}

                />
                <div className="grid grid-cols-2 gap-4 content-center mt-5">
                    <button
                        className="bg-white hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded focus:shadow-outline"
                        onClick={onLogin}
                        tabIndex={0}
                    >
                        Login
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
                        onClick={() => { redirect("/account/register") }}
                        className="w-[234.16px] font-bold py-2 px-4 rounded focus:shadow-outline text-white hover:bg-green-200 hover:text-green-800"
                    >
                        <div className="mx-4 rounded focus:shadow-outline hover:text-green-800" tabIndex="-1">
                            Create a new account
                        </div>
                    </button>
                </div>
            </div>
        </div>

    )

}