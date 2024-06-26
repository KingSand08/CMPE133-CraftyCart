"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "@/components/redirect";


const dropDownItemCSS = "pt-2 pb-2 pl-3 pr-3 w-full flex grow lg:inline-block justify-center text-center hover:bg-[color:var(--dark-green)] [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_30%)]";

export default function Nav() {
  const router = useRouter();

  const [dropdownState, setDropdownState] = useState(false);

  function toggleDropdown() {
    setDropdownState(!dropdownState);
  }

  const logout = async () => {
    if (window.confirm("Log out of user account? All changes will be saved.")) {
      try {
        await axios.get("/api/users/logout");
        router.push('/');
        redirect("/")
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const [userData, setUserData] = useState("nothing")
  const [menuClick, setMenuClick] = useState(false)
  const [open, setOpen] = useState(false)


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

    // <nav className=" flex items-center justify-between flex-wrap bg-slate-400 px-8 py-8 lg:py-4 w-screen h-20 ">
    <nav className="fixed w-screen h-20 flex flex-row content-stretch items-center justify-around bg-[color:var(--dark-green)] text-white z-20">

      <a href="/" className="flex items-center flex-shrink-0 text-white  ml-10 mr-auto pr-6">
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


      <div className=" ">
        <div className="fixed top-0 right-0 space-x-2 ml-0 mr-10 mt-5 flex flex-row  text-base align-center">
          {userData === "nothing" ?
            <RegistrationButton name="Sign In" link="/account/login" />
            :
            <>
              {/* <UserName name={userData.username} /> */}
              <LogoutButton name="Logout" user={userData.username} fn={logout} />
            </>
          }
          {/* onClick={toggleDropdown} */}
          {/* onClick={() => setOpen(true)} */}
          <button
            className="items-center px-3 py-2 border rounded border-white hover:border-transparent hover:bg-white"
            onClick={toggleDropdown}
            onMouseEnter={() => setMenuClick(true)}
            onMouseLeave={() => setMenuClick(false)}
          >
            {menuClick === false &&
              <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            }
            {menuClick === true &&
              <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-[color:var(--dark-green)]">
                <g fill="">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </g>
              </svg>
            }
          </button>
        </div>
        <div className={`absolute z-40 top-[65px] right-4 flex flex-col gap-1 text-center	items-center rounded  border-4 border-[color:var(--darker-green)] bg-[color:var(--faded-green)] scale-0 ${dropdownState ? 'scale-100' : ''} transition-all duration-100 origin-top z-auto`}>
          { userData==="nothing" ? 
              <></>
              :
              <>
                <DropdownButton name="Account Settings" fn={() => {redirect("/account-settings")}} />
                <DropdownButton name="Saved Lists" fn={() => {redirect("/saved-lists")}} />
              </>
          }
          
          
          <DropdownButton name="Help" fn={() => redirect("#tutorial")} />
          <DropdownButton name="[Manager] Bulk Add" fn={() => redirect("/bulk-add")} />
          {/* <DropdownButton name="Logout" fn={logout} /> */}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg" className="mx-auto fill-red">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Modal>
    </nav>
  );
}

export function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div onClick={onClose} className={`
    fixed inset-0 flex justify-center items-center transition-colors 
    ${open ? "visible bg-black/20" : "invisible"}`}
    >
      {children}
    </div>
  )
}

function DropdownButton({ name, fn }) {
  return (
    <button onClick={fn} className={dropDownItemCSS}>
      {name}
    </button>
  );
}

function RegistrationButton({ name, link }) {
  return (
    <a href={link} className="text-white border-white inline-block text-base px-4 py-2 leading-none border rounded hover:border-transparent hover:[color:var(--dark-green)] hover:bg-white">
      {name}
    </a>

  );
}

function LogoutButton({ name, user, fn }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={fn} 
        className="text-white border-white inline-block text-base px-4 py-2 leading-none border rounded hover:border-transparent hover:[color:var(--dark-green)] hover:bg-white"
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}>
      {hovered ? name : user}
    </button>

  );
}


// function UserName({ name }) {
//   return (
//     <a href="/account-settings" className="text-slate-100 inline-block text-lg px-1 py-1">
//       {name}
//     </a>
//   );
// }
