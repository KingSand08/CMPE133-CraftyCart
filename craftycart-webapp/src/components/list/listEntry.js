import { ReactComponent as DeleteIcon } from "../../../public/delete.svg";

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
            
            <div>
                <label class="mr-2">
                    <input 
                        type="number"
                        name="list-quantity"
                        id="list-quantity"
                        min="1" max="99"
                        placeholder="1"
                        className="w-4 bg-slate-400 placeholder-white text-white text-right"
                    />
                    x
                </label>

                {/*TODO: Change this to a trash can icon*/}
                <button onClick={() => deleteSelf(localId)} className="text-white">
                    ⨂
                </button>
            </div>
        </div>
    );
}