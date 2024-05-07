import { useState, createContext } from "react";

export const ScreenContext = createContext();

export function ScreenProvider({ children }) {
  const [screen, setScreen] = useState("Saved");

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}