import Image from "next/image";
import Spinner from "@/components/spinner"
import { React, useState, useCallback } from 'react'
import { Loader } from "@googlemaps/js-api-loader"

export default function MapWindow({ storeList, loading }) {    
    

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();


    return (
        <div className="flex align-middle justify-center  ">
            <div className=" max-w-250 border-4 border-[color:var(--light-green)] border-solid rounded-lg">
                { !loading ? 
                    <div className="w-52 h-52"> 
                    {() => initMap}
                    </div>
                    :
                    <div className="m-10 ">
                        <Spinner/>
                    </div>
                }
            </div>
        </div>
    )
}
