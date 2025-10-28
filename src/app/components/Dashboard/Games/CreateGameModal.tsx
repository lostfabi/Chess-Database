'use client'

import { Modal } from '@/app/components/Modal'

import React, { useState } from 'react'
import { createGame } from "@/app/lib/actions";

type CreateGameModalProps = {
    isOpen: boolean
    onCloseAction: () => void
}

export default function CreateTournamentModal({ isOpen, onCloseAction }: CreateGameModalProps) {
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        const formData = new FormData(e.currentTarget)
        const playerWhite = formData.get('playerWhite') as string
        const playerBlack = formData.get('playerBlack') as string
        const date = formData.get('date') as string
        const pgn = formData.get('pgn') as string
        const result = formData.get('result') as string
        const tournament = formData.get('tournament') as string

        try {
            const result = await createGame(formData)

            if (!result) {
                setError(error)
            } else if (result) {
                e.currentTarget.reset()
                onCloseAction()
            }
        } catch (error) {
            setError('could not create game')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onCloseAction={onCloseAction}
            title="Create Game"
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Tournament
                        </label>
                        <input
                            type="text"
                            name="tournament"
                            placeholder="tournament"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            placeholder="date"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            White Player
                        </label>
                        <input
                            type="text"
                            name="playerWhite"
                            placeholder="player with white"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Black Player
                        </label>
                        <input
                            type="text"
                            name="playerBlack"
                            placeholder="white with black"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Pgn
                        </label>
                        <input
                            type="text"
                            name="pgn"
                            placeholder="pgn"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Result
                        </label>
                        <input
                            type="text"
                            name="result"
                            placeholder="result"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <button
                        type="button"
                        onClick={onCloseAction}
                        className="px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary font-medium"
                    >
                        Create Game
                    </button>
                    {error && (
                        <div className="text-error pt-3 pb-5">
                            {error}
                        </div>
                    )}
                </div>
            </form>
        </Modal>
    )
}