import Image from "next/image";
import Spinner from "@/components/spinner"

export default function MapWindow({storeList, loading }) {


    return (
        <div className="flex align-middle justify-center  ">
            
            <div className=" max-w-96 border-4 border-[color:var(--light-green)] border-solid rounded-lg">

            { !loading ? 
                <>
                {/* // This is just a placeholder, put the map code here */}
                <Image
                    src="/map_placeholder.png"
                    alt="map"
                    className="rounded-lg"
                    width={517}
                    height={483}
                    priority
                    />



                
                </>
                :
                <div className="m-10 ">
                    <Spinner/>
                </div>
            }
            </div>
        </div>
    )
}