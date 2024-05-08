import Image from "next/image";
import Spinner from "@/components/spinner"
import { React, useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';


export default function MapWindow({storeList, loading }) {    
    
    const containerStyle = {
        width: '80vw',
        position: 'relative',
        height: '40vw',
        maxWidth: '800px',
        maxHeight: '500px',
        minHeight: '300px',
        margin: 'auto'
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCQv6vwnEIicjDnNZXLUnBYRpc9o-8uwSs"
    })

    const [currentPosition, setCurrentPosition] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentPosition(pos);
                    currentPositionIcon.anchor = new window.google.maps.Point(pos.lat, pos.lng);
                },
                () => {
                    console.error("Error: The Geolocation service failed.");
                }
            );
        } else {
            console.error("Error: Your browser doesn't support geolocation.");
        }
    }, []);

    const latitudes = storeList.map(store => store.lat);
    const longitudes = storeList.map(store => store.lng);

    const maxLat = Math.max(...latitudes);
    const minLat = Math.min(...latitudes);
    const avgLat = (maxLat + minLat) / 2;
    
    const maxLng = Math.max(...longitudes);
    const minLng = Math.min(...longitudes);
    const avgLng = (maxLng + minLng) / 2;

    const center = currentPosition ? currentPosition : { lat: avgLat, lng: avgLng };
    const zoom = currentPosition ? 13 : 10;

    const markers = storeList ? storeList.map((store, index) => ({
        index: store.index,
        position: { lat: store.lat, lng: store.lng },
        title: store.title,
        total: store.total,
        missing: store.missing,
    })) : [];

    const markerIconStyle = {
        path: "M256 0c-141.44 0-256 114.56-256 256s256 448 256 448 256-306.56 256-448c0-141.44-114.56-256-256-256zm0 384c-58.88 0-106.667-47.787-106.667-106.667s47.787-106.667 106.667-106.667 106.667 47.787 106.667 106.667S314.88 384 256 384z",
        fillColor: "#0DA74B",
        fillOpacity: 1,
        scale: 0.055,
        strokeWeight: 2.5,
        strokeColor: "",
        anchor: { x:250, y:700 }
    };

    let currentPositionIcon = {
        path: "M68.23,13.49c10.44,1.49,19.79,6.36,26.91,13.48c7.29,7.29,12.23,16.93,13.58,27.68h14.17v13.58h-14.39 c-1.62,10.13-6.42,19.2-13.36,26.13c-7.11,7.11-16.47,11.99-26.91,13.48v15.04H54.65v-15.04c-10.44-1.49-19.79-6.36-26.9-13.48 c-6.94-6.94-11.74-16-13.36-26.13H0V54.65h14.16c1.35-10.75,6.29-20.39,13.58-27.68c7.11-7.11,16.46-11.99,26.9-13.48V0h13.58 V13.49L68.23,13.49z M61.44,35.41c13.95,0,25.25,11.31,25.25,25.25c0,13.95-11.31,25.25-25.25,25.25 c-13.95,0-25.25-11.31-25.25-25.25C36.19,46.72,47.49,35.41,61.44,35.41L61.44,35.41z M89,33.11c-7.05-7.05-16.8-11.42-27.56-11.42 c-10.76,0-20.51,4.36-27.56,11.42c-7.05,7.05-11.42,16.8-11.42,27.56c0,10.76,4.36,20.51,11.42,27.56 c7.05,7.05,16.8,11.42,27.56,11.42c10.76,0,20.51-4.36,27.56-11.42c7.05-7.05,11.42-16.8,11.42-27.56 C100.41,49.9,96.05,40.16,89,33.11L89,33.11z", // Use SymbolPath.CIRCLE for a circle icon
        fillColor: '#5ECC5A',
        fillOpacity: 1,
        scale: 0.4,
        strokeColor: '#eafaef',
        strokeWeight: 2,
        anchor: { x:25, y:70 }
    };

    const handleMarkerClick = (position) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
        window.open(url, '_blank');
    };

    const onMarkerMouseOver = (index) => {
        setHoveredMarker(index);
    };

    const onMarkerMouseOut = () => {
        setTimeout(() => {
            setHoveredMarker(null);
        }, 8000);
    };    

    return (
        <div className="flex align-middle justify-center pb-10  ">
            <div className=" max-w-250 border-4 border-[color:var(--light-green)] border-solid rounded-lg">
                { !loading ? 
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={zoom}
                            clickableIcons={true}
                        >
                            {currentPosition && (
                                <Marker
                                    position={currentPosition}
                                    icon={currentPositionIcon}
                                    draggable={false}
                                />
                            )}
                            {markers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    position={marker.position}
                                    title={marker.title}
                                    icon={markerIconStyle}
                                    draggable={false}
                                    onClick={() => handleMarkerClick(marker.position)}
                                    onMouseOver={() => onMarkerMouseOver(index)}
                                    onMouseOut={() => onMarkerMouseOut(index)}

                                />
                            ))}
                            {hoveredMarker !== null && (
                                <InfoWindow
                                    position={markers[hoveredMarker].position}
                                    onCloseClick={onMarkerMouseOut}
                                >
                                    <div>
                                        {markers[hoveredMarker].title + "  ||  Total: "}
                                        {markers[hoveredMarker].total + "  ||  Missing: "}
                                        {markers[hoveredMarker].missing}
                                    </div>
                                </InfoWindow>
                            )}
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