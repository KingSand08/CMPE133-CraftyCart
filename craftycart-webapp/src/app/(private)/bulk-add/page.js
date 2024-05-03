'use client';
// TODO: make ui more understandable. Make it so you have to declare the store name
import Papa from "papaparse";
import { useState } from "react";

export default function BulkAdd() {
    const [file, setFile] = useState(null);
    const [storeID, setStoreID] = useState("");
    const [prev, setPrev] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                try {
                    const items = results.data.map(item => ({
                        storeID: item.storeID,
                        name: item.name,
                        brand: item.brand,
                        category: item.category,
                        price: item.price,
                        priceType: item.pricetype,
                    }));
                    console.log(items);
                    const response = await fetch('/api/bulk-add', {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(items)
                    });

                    if (response.ok) {
                        await response.json().then(data => {
                            setPrev(JSON.stringify(data.message, null, 4))
                        })
                    } else {
                        setPrev('Item creation failed. Received bad response from api.');
                    }
                } catch (err) {
                    console.log(err.message)
                    setPrev("Error creating items: " + err.message);
                }
            }
        })

    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleIDChange(event) {
        setStoreID(event.target.value)
    }

    return (
        <form className="flex flex-col justify-center items-center h-screen" onSubmit={handleSubmit}>
            <h3>Add your .csv items below.</h3>
            <input type="file" id="bulkadd-file" accept=".csv" onChange={handleFileChange} />
            <br />
            <input type="text" id="bulkadd-storeID" onChange={handleIDChange}></input>
            <div className="bg-[color:var(--green)] p-1 rounded-md">
                <button type="submit"> submit </button>
            </div>
            <div>
                <h2>Results:</h2>
                <textarea value={prev} rows={10} cols={50} readOnly></textarea>
            </div>
        </form>
    )
}
