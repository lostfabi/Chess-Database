'use client'

import NavLinks from "@/components/Dashboard/NavLinks";
import {useState} from "react";
import NavLinksCollapsed from "@/components/Dashboard/NavLinksCollapsed";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`flex h-full flex-col py-4 md:px-2 transition-all duration-200 ${isOpen ? 'w-80' : 'w-fit'}`}>
            {isOpen
                ? <NavLinks onToggle={() => setIsOpen(false)} />
                : <NavLinksCollapsed onToggle={() => setIsOpen(true)} />
            }
        </div>
    );
}
