import Image from "next/image";
import { useState } from "react";

export default function ResultEntry( {localId, entryInfo} ) {  
    const [displayItems, setDisplayItems] = useState(false);

    return (
        <div>
            
            <div onClick={() => setDisplayItems(!displayItems)} className="p-2 mt-2 mb-2 w-full flex flex-row justify-between align-middle box-border 
            rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] ">
                <div className="flex flex-row justify-start">
                    <Image
                        src="/chevron.svg"
                        alt="Show More"
                        className={`m-2 transition-all duration-100
                            ${displayItems ? 'rotate-90' : 'rotate-0'}
                        `}
                        width={20}
                        height={20}
                        priority
                    />
                    <div className="flex flex-col justify-around ml-2">
                        <div className="font-bold text-lg">
                            {entryInfo.name}
                            {entryInfo.locationName ? <> {" ( "} {entryInfo.locationName} {" )"} </> : null }
                        </div>
                        <div>
                            {entryInfo.address}
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col align-middle justify-evenly min-w-24 ">
                    <InfoBox>
                        {"$ " + entryInfo.total.toFixed(2)}
                    </InfoBox>
                    <InfoBox>
                        {entryInfo.missing + " missing"}
                    </InfoBox>
                </div>

            
            
            </div>
            
            <div className={` m-2 box-border 
            rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] 
            transition-all duration-100 scale-y-0 h-0 origin-top
            ${displayItems ? 'scale-y-100 h-auto p-2' : ''}`}>
                { entryInfo.itemsFound.map((itemData, index) => <FoundItem key={index} itemInfo={itemData} missing={false}/>) }

                { entryInfo.itemsMissing ? <div className={`flex flex-row justify-between align-middle border-b border-slate-300 text-red-400`}>
                    Missing:
                </div> : null}

       

                { entryInfo.itemsMissing.map((itemData, index) => <FoundItem className="text-red" key={index} itemInfo={itemData} missing={true}/>) }
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

function FoundItem({itemInfo, missing}) {
    return (
        <div className={`flex flex-row justify-between align-middle border-b border-slate-300
            ${ missing ? 'text-red-400' : 'text-black'}
        `}>
            <div className={`${missing ? 'pl-5' : ''}`}>
                {missing ? '"' : ''}
                {itemInfo.name}
                {missing ? '"' : ''}
            </div>
            <div className="flex justify-between w-1/2">
                <div>Quantity: {itemInfo.quantity}</div>
                <div>{missing?  "":<>$ {itemInfo.price}</>}</div>
                
            </div>

        </div>
    )
}