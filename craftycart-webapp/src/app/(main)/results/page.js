"use client"
import ResultsContainer from "@/components/results/resultsContainer";
import MapWindow from "@/components/results/mapWindow"
import { use, useEffect, useState, useMemo, componenetDidMount } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const [isLoading, setLoading] = useState(true);
    // the next id to be assigned to a new entry
    const [nextId, setNextId] = useState(0);
    // the local list of store results
    const [storeList, setStoreList] = useState([]);

    // for routing
    const router = useRouter();

    const exampleStores = [
      {name: "Target", address: "492 St. Road", total: 44.0, missing: 12},
      {name: "Trader Joes", address: "492 St. Road Long address that might go off the screen", total: 6150, missing: 3},
      {name: "Walmart", address: "", total: 2.65, missing: 20},
      {name: "7-11", address: "492 St. Road", total: 10000, missing: 2},
      {name: "Safeway", address: "492 St. Road", total: 134.65, missing: 200},
    ]


    useEffect(() => {

        setTimeout(() => {
          setStoreList(exampleStores);
          setLoading(false);
        }, 1000);
        
        
    }, []);
  
  return (
    <main className="w-full h-full">
       
        <MapWindow storeList={storeList} loading={isLoading} />
       
        
        <ResultsContainer storeList={storeList} loading={isLoading}/>
    </main>
  );
  
}
