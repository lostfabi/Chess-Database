'use client'

import { Game } from "@/app/lib/definitions";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ({ game, tournamentName }: { game: Game, tournamentName: string }) {
    const chess = new Chess()

    try {
        chess.loadPgn(game.pgn)
    } catch(error) {
        console.log('Error loading pgn:', error)
    }

    return(
        <div>
            <div className="bg-light-secondary/20 py-2 px-3 rounded-md">
                <div className="pb-2">
                    <p>{tournamentName}</p>
                </div>
                <p>{game.playerBlack}</p>
                <Chessboard options = {{showNotation: false, position: chess.fen()}}/>
                <p>{game.playerWhite}</p>
            </div>
        </div>
    )
}