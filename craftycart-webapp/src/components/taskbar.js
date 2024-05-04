"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "@/components/redirect";


export default function TaskBar(  ) {

    const [userfound, setUserFound] = useState(false);

    const [menuState, setMenuState] = useState(false);
    const toggleMenu = () => {
        setMenuState(!menuState);
    }

    const buttonClicked = () => {
        alert("button clicked");
    }       
   
    const [userData, setUserData] = useState("nothing")

    const getUserDetails = async () => {
            
        try {
            
                const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
                setUserData(res.data.data);
            
                
        } catch (error) {
            
            setUserData("nothing");
        }
            
    }
    
    async function newList() {
        const response = await axios.get('/api/lists/new-list');
        console.log(response.data.message);
        redirect("/");
    }

    useEffect( () => {
        if (!userfound) {
            getUserDetails();
            setUserFound(true);
        }
    }, []);

    function handleSavedRedirect() {
        
    }


    return (
        <div className="fixed bottom-0 left-0 w-screen h-16 
                        flex flex-row items-center justify-around
                        bg-[color:var(--dark-green)] text-white">
                <TaskButton fn= 
                    { userData==="nothing" ? 
                        () => {redirect("/account/login")}
                        :
                        () => {redirect("/saved-lists")}
                    }
                 text="Saved Lists" imageAddr="/favorites.svg" imageAlt="Saved Lists" />
                <TaskButton fn={newList} text="New List" imageAddr="/newList.svg" imageAlt="New List" />
                <TaskButton fn={() => {redirect("/")}} text="View Current List" imageAddr="/currentList.svg" imageAlt="View List" />
                <TaskButton fn={toggleMenu} text="Find Stores" imageAddr="/cart.svg" imageAlt="Find Stores" />
        </div>
    );
}

// EDIT: Switched the alt text from appearing above of to now appearing to right of the image.
function TaskButton( {fn, text = 'tooltip', imageAddr, imageAlt} ) {
    return (
        <button onClick={fn} className="group">

            <Image 
                src={imageAddr}
                alt={imageAlt}
                className=" dark:invert w-10 h-10"
                width={200}
                height={48}
                priority 
            />

            {/* TO ABOVE OF THE IMAGE */}
            {/* <div className="hidden lg:block absolute w-auto p-2 mx-auto min-w-max bottom-16 -translate-x-1/4
                            rounded-md shadow-md
                            text-white bg-gray-800
                            text-xs font-bold
                            transition-all duration-100 scale-0 origin-bottom
                            group-hover:scale-100">
                {text}
            </div> */}


            {/* TO THE LEFT OF THE IMAGE */}
            <div className="hidden lg:block absolute w-auto p-2 mx-auto min-w-max top-3.5 translate-x-12
                            rounded-md shadow-md
                            text-white bg-gray-800
                            text-xs font-bold
                            transition-all duration-100 scale-0 origin-top
                            group-hover:scale-100">
                {text}
            </div>

            {/* TO OVERLAYING OVER THE IMAGE */}
            {/* <div className="hidden lg:block absolute w-auto p-2 min-w-max top-3.5
                            rounded-md shadow-md
                            text-white bg-gray-800
                            text-xs font-bold
                            transition-all duration-100 scale-0 origin-top
                            group-hover:scale-100">
                {text}
            </div> */}


        </button>
    );
}

function MenuButton( {fn, text = 'tooltip', onHover=""} ) {
    const [hovered, setHovered] = useState(false);
    return (
        <li>
            <button 
                onClick={fn} 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group text-[color:var(--dark-green)] text-zinc-600 hover:text-green-400 hover:bg-slate-500 transition-all rounded-md p-1 my-1 w-full">          
            {onHover !== "" && hovered ? 
            onHover : text}
           
            </button>
        </li>
            
    );
}