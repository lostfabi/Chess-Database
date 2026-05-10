'use client'

import { useState, useEffect, useLayoutEffect } from 'react';
import { Game } from "@/lib/types";
import { Chess } from "chess.js";
import DisplayMoves from "./DisplayMoves";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaCopy } from "react-icons/fa";
import { Button } from "../../buttons/Button";
import copy from "copy-to-clipboard";
import { useRouter } from "next/navigation";
import CustomBoard from "@/components/customBoard";

export default function GameView({ game }: { game: Game }) {
    const pgn = game.pgn

    const [currentPosition, setCurrentPosition] = useState(new Chess().fen());
    const [moves, setMoves] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [boardSize, setBoardSize] = useState(0);
    const [showAnnotations, setShowAnnotations] = useState(false);
    const [showVariants, setshowVariants] = useState(false);
    const router = useRouter();

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

    useLayoutEffect(() => {
        const update = () => setBoardSize(window.innerHeight - 40); // 40px = py-5 (20px top + 20px bottom)
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const goToStart = () => setCurrentMoveIndex(-1);
    const goToPreviousMove = () => setCurrentMoveIndex(Math.max(-1, currentMoveIndex - 1));
    const goToNextMove = () => setCurrentMoveIndex(Math.min(moves.length - 1, currentMoveIndex + 1));
    const goToEnd = () => setCurrentMoveIndex(moves.length - 1);

    return(
        <div className="flex flex-row gap-4 w-full h-full">
            <div className="flex flex-col shrink-0 space-y-2">
                <div className="flex flex-col w-fit h-full gap-2 items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-col gap-3.5 items-center">
                            <span>Copy PGN</span>
                            <span>Copy FEN</span>
                        </div>
                            <div className="flex flex-col gap-2 items-center">
                                <Button onClick={(): boolean => copy(currentPosition, { debug: true})}>
                                    <div>
                                        <FaCopy />
                                    </div>
                                </Button>
                                <Button onClick={(): boolean => copy(pgn, { debug: true })}>
                                    <div>
                                        <FaCopy />
                                    </div>
                                </Button>
                            </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-col gap-1 items-center mb-5">
                            <span>Show Comments</span>
                            <button
                                onClick={() => setShowAnnotations(prev => !prev)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showAnnotations ? 'bg-accent' : 'bg-secondary/30'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showAnnotations ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span>Show Sidelines</span>
                            <button
                                onClick={() => setshowVariants(prev => !prev)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showVariants ? 'bg-accent' : 'bg-secondary/30'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showVariants ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <Button onClick={() => router.push('/dashboard/Analysis')}>
                            Analyze
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center shrink-0">
                {boardSize > 0 && (
                    <div style={{ width: boardSize, height: boardSize }}>
                        <CustomBoard options={{ position: currentPosition }}/>
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-fit flex flex-col justify-between">
                <div className="flex overflow-auto mb-2 p-2 justify-start border-2 border-secondary/40 rounded-md h-full">
                    <DisplayMoves currentMoveIndex={currentMoveIndex} showAnnotations={showAnnotations} pgn={pgn} showSidelines={showVariants}/>
                </div>
                <div className="flex justify-center gap-2">
                    <Button
                        onClick={goToStart}
                        className="disabled:opacity-50"
                        disabled={currentMoveIndex === -1}>
                        <FaAngleDoubleLeft />
                    </Button>
                    <Button
                        onClick={goToPreviousMove}
                        className="disabled:opacity-50"
                        disabled={currentMoveIndex === -1}>
                        <FaAngleLeft />
                    </Button>
                    <Button
                        onClick={goToNextMove}
                        className="disabled:opacity-50"
                        disabled={currentMoveIndex === moves.length - 1}>
                        <FaAngleRight />
                    </Button>
                    <Button
                        onClick={goToEnd}
                        className="disabled:opacity-50"
                        disabled={currentMoveIndex === moves.length - 1}>
                        <FaAngleDoubleRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
