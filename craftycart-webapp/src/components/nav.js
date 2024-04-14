"use client";
import { useState } from "react";
import  Image  from "next/image";
import axios from "axios";
import {useRouter}  from "next/navigation";
import { useEffect } from "react";

const dropDownItemCSS = "lg:inline-block text-white hover:text-green-200 mr-4 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_30%)]";

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

  function redirect(link) {
    window.location = link;
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

  const [menuClick, setMenuClick] = useState(false)


  return (
    
    // <nav className=" flex items-center justify-between flex-wrap bg-slate-400 px-8 py-8 lg:py-4 w-screen h-20 ">
    <nav className="fixed w-screen h-20 flex flex-row content-stretch items-center justify-around bg-[color:var(--dark-green)] text-white">

      <a href="/" className="flex items-center flex-shrink-0 text-white mr-6 ml-10 mr-auto pr-6">
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
      
      

      <div className="flex flex-column space-x-2 ml-0 mr-10 text-base align">
        { userData==="nothing" ? 
          <RegistrationButton name="Sign In" link="/account/login" />  
          :
          <UserName name={userData.username} />     
        }
      
        <button className="items-center px-3 py-2 border rounded border-white hover:border-transparent hover:bg-white" onClick={toggleDropdown} onMouseEnter={() => setMenuClick(true)}
        onMouseLeave={() => setMenuClick(false)}>
        {menuClick === false &&
        <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-white">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
        }
        {menuClick === true &&
          <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-[color:var(--dark-green)]">
            <g fill="">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </g>
          </svg>
        }
        </button>
      {dropdownState && (
        // <div className=" w-full flex flex-grow p-2">
        <div className="flex flex-grow pl-2 rounded bg-[color:var(--faded-green)]">
          
            {/* <DropdownItem name="Account Settings" link="#account" />
            <DropdownItem name="Saved Lists" link="#user-lists" />
            <DropdownItem name="Help" link="#tutorial" /> */}
            <DropdownButton name="Account Settings" fn={() => redirect("#account")} />
            <DropdownButton name="Saved Lists" fn={() => redirect("#user-lists")} />
            <DropdownButton name="Help" fn={() => redirect("#tutorial")} />
            <DropdownButton name="Logout" fn={logout} />
          
        </div>
        
      )}
            </div>

    </nav>
  
  );
}

function DropdownButton( {name, fn} ) {
  return (
    <button onClick={fn} className={dropDownItemCSS}>
    {name}
  </button>
);
}

function RegistrationButton( {name, link} ) {
  return (
    <a href={link} className="text-white border-white inline-block text-base px-4 py-2 leading-none border rounded hover:border-transparent hover:[color:var(--dark-green)] hover:bg-white">
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
