import { useEffect, useRef, useState } from "react";

export default function ListEntry( {updateEntry, addAfter, deleteSelf, localId, entryInfo} ) {  

    if (updateEntry == null) {
        updateEntry = ()=>{return null}
    }
   

    const [entryText, setEntryText] = useState(entryInfo.text);
    const [quantity, setQuantity] = useState(entryInfo.quantity);
    const [checked, setChecked] = useState(entryInfo.checked);

    const checkboxRef = useRef(null);
  

    return (
        <div className="
            m-2 p-4 flex flex-row justify-between grow box-border 
            rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] "
        >
            <div className="flex flex-row w-full">
                <input
                        type="checkbox"
                        name="list-checked"
                        id="list-checked"
                        checked={ checked }
                        ref={checkboxRef}
                        onChange={(event) => { 
                            setChecked(!checked);
                            console.log(checkboxRef.current.checked);
                            updateEntry(entryInfo, localId, entryText, quantity, checkboxRef.current.checked );
                        }}
                        
                        className="size-6 mr-4"
                    />
                <div className="flex flex-col  w-full">
                    <input
                        type="text"
                        name="list-item-name"
                        id="list-item-name"
                        placeholder="Item name..."
                        defaultValue={ entryText }
                        onChange={(event) => { 
                            setEntryText(event.target.value);
                            updateEntry(entryInfo, localId, event.target.value, quantity);
                        }}
                        className="text-lg w-full pr-2 bg-[color:var(--white)] placeholder-[color:var(--black)] "
                    />

                    {/* { !entryInfo["template"] ?
                    <input
                        type="text"
                        name="list-brand-name"
                        id="list-brand-name"
                        placeholder="Any Brand"
                        defaultValue={(entryInfo) ? entryInfo["brand"] : ""}
                        className="text-xs bg-[color:var(--white)] placeholder-[color:var(--black)]"
                    />

                    :

                    <div className="text-xs bg-[color:var(--white)] placeholder-[color:var(--black)] h-4">
                        </div>
                    } */}

                </div>
            </div>
            { !entryInfo["template"] &&
            <div className="flex flex-row w-32 overflow-hidden whitespace-nowrap">
                <label className="mr-6 flex flex-row items-center">
                    <input 
                        type="number"
                        name="list-quantity"
                        id="list-quantity"
                        min="1" max="99"
                        placeholder="1"
                        defaultValue={(entryInfo) ? quantity : ""}
                        onChange={(event) => { 
                            setQuantity( event.target.value);
                            updateEntry(entryInfo, localId, entryText, event.target.value);
                        }}
                        className="w-10 bg-[color:var(--white)] placeholder-[color:var(--black)]  flex flex-row"
                        dir="rtl"
                    />
                    x
                </label>

                <button onClick={() => deleteSelf(localId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=" fill-[color:var(--black)] w-3">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </button>
            </div>
            }
        </div>
    );
}