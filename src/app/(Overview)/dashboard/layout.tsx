import SideBar from "@/app/components/Dashboard/SideBar";
import React from "react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex h-screen">
            <div className="h-screen md:w-80">
                <SideBar></SideBar>
            </div>
            <div className="flex-1 overflow-auto p-5">
                {children}
            </div>
        </div>
    )
}