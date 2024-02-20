"use client";
import { useState } from "react";
import  Image  from "next/image";


export default function Nav() {
 
  const [dropdownState, setDropdownState] = useState(false);
  
  function toggleDropdown() {
    setDropdownState(!dropdownState);
  }

  var loggedIn = false;

  return (
    
    <nav className=" flex items-center justify-between flex-wrap bg-teal-500 px-3 py-2 lg:py-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Image 
          src="/cart.svg"
          alt="CraftyCart logo"
          className="dark:invert w-8 h-8 mr-2"
          width={100}
          height={24}
          priority 
        />
        <span className="font-semibold text-xl tracking-tight">CraftyCart</span>
      </div>
      
      <span className="block  space-x-2">
        { !loggedIn && 
          <RegistrationButton name="Sign In" link="#login" />  
        }
      
        <button className=" items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" onClick={toggleDropdown}>
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
        <div className=" w-full block flex-grow">
          
            <DropdownItem name="Account Settings" link="#account" />
            <DropdownItem name="Saved Lists" link="#user-lists" />
            <DropdownItem name="Help" link="#tutorial" />
          
        </div>
      )}
    </nav>
  
  );
}

function DropdownItem( {name, link} ) {
  return (
    <a href={link} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      {name}
    </a>
  );
}

function RegistrationButton( {name, link} ) {
  return (
    <a href={link} className="text-teal-100 border-teal-400 inline-block text-sm px-4 py-2 leading-none border rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ">
      {name}
    </a>

  );
}