'use client'

import { useState } from "react";
import CreateGameModal from "@/app/components/Dashboard/Games/CreateGameModal";

export function CreateGameButton() {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className={`px-4 py-2 rounded bg-light-accent dark:bg-dark-accent hover:bg-light-accent/70 dark:hover:bg-dark-accent/70`}>
                create Game
            </button>
            <CreateGameModal isOpen={modalOpen} onCloseAction={() => setModalOpen(false)} />
        </div>
    )
}