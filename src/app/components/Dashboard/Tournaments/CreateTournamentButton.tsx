'use client'

import { useState } from "react";
import CreateTournamentModal from "@/app/components/Dashboard/Tournaments/CreateTournamentModal";
import { useRouter } from "next/navigation";

export function CreateTournamentButton() {
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className={`px-4 py-2 rounded bg-light-accent dark:bg-dark-accent hover:bg-light-accent/70 dark:hover:bg-dark-accent/70`}>
                create Tournament
            </button>
            <CreateTournamentModal
                isOpen={modalOpen}
                onCloseAction={() => {
                    setModalOpen(false)
                    router.refresh()
                }}
            />
        </div>
    )
}