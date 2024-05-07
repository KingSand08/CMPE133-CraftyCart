import { useContext } from "react";
import { ScreenContext } from "./screenContext";

export default function Button({ text, type }) {
  const { screen, setScreen } = useContext(ScreenContext);

  return (
    <div>
        <button
            className={`px-10 py-5 mr-4 hover:bg-gray-200 border border-green-500 rounded-xl 
                        ${screen === type ? "bg-gray-500": "bg-white"}`}
                        onClick={() => {setScreen(type) ; console.log(type)}}>
            {text}
        </button>
    </div>
  );
}