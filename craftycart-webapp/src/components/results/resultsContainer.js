
"use client";

import Spinner from "../spinner";

import ResultEntry from "@/components/results/resultEntry.js";


export default function ResultsContainer ( {storeList, loading }) {
    

    return (
        
           <>
            {!loading ?
                <div className="bg-[color:var(--bg-white)] mb-24">
                    {storeList.map((storeInfo) => {
                        return(
                        <ResultEntry entryInfo={storeInfo}/>
                        )
                    })}
                
                </div>
            
                
                :<div className="mt-10"><Spinner/></div>
            }
            </>
        
        
    );
}