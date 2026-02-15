'use client'

import { Modal } from '@/app/components/Modal'

import React, { useEffect, useState } from 'react'
import { createGame, getAllUserTournaments } from "@/app/lib/actions";
import { Tournament } from "@/app/lib/definitions";
import { CreateTournamentButton } from "@/app/components/Dashboard/Tournaments/CreateTournamentButton";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import {formatPgnWithHeader} from "@/app/lib/helperFunctions";
import CustomBoard from "@/app/components/customBoard";

type CreateGameModalProps = {
    isOpen: boolean
    onCloseAction: () => void
}

export default function CreateTournamentModal({ isOpen, onCloseAction }: CreateGameModalProps) {
    const [game, setGame] = useState(new Chess())
    function onDrop({sourceSquare, targetSquare}: {sourceSquare: string, targetSquare: string}) {
        const gameCopy = new Chess(game.fen())
        gameCopy.loadPgn(game.pgn())

        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare
        })

        if(move) {
            setGame(gameCopy)
            return true
        }
        return false
    }

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

        const headers = [
            `[Event "${formData.get('tournament')}"]`,
            `[White "${formData.get('playerWhite')}"]`,
            `[Black "${formData.get('playerBlack')}"]`,
            `[Date "${formData.get('date')}"]`,
            `[Result "${formData.get('result')}"]`
        ].join('\n')

        const fullPgn = formatPgnWithHeader(game.history(), headers)
        formData.set('pgn', fullPgn)

        const result = await createGame(formData)

        if (result.error) {
            setError(error)
        } else if (result.success) {
            onCloseAction()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onCloseAction={onCloseAction}
            title="Create Game"
            size="xl"
        >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-5 mb-4">
                    <div className="flex flex-2">
                        <CustomBoard options={{ position: game.fen(), onPieceDrop: onDrop }}/>
                    </div>
                    <div className="space-y-4 mb-8 flex-1">
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
                                            <option key={tournament.id} value={tournament.name}>
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
                                Result
                            </label>
                            <select
                                id="result"
                                name="result"
                                multiple={false}
                                required
                                className="w-full text-sm italic p-2 rounded-lg bg-light-secondary/80 dark:bg-dark-secondary/80 focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent outline-none">
                                <option value="1-0">1-0</option>
                                <option value="0-1">0-1</option>
                                <option value="1/2-1/2">1/2-1/2</option>
                            </select>
                        </div>
                        <span className="block max-h-40 overflow-auto">
                            {game.pgn()}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-4">
                    {error && (
                        <div className="text-error py-2">
                            {error}
                        </div>
                    )}
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
                </div>
            </form>
        </Modal>
    )
}