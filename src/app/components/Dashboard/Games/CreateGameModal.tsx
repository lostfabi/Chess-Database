'use client'

import { Modal } from '@/app/components/Modal'

import React, {useEffect, useState} from 'react'
import {createGame, getAllUserTournaments} from "@/app/lib/actions";
import {Tournament} from "@/app/lib/definitions";
import {CreateTournamentButton} from "@/app/components/Dashboard/Tournaments/CreateTournamentButton";

type CreateGameModalProps = {
    isOpen: boolean
    onCloseAction: () => void
}

export default function CreateTournamentModal({ isOpen, onCloseAction }: CreateGameModalProps) {
    const [options, setOptions] = useState<Tournament[]>([])

    useEffect(() => {
        if (isOpen) {
            getAllUserTournaments().then(setOptions)
        }
    }, [isOpen])

    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        const formData = new FormData(e.currentTarget)

        try {
            const result = await createGame(formData)

            if (!result.success) {
                setError(error)
            } else if (result.success) {
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
                        {options.length !== 0 && (
                            <>
                                <label className="block text-mb font-medium mb-1">
                                    Tournament
                                </label>
                                <select
                                    id="tournament"
                                    name="tournament"
                                    multiple={false}
                                    required
                                    className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent outline-none"
                                >
                                    {options.map((tournament: Tournament) => (
                                        <option key={tournament.id} value={tournament.id}>
                                            {tournament.name}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {options.length === 0 && (
                            <div className="flex flex-row justify-between items-center">
                                <span>No Tournaments yet</span>
                                <CreateTournamentButton/>
                            </div>
                        )}
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
                        className="px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary font-medium"
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