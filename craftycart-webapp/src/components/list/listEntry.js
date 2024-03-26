import DeleteIcon from "../../../public/delete.svg";

export default function ListEntry( {updateEntry, addAfter, deleteSelf, localId} ) {  
    return (
        <div className="
            m-2 p-4 flex flex-row justify-between grow box-border 
            rounded-md shadow-md bg-slate-400 text-white"
        >
            <div className="flex flex-col">
                <input
                    type="text"
                    name="list-item-name"
                    id="list-item-name"
                    placeholder="Item name..."
                    className="text-lg bg-slate-400 placeholder-gray-300"
                />

                <input
                    type="text"
                    name="list-brand-name"
                    id="list-brand-name"
                    placeholder="Any Brand"
                    className="text-xs bg-slate-400 placeholder-gray-300"
                />
            </div>
            
            <div className="flex flex-row overflow-hidden whitespace-nowrap">
                <label className="mr-6 flex flex-row items-center">
                    <input 
                        type="number"
                        name="list-quantity"
                        id="list-quantity"
                        min="1" max="99"
                        placeholder="1"
                        className="w-8 bg-slate-400 placeholder-white text-white  flex flex-row"
                        dir="rtl"
                    />
                    x
                </label>

                {/*TODO: Change this to a trash can icon*/}
                <button onClick={() => deleteSelf(localId)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=" fill-white w-3">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
                </button>
            </div>
        </div>
    );
}