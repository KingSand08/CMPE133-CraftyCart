import { Inter } from "next/font/google";
import "@/globals.css";
import TaskBar from "@/components/taskbar";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crafty Cart",
  description: "The Shopping List for the Smart Shopper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <TaskBar />
        
        {children}

      </body>
    </html>
  );
}
