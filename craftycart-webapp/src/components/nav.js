"use client";
import { useState } from "react";
import  Image  from "next/image";
import axios from "axios";
import {useRouter}  from "next/navigation";
import { useEffect } from "react";



export default function Nav() {
  const router = useRouter();
 
  const [dropdownState, setDropdownState] = useState(false);
  
  function toggleDropdown() {
    setDropdownState(!dropdownState);
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
    
    <nav className=" flex items-center justify-between flex-wrap bg-slate-400 px-3 py-2 lg:py-4">
      
      <a href="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <Image 
          src="/cart.svg"
          alt="CraftyCart logo"
          className="dark:invert w-8 h-8 mr-2"
          width={100}
          height={24}
          priority 
        />
        <span className="font-semibold text-xl tracking-tight">CraftyCart</span>
      </a>
      
      

      <span className="block  space-x-2">
        { userData==="nothing" ? 
          <RegistrationButton name="Sign In" link="/account/login" />  
          :
          <UserName name={userData.username} />     
          
        }
      
        <button className=" items-center px-3 py-2 border rounded text-slate-200 border-slate-400 hover:text-white hover:border-white" onClick={toggleDropdown}>
        <Image 
          src="/menu.svg"
          alt="Menu"
          className="invert h-3 w-3"
          width={30}
          height={30}
          priority 
        />
        </button>
      </span>
      {dropdownState && (
      
        <div className=" w-full flex flex-grow p-2">

          
            <DropdownItem name="Account Settings" link="#account" />
            <DropdownItem name="Saved Lists" link="#user-lists" />
            <DropdownItem name="Help" link="#tutorial" />
            <DropdownButton name="Logout" fn={logout} />
          
        </div>
        
      )}
    </nav>
  
  );
}

function DropdownItem( {name, link} ) {
  return (
    <a href={link} className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
      {name}
    </a>
  );
}

function DropdownButton( {name, fn} ) {
  return (
    <button onClick={fn} className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
    {name}
  </button>
);
}

function RegistrationButton( {name, link} ) {
  return (
    <a href={link} className="text-slate-100 border-white inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-slate-500 hover:bg-white ">
      {name}
    </a>

  );
}

function UserName( {name} ) {
  return (
    <a href="/account-settings" className="text-slate-100 inline-block text-lg px-1 py-1 leading-none">
      {name}
    </a>
  );
}
