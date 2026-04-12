'use client'

import { useState } from "react";
import CreateGameModal from "@/components/Dashboard/Games/CreateGameModal";
import {useRouter} from "next/navigation";

export function CreateGameButton() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded bg-accent hover:bg-accent/70">
                create Game
            </button>
            <CreateGameModal
                isOpen={modalOpen}
                onCloseAction={() => {
                    setModalOpen(false)
                    router.refresh()
                }}
            />
        </>
    )
}