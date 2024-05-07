import Image from "next/image";
import Spinner from "@/components/spinner"
import { React, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


export default function MapWindow({storeList, loading }) {    
    
    const containerStyle = {
        width: '500px',
        height: '500px'
    };
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCQv6vwnEIicjDnNZXLUnBYRpc9o-8uwSs"
    })

    const center = {lat: 37.3352, lng: -121.8811};
    const zoom = 16;

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
                        {/* Student Union */}
                            <Marker
                                    // onClick={() => alert("TOUCHED")}
                                    key={0}
                                    position={{ lat: 37.33444824517471, lng: -121.87967440588237 }}
                                    title="Student Union"
                                />
                        {/* House of Bagles */}
                            <Marker
                                    // onClick={() => alert("TOUCHED")}
                                    key={0}
                                    position={{ lat: 37.336928941399286, lng: -121.87635178390906 }}
                                    title="House of Bagles"
                                />
                        {/* Philz Coffee */}
                        <Marker
                                    onClick={() => alert("TOUCHED")}
                                    key={0}
                                    position={{ lat: 37.33375018216817, lng: -121.8848188578274 }}
                                />

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