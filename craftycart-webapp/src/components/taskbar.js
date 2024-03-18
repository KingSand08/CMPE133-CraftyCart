"use client";
import Image from "next/image";




export default function TaskBar() {

    const buttonClicked = () => {
        alert("button clicked");
    }
   
    return (
        <div className="fixed bottom-0 left-0 w-screen h-16 
                        flex flex-row items-center justify-around
                        bg-slate-400 text-white">
            <TaskButton fn={buttonClicked} text="Menu" imageAddr="/menu.svg" imageAlt="menu" />
            <TaskButton fn={buttonClicked} text="Saved Lists" imageAddr="/folder.svg" imageAlt="saved lists" />
            <TaskButton fn={buttonClicked} text="New List" imageAddr="/newList.svg" imageAlt="new list" />
    
         
            
        </div>
    );
}

function TaskButton( {fn, text = 'tooltip', imageAddr, imageAlt} ) {
    return (
        <button onClick={fn} className="group">
            <div className="absolute w-auto p-2 mx-auto min-w-max bottom-16 -translate-x-1/4
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
