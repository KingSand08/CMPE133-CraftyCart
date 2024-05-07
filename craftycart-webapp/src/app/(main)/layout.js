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
        <div className="flex flex-col space-y-24 h-full">
          <Nav className="z-40" />
          <div className="m-2 mr-6 ml-6">
            {children}
          </div>
          <TaskBar className="pt-10"/>
        </div>
      </body>
    </html>
  );
}
