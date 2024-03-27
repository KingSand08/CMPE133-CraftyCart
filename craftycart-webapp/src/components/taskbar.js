"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TaskBar() {

    const router = useRouter();

    const [menuState, setMenuState] = useState(false);
    const toggleMenu = () => {
        setMenuState(!menuState);
    }

    const buttonClicked = () => {
        alert("button clicked");
    }

    const logout = async () => {
        try {
          
          await axios.get("/api/users/logout");
          router.push('/');
    
        } catch (error) {
          console.log(error.message);
        }
    }
       
   
    const [userData, setUserData] = useState("nothing")

    const getUserDetails = async () => {
            
        try {
            const res = await axios.get('/api/users/me', { withCredentials: true, responseType: 'json' });
            setUserData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
            
    }
    
    useEffect(() => {
        getUserDetails();
    }, []);


    return (
        <div className="fixed bottom-0 left-0 w-screen h-16 
                        flex flex-row items-center justify-around
                        bg-[color:var(--dark-green)] text-white">
                <TaskButton fn={buttonClicked} text="Saved Lists" imageAddr="/cart.svg" imageAlt="saved lists" />
                <TaskButton fn={buttonClicked} text="New List" imageAddr="/newList.svg" imageAlt="new list" />
            <div>
                <TaskButton fn={toggleMenu} text="Menu" imageAddr="/menu.svg" imageAlt="menu" />
                <div className={`absolute w-auto p-2 mx-auto min-w-max bottom-16 -translate-x-1/4
                            rounded-md shadow-lg
                            text-white
                            text-xl font-bold
                            transition-all duration-100 scale-0 origin-bottom
                            ${menuState ? 'scale-100' : ''}`}>
                    <ul>
                        {
                            userData==="nothing" ?
                            <MenuButton fn={() => {
                                router.push('/account/login');
                            }} text="Sign in"/> :
                            <MenuButton fn={() => {
                                router.push("/account-settings");
                            }
                            } text={userData.username}
                            onHover="Account Settings" />
                        }
                        <MenuButton fn={logout} text="Log out"/>
                    </ul>
                </div>
            </div>
         
            
        </div>
    );
}

function TaskButton( {fn, text = 'tooltip', imageAddr, imageAlt} ) {
    return (
        <button onClick={fn} className="group">
            <div className="hidden lg:block absolute w-auto p-2 mx-auto min-w-max bottom-16 -translate-x-1/4
                            rounded-md shadow-md
                            text-white bg-gray-800
                            text-xs font-bold
                            transition-all duration-100 scale-0 origin-bottom
                            group-hover:scale-100">
                {text}
            </div>

            <Image 
                src={imageAddr}
                alt={imageAlt}
                className=" dark:invert w-10 h-10"
                width={200}
                height={48}
                priority 
            />
            
           
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
                className="group text-slate-200 hover:text-white hover:bg-slate-500 transition-all rounded-md p-1 my-1 w-full">          
            {onHover !== "" && hovered ? 
            onHover : text}
           
            </button>
        </li>
            
    );
}


