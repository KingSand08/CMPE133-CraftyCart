"use client"
import ResultsContainer from "@/components/results/resultsContainer";
import MapWindow from "@/components/results/mapWindow"
import { use, useEffect, useState, useMemo, componenetDidMount } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ErrorDisplay from "@/components/errorDisplay.js";



export default function Home() {

  const [isLoading, setLoading] = useState(true);
    // the next id to be assigned to a new entry
    const [nextId, setNextId] = useState(0);
    // the local list of store results
    // const [storeList, setStoreList] = useState([]);

    // state to hold any errors going on
    const [errMessage, setErrMessage] = useState(null);

    // for routing
    const router = useRouter();

    // assume in-order (first: by missing, THEN by price)
    const storeList = [
      { index: "0", lat: 37.33444824517471, lng: -121.87967440588237, title: "Student Union" },
      { index: "1", lat: 38.336928941399286, lng: -121.87635178390906, title: "Philz Coffee" },
      { index: "2", lat: 37.33375018216817, lng: -121.8848188578274, title: "House of Bagles" },
      { index: "3", lat: 37.33375018216817, lng: -121.8848188578274, title: "House of Bagles" },
      { index: "4", lat: 37.33375018216817, lng: -121.8848188578274, title: "House of Bagles" }];
      
  // useEffect(() => {

    //     axios.get('/api/results').then(
    //       (res) => {
    //           console.log (res.data);
    //           setStoreList(res.data.topStores);
    //       }
    //     ).catch(function (error) {
    //       console.log("ERROR: " + error);
    //       setErrMessage("Error fetching results for list");
    //     }).finally(() => {
    //       setLoading(false);
    //     });
        
        
    // }, []);
  
  return (
    <main className="w-full h-full">
       
        <MapWindow storeList={storeList} loading={isLoading} />
       
       {errMessage !== null ? <ErrorDisplay message={errMessage}/> :null}
        
        
        <ResultsContainer storeList={storeList} loading={isLoading}/>
    </main>
  );
  
}
