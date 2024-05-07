import Image from "next/image";
import Spinner from "@/components/spinner"
import { React, useState, useEffect } from 'react'
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

    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (storeList.length > 0) {
            const newBounds = new window.google.maps.LatLngBounds();
            storeList.forEach(store => {
                newBounds.extend(new window.google.maps.LatLng(store.lat, store.lng));
            });
            setBounds(newBounds);
        }
    }, [storeList]);

    useEffect(() => {
        if (map && bounds) {
            map.fitBounds(bounds);
        }
    }, [map, bounds]);

    const onLoad = mapInstance => {
        setMap(mapInstance);
    };

    const center = {lat: 37.3352, lng: -121.8811};
    const zoom = 16;


    // MAKE CENTER FOCUS ON USER
    // ZOOM TO 12
    const markers = [
        { index: "0", position: { lat: 37.33444824517471, lng: -121.87967440588237 }, title: "Student Union" },
        { index: "1", position: { lat: 38.336928941399286, lng: -121.87635178390906 }, title: "Philz Coffee" },
        { index: "2", position: { lat: 37.33375018216817, lng: -121.8848188578274 }, title: "House of Bagles" }
    ];
    
    
    return (
        <div className="flex align-middle justify-center  ">
            <div className=" max-w-250 border-4 border-[color:var(--light-green)] border-solid rounded-lg">
                { !loading ? 
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={zoom}
                            onLoad={onLoad}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                        {/* Student Union */}
                            <Marker
                                    // onClick={() => alert("TOUCHED")}
                                    key={markers[1].key}
                                    position={markers[0].position}
                                    title={markers[1].title}
                                />
                        {/* House of Bagles */}
                            <Marker
                                    // onClick={() => alert("TOUCHED")}
                                    key={markers[1].key}
                                    position={markers[1].position}
                                    title={markers[1].title}
                                />
                        {/* Philz Coffee */}
                        <Marker
                                    onClick={() => alert("TOUCHED")}
                                    key={markers[1].key}
                                    position={markers[2].position}
                                    title={markers[2].title}
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