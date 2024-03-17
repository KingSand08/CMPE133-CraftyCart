"use client";
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        await axios.get('/api/users/me').then((response) => {
            console.log(response.data);
            setData(response.data.data);
        }, (error) => {
            console.log(error.message);
        });
    }
    return (
     <div>
        <h1>Profile Page</h1>
        <button onClick={getUserDetails}>Get User Details</button>
        <p>{data==="nothing" ? "Nothing to display" : data}</p>
     </div>   
    );
}