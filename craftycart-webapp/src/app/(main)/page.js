"use client"
import ListContainer from "@/components/list/listContainer";
import TaskBar from "@/components/taskbar";
import { useState } from "react";


export default function Home() {
  const [busySaving, setBusySaving] = useState();

  return (
    <main className="">
        <ListContainer setBusySaving={setBusySaving}/>
       
        <TaskBar busySaving={busySaving} className="pt-10"/>
        
    </main>
  );
  
}
