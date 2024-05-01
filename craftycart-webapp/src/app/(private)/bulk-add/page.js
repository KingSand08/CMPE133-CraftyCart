'use client';
// TODO: make ui more understandable. Make it so you have to declare the store name
import Papa from "papaparse";
import { useState } from "react";

export default function BulkAdd() {
    const [file, setFile] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                try {
                    const items = results.data;
                    console.log(items);
                    const response = await fetch('/api/bulk-add', {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(items),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Items created: ', data.items);
                    } else {
                        console.log('Item creation failed...');
                    }
                } catch (err) {
                    console.error("error creating items: ", err);
                }
            }
        })

    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <form className="flex flex-col justify-center items-center h-screen" onSubmit={handleSubmit}>
            <h3>Add your .csv items below.</h3>
            <input type="file" id="bulkadd-file" accept=".csv" onChange={handleChange} />
            <button type="submit"> submit </button>
        </form>
    )
}
