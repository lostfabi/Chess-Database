'use client'

import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { FaEllipsisV } from "react-icons/fa";
import DeleteTournamentButton from "@/app/components/Dashboard/Tournaments/DeleteTournamentButton";

interface EditTournamentPopupProps {
    onOpenChange?: (isOpen: boolean) => void;
}

export default function EditTournamentPopup({ onOpenChange }: EditTournamentPopupProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <button
                type="button"
                className="hover:bg-dark-secondary/60 p-2 rounded-md"
            >
                <FaEllipsisV />
            </button>
        );
    }

    return (
        <Popup
            nested
            closeOnDocumentClick
            on="click"
            onOpen={() => onOpenChange?.(true)}
            onClose={() => onOpenChange?.(false)}
            trigger={
                <button
                    type="button"
                    className="hover:bg-dark-secondary/60 p-2 rounded-md"
                >
                    <FaEllipsisV />
                </button>
            }>
            <div className="p-2 rounded-md">
                <DeleteTournamentButton />
            </div>
        </Popup>
    );
}