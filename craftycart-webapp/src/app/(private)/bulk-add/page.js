'use client';
// TODO: make ui more understandable. Make it so you have to declare the store name
import Papa from "papaparse";
import { useState } from "react";
import axios from "axios";

export default function BulkAdd() {
    const [file, setFile] = useState(null);
    const [storeID, setStoreID] = useState("");
    const [prev, setPrev] = useState("");
    const [sumbissionType, setSubmissionType] = useState("items");

    async function handleSubmit(event) {
        event.preventDefault();

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                try {
                    let newData = [];
                    if (sumbissionType == "items") {
                        newData = results.data.map(item => ({
                            storeID: item.storeID,
                            name: item.name,
                            brand: item.brand,
                            category: item.category,
                            price: item.price,
                            priceType: item.pricetype,
                        }));
                    } else {
                        newData = results.data.map(store => ({
                            _id: store._id,
                            name: store.name,
                            lat: store.lat,
                            long: store.long,
                            address: store.address,
                            locationName: store.locationName,
                        }));
                    }
                    console.log(newData);
                    const apiloc = sumbissionType == "items" ? '/api/bulk-add' : '/api/bulk-add/new-store';
                    const response = await fetch(apiloc, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(newData)
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

    async function  clearDB() {
        if (window.confirm("Are you sure? All items and stores will be removed. This action cannot be undone.")) {
            await axios.put('/api/bulk-add/clear', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
            }).then(res => {
                if (res.data.success) {
                    setPrev("Database cleared successfully.")
                } else {
                    setPrev("Error clearing database.")
                }
            })
        }
    }

    return (
        <>
            <form className="flex flex-col  items-center " onSubmit={handleSubmit}>
                <div className="mb-10">
                <h3>Add your .csv items below.</h3>
                    
                    <h3>Upload stores with blank '_id' field and generated ids will be in results.</h3>
                    <h3>Upload stores with filled in _id parameter to restore a collection </h3>
                    <h3>Upload items table to add to database</h3>
                    <br/>
                    <h3>Select "ITEMS" or "STORES" depending on type uploaded</h3>
                </div>
                <input type="file" id="bulkadd-file" accept=".csv" onChange={handleFileChange} />
                <br />
                <div>
                    <input onChange={(e)=>{setSubmissionType(e.target.value); console.log(e.target.value)}} type="radio" id="items" name="input_type" value="items"/>
                    <span for="items"> ITEMS</span><br/>
                    <input onChange={(e)=>{setSubmissionType(e.target.value); console.log(e.target.value)}} type="radio" id="stores" name="input_type" value="stores"/>
                    <span for="stores"> STORES</span><br/> 
                </div>
                <br />
                {/* <input type="text" id="bulkadd-storeID" onChange={handleIDChange}></input> */}
                <div className="bg-[color:var(--green)] p-1 rounded-md">
                    <button type="submit"> submit </button>
                </div>
                
                <div>
                    <h2>Results:</h2>
                    <textarea value={prev} rows={10} cols={50} readOnly></textarea>
                </div>
                
            </form>
            <div className="mt-10 mb-36 flex align-middle justify-center w-auto p-auto">
                <button className="bg-red-500 p-2 rounded-md"
                onClick={() => {clearDB();}}>Clear Database</button>
            </div>
        </>
        
    )
}
