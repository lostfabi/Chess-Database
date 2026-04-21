import SideBar from "@/components/Dashboard/SideBar";
import React from "react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex h-screen">
            <div className="h-screen shrink-0">
                <SideBar></SideBar>
            </div>
            <div className="flex-1 overflow-auto h-full py-5 px-3">
                {children}
            </div>
        </div>
    )
}