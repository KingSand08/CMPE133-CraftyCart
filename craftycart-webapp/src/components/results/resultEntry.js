export default function ResultEntry( {localId, entryInfo} ) {  
    return (
       
        <div className="p-2 mt-2 mb-2 w-full flex flex-row justify-between align-middle box-border 
        rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] ">
            <div className="flex flex-row justify-start">
                {/* add # here if you want to number each result */}
                <div className="flex flex-col justify-around ml-2">
                    <div className="font-bold text-lg">
                        {entryInfo.name}
                    </div>
                    <div>
                        {entryInfo.address}
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col align-middle justify-evenly min-w-24">
                <InfoBox>
                    {"$ " + entryInfo.total}
                </InfoBox>
                <InfoBox>
                    {entryInfo.missing + " missing"}
                </InfoBox>
            </div>

        
        </div>
            
        
    );
}

function InfoBox({children}) {
    return (

                // todo add coloring depending on the comparative price to other options
        <div className="flex justify-center bg-slate-200 rounded-lg text-green-700 m-1">
        {children}
        
        </div>
    )
}