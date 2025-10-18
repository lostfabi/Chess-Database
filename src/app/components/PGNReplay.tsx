/*
'use client'
import { useState } from 'react'
import { Chess } from 'chess.js'
import Chessboard from './ChessboardWrapper'

export default function PGNReplay() {
    const [game, setGame] = useState(new Chess())
    const [currentMove, setCurrentMove] = useState(0)
    const [pgnInput, setPgnInput] = useState('')
    const [error, setError] = useState('')

    // PGN laden
    function loadPGN() {
        try {
            const newGame = new Chess()
            newGame.loadPgn(pgnInput)
            setGame(newGame)
            setCurrentMove(newGame.history().length)
            setError('')
        } catch (e) {
            setError('Ungültige PGN! Bitte überprüfen Sie das Format.')
        }
    }

    // Zur bestimmten Position springen
    function goToMove(moveIndex: number) {
        const newGame = new Chess()
        newGame.loadPgn(game.pgn())

        // Alle Züge rückgängig machen
        while (newGame.history().length > 0) {
            newGame.undo()
        }

        // Bis zum gewünschten Zug vorspielen
        const moves = game.history({ verbose: true })
        for (let i = 0; i < moveIndex; i++) {
            newGame.move(moves[i])
        }

        setGame(newGame)
        setCurrentMove(moveIndex)
    }

    // Navigation
    function first() { goToMove(0) }
    function previous() { if (currentMove > 0) goToMove(currentMove - 1) }
    function next() {
        const totalMoves = game.history({ verbose: true }).length
        if (currentMove < totalMoves) goToMove(currentMove + 1)
    }
    function last() {
        const totalMoves = game.history({ verbose: true }).length
        goToMove(totalMoves)
    }

    const history = game.history()
    const totalMoves = history.length

    return (
        <div className="flex flex-col gap-6 p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">PGN Replay</h1>

            <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block text-sm font-medium mb-2">PGN eingeben:</label>
                <textarea
                    value={pgnInput}
                    onChange={(e) => setPgnInput(e.target.value)}
                    placeholder='1. e4 e5 2. Nf3 Nc6 3. Bb5'
                    className="w-full h-32 px-3 py-2 border rounded font-mono text-sm"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                    onClick={loadPGN}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    PGN laden
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <div className="max-w-md mx-auto">
                        <Chessboard
                            options={{
                                position: game.fen(),
                                showNotation: true
                            } as any}
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <button
                            onClick={first}
                            disabled={currentMove === 0}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            ⏮️ Start
                        </button>
                        <button
                            onClick={previous}
                            disabled={currentMove === 0}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            ◀️ Zurück
                        </button>
                        <span className="px-4 font-mono">
                            {currentMove} / {totalMoves}
                        </span>
                        <button
                            onClick={next}
                            disabled={currentMove === totalMoves}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Vor ▶️
                        </button>
                        <button
                            onClick={last}
                            disabled={currentMove === totalMoves}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Ende ⏭️
                        </button>
                    </div>
                </div>
                <div className="flex-1 max-w-md">
                    <h2 className="font-bold mb-2">Züge:</h2>
                    <div className="bg-gray-50 p-3 rounded max-h-96 overflow-y-auto">
                        {history.map((move, index) => {
                            const moveNumber = Math.floor(index / 2) + 1
                            const isWhite = index % 2 === 0
                            const isCurrentMove = index === currentMove - 1

                            return (
                                <span key={index}>
                                    {isWhite && <strong>{moveNumber}. </strong>}
                                    <button
                                        onClick={() => goToMove(index + 1)}
                                        className={`px-2 py-1 rounded ${
                                            isCurrentMove
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-200'
                                        }`}
                                    >
                                        {move}
                                    </button>
                                    {' '}
                                </span>
                            )
                        })}
                    </div>
                    <h2 className="font-bold mb-2 mt-4">Komplette PGN:</h2>
                    <pre className="text-xs bg-gray-50 p-3 rounded max-h-48 overflow-auto">
                        {game.pgn()}
                    </pre>
                </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Beispiel-PGN zum Testen:</p>
                <code className="text-sm block bg-white p-2 rounded">
                    1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O
                </code>
            </div>
        </div>
    )
}
*/