import { redirect } from "@/components/redirect";

export function BackButton() {
    const btnSize = 60;

    return (
        <button onClick={() => {redirect("/")}} className="fixed top-28 left-10">
            <svg height={btnSize} width={btnSize} xmlns="http://www.w3.org/2000/svg" className="fixed fill-[color:var(--dark-green)]">
                <circle r={btnSize/2} cx={btnSize/2} cy={btnSize/2} />
            </svg>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" 
            width={btnSize} height={btnSize} viewBox="0 0 768.000000 768.000000"className="fixed fill-white"
            preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,768.000000) scale(0.100000,-0.100000)">
                    <path d="M2930 5100 c-190 -199 -365 -383 -390 -409 -25 -27 -216 -227 -425
                    -446 -209 -218 -380 -402 -380 -410 0 -7 133 -152 295 -321 356 -373 287 -301
                    813 -851 l432 -453 559 0 558 0 -98 103 c-54 56 -318 327 -587 602 l-489 500
                    1281 3 1281 2 0 415 0 415 -1281 2 -1281 3 474 485 c260 267 525 538 587 603
                    l114 117 -559 0 -559 0 -345 -360z"/>
                </g>
            </svg>
        </button>
);
  }
  
