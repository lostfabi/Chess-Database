/*
'use client'
import "../resources/styling/writing.css"
import { Chess } from "chess.js"
import Chessboard from './ChessboardWrapper'
import {useState} from "react";

export default function MinimalChessboard() {
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

    return (
        <div className="flex flex-row items-center justify-center m-5">
            <div className="w-1/3 mr-5 ml-5">
                <Chessboard options = {{showNotation: true, position: game.fen(), onPieceDrop: onDrop as any}}/>
            </div>
            <div className="w-1/3">
                <h1>Game FEN:</h1>
                <p>{game.fen()}</p>
                <h1>Game PGN:</h1>
                <p>{game.pgn()}</p>
            </div>
        </div>
    )}
 */