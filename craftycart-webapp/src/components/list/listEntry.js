export default function ListEntry( {updateEntry, addAfter, deleteSelf, localId} ) {  

    return (
        <div 
        className="w-full p-2 flex flex-row justify-between grow"
        >
            <input
            type="text"
            className="box-border h-auto w-full p-2 rounded-md shadow-md bg-slate-400 text-white"
            />
            <span className="box-border h-auto p-2 ml-2 rounded-md shadow-md bg-slate-400 text-white">
                <button onClick={() => deleteSelf(localId)} className="w-full h-full">X</button>
            </span>
        </div>
    );
}