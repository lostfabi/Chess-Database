'use client'

import { useState, useEffect } from 'react';
import { Chessboard } from "react-chessboard";
import { Game, Tournament } from "@/app/lib/definitions";
import { Chess } from "chess.js";
import DisplayMoves from "./DisplayMoves";
import { formatDateToString, splitResult } from "@/app/lib/helperFunctions";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";

export default function GameCard({ game, tournament }: { game: Game, tournament: Tournament }) {
    const pgn = game.pgn

    const [currentPosition, setCurrentPosition] = useState(new Chess().fen());
    const [moves, setMoves] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

    useEffect(() => {
        const newGame = new Chess()
        newGame.loadPgn(pgn)
        const history = newGame.history()
        setMoves(history)
        setCurrentMoveIndex(-1)

        const startGame = new Chess();
        setCurrentPosition(startGame.fen());
    }, [pgn]);

    useEffect(() => {
        const newGame = new Chess();

        if (currentMoveIndex >= 0) {
            for (let i = 0; i <= currentMoveIndex; i++) {
                try {
                    newGame.move(moves[i]);
                } catch (error) {
                    break;
                }
            }
        }

        setCurrentPosition(newGame.fen());
    }, [currentMoveIndex, moves]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNextMove();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPreviousMove();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentMoveIndex, moves.length]);

    const goToStart = () => setCurrentMoveIndex(-1);
    const goToPreviousMove = () => setCurrentMoveIndex(Math.max(-1, currentMoveIndex - 1));
    const goToNextMove = () => setCurrentMoveIndex(Math.min(moves.length - 1, currentMoveIndex + 1));
    const goToEnd = () => setCurrentMoveIndex(moves.length - 1);

    const date: string = formatDateToString(game.date)
    const scores = splitResult(game.result)

    return(
        <div className="max-h-full flex flex-row gap-4 w-full">
            <div className="flex flex-col space-y-2 justify-between w-2/9">
                <div className="flex flex-col">
                    <h2 className="self-end">{game.playerBlack}</h2>
                    <h2 className="self-end">{scores.black}</h2>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h2>{tournament.name}</h2>
                    <h3>{date}</h3>
                    <div className="bg-light-secondary/30 dark:bg-dark-secondary/30 p-2 rounded-md text-sm max-h-2/3 overflow-auto">
                        <p className="whitespace-pre-line">
                            {pgn}
                        </p>
                    </div>
                    <div className="bg-light-secondary/30 dark:bg-dark-secondary/30 p-2 rounded-md text-sm max-h-1/5 max-w-full overflow-auto">
                        <p className="whitespace-pre-line break-words">
                            {currentPosition}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col self-end">
                    <h2 className="self-end">{game.playerWhite}</h2>
                    <h2 className="self-end">{scores.white}</h2>
                </div>
            </div>
            <div className="h-full flex-col">
                <div className="aspect-square h-full max-h-full">
                    <Chessboard options={{ position: currentPosition }}
                    />
                </div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-between">
                <div className="flex overflow-auto">
                    <DisplayMoves history={moves} currentMoveIndex={currentMoveIndex} />
                </div>
                <div className="flex justify-center gap-2">
                    <button
                        onClick={goToStart}
                        className="p-2 bg-light-accent dark:bg-dark-accent rounded-lg disabled:opacity-50"
                        disabled={currentMoveIndex === -1}
                        title="Zum Anfang">
                        <FaAngleDoubleLeft />
                    </button>
                    <button
                        onClick={goToPreviousMove}
                        className="p-2 bg-light-accent dark:bg-dark-accent rounded-lg disabled:opacity-50"
                        disabled={currentMoveIndex === -1}>
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={goToNextMove}
                        className="p-2 bg-light-accent dark:bg-dark-accent rounded-lg disabled:opacity-50"
                        disabled={currentMoveIndex === moves.length - 1}>
                        <FaAngleRight />
                    </button>
                    <button
                        onClick={goToEnd}
                        className="p-2 bg-light-accent dark:bg-dark-accent rounded-lg disabled:opacity-50"
                        disabled={currentMoveIndex === moves.length - 1}>
                        <FaAngleDoubleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}