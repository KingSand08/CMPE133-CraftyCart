export default function SearchBar( {addEntry} ) {  
    function handleSubmit(event) {
        // Override default browser activity
        event.preventDefault(); 
        
        // Get input field data in form { "id": value }
        const formData = Object.fromEntries(new FormData(event.target).entries());
        console.log(formData)
        console.log(formData["search-item-name"])

        addEntry(formData["search-item-name"])
    }

    return (
        <form 
            className="m-2 p-4 flex flex-row justify-between grow box-border 
                rounded-md shadow-md bg-[color:var(--white)] border-[color:var(--gray)] border-2"
            onSubmit={handleSubmit}
        >
            <div className="w-full flex flex-row justify-between">
                <input
                    type="text"
                    name="search-item-name"
                    id="search-item-name"
                    placeholder="add any item..."
                    className="text-xl bg-[color:var(--white)] placeholder-[color:var(--black)] w-screen"
                />
                <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-[color:var(--dark-green)] w-6 ml-2">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
                </button>
            </div>
        </form>
    );
}