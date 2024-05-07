import { useContext } from "react";
import { ScreenContext } from "./screenContext";

export default function Button({ text, currTab, setTab }) {

  return (
    <div>
        <button
            className={`px-10 py-5 mr-4 hover:bg-gray-200 border border-green-500 rounded-xl 
                        ${currTab === text ? "bg-gray-500": "bg-white"}`}
                        onClick={() => {
                          setTab(text) ; 
                          console.log(text);
                          }}>
            {text}
        </button>
    </div>
  );
}