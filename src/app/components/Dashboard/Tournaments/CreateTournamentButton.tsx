'use client'

import { useState } from "react";
import CreateTournamentModal from "@/app/components/Dashboard/Tournaments/CreateTournamentModal";

export function CreateTournamentButton() {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className={`px-4 py-2 rounded bg-light-accent dark:bg-dark-accent hover:bg-light-accent/70 dark:hover:bg-dark-accent/70`}>
                createTournament
            </button>
            <CreateTournamentModal isOpen={modalOpen} onCloseAction={() => setModalOpen(false)} />
        </div>
    )
}