import Image from "next/image";
import Spinner from "@/components/spinner"
import { React, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export default function MapWindow({storeList, loading }) {    

    const containerStyle = {
        width: '500px',
        height: '500px'
    };
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCQv6vwnEIicjDnNZXLUnBYRpc9o-8uwSs"
    })
    
    const center = {lat: -34.397, lng: 150.644};
    const zoom = 8;

    return (
        <div className="flex align-middle justify-center  ">
            <div className=" max-w-250 border-4 border-[color:var(--light-green)] border-solid rounded-lg">
                { !loading ? 
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={zoom}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                        </GoogleMap>
                    ) : <></>
                    :
                    <div className="m-10 ">
                        <Spinner/>
                    </div>
                }
            </div>
        </div>
    )
}