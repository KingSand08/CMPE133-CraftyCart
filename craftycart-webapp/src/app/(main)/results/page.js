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
    const [storeList, setStoreList] = useState([]);

    // state to hold any errors going on
    const [errMessage, setErrMessage] = useState(null);

    // for routing
    const router = useRouter();

    // assume in-order (first: by missing, THEN by price)
    const storeLists = [
      { index: "0", lat: 37.33444824517471, lng: -121.87967440588237, title: "Student Union", address: "324 Paseo de San Carlos, San Jose, CA 95192", total: 17.63, missing: 1 },
      { index: "1", lat: 37.333754835146465, lng: -121.88476244430879, title: "Philz Coffee", address: "118 Paseo de San Antonio, San Jose, CA 95112", total: 7.54, missing: 2 },
      { index: "2", lat: 37.25034741867328, lng: -121.82973830094511, title: "Walgreens", address: "440 Blossom Hill Rd, San Jose, CA 95123", total: 14.46, missing: 1 },
      { index: "3", lat: 37.25072538109947, lng: -121.80312390197915, title: "Target", address: "5630 Cottle Rd, San Jose, CA 95123", total: 3.65, missing: 3 },
      { index: "4", lat: 37.246715616852356, lng: -121.80269536266519, title: "Safeway", address: "5760 Cottle Rd, San Jose, CA 95123", total: 0, missing: 4 }];
  useEffect(() => {

        axios.get('/api/results').then(
          (res) => {
              console.log (res.data);
              setStoreList(res.data.topStores);
          }
        ).catch(function (error) {
          console.log("ERROR: " + error);
          setErrMessage("Error fetching results for list");
        }).finally(() => {
          setLoading(false);
        });
        
        
    }, []);
  
  return (
    <main className="w-full h-full">
       
        <MapWindow storeList={storeLists} loading={isLoading} />
       
       {errMessage !== null ? <ErrorDisplay message={errMessage}/> :null}
        
        
        <ResultsContainer storeList={storeList} loading={isLoading}/>
    </main>
  );
  
}
