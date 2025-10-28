'use client'

import { Modal } from '@/app/components/Modal'

import React, { useState } from 'react'
import { createTournament } from "@/app/lib/actions";

type CreateTournamentModalProps = {
    isOpen: boolean
    onCloseAction: () => void
}

export default function CreateTournamentModal({ isOpen, onCloseAction }: CreateTournamentModalProps) {
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const start = formData.get('start') as string
        const end = formData.get('end') as string

        try {
            const result = await createTournament(formData)

            if (!result) {
                setError(error)
            } else if (result) {
                e.currentTarget.reset()
                onCloseAction()
            }
        } catch (error) {
            setError('could not create tournament')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onCloseAction={onCloseAction}
            title="Create Tournament"
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="tournament name"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            Start
                        </label>
                        <input
                            type="date"
                            name="start"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-mb font-medium mb-1">
                            End
                        </label>
                        <input
                            type="date"
                            name="end"
                            placeholder="(optional)"
                            className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent  outline-none"
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
                        Create Tournament
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