import Image from "next/image";
import {useState} from "react";

export default function SearchBar( {addEntry, clear} ) {  

    const [entryToAdd, setEntryToAdd] = useState("");

    function handleSubmit(event) {
        // Override default browser activity
        event.preventDefault(); 
        
        // Get input field data in form { "id": value }
        const formData = Object.fromEntries(new FormData(event.target).entries());
        console.log(formData)
        console.log(formData["search-item-name"])
        setEntryToAdd("");
        addEntry(formData["search-item-name"])
        
    }

    const [isFocused, setIsFocused] = useState(false);
    const inputCSS = "text-xl bg-[color:var(--white)] placeholder-[color:var(--black)] w-full"

    // p-4 flex flex-row justify-between grow box-border rounded-md shadow-md bg-[color:var(--white)] border-[color:var(--gray)] border-2"

    return (
        <div className="flex flex-row items-center w-auto">
        <button onClick={clear} className="flex align-middle justify-center box-border w-10 pl-2">
            <Image
                src="/newList.svg"
                alt="New List"
                className=" w-8 h-8 mr-2"
                width={100}
                height={24}
                priority
            />
        </button>
        <form   className={`flex flex-row justify-between grow w-full m-2 p-4 box-border rounded-md shadow-md bg-[color:var(--white)] border ${isFocused ? 'border-[color:var(--dark-green)] border-3' : 'border-[color:var(--gray)] border-3'}`}
                onSubmit={handleSubmit}
            > 
            <div className="w-full flex flex-row justify-between">
                <input
                    type="text"
                    name="search-item-name"
                    id="search-item-name"
                    placeholder="add any item..."
                    value={entryToAdd}
                    onChange={(event) => setEntryToAdd(event.target.value)}
                    className="text-xl bg-[color:var(--white)] placeholder-[color:var(--black)] w-full"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-[color:var(--dark-green)] w-6">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
                </button>
            </div>
        </form>
        
        </div>
    );
}