'use client'

import { Game } from "@/app/lib/definitions";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Link from "next/link";

export default function ({ game, tournamentName }: { game: Game, tournamentName: string }) {
    const chess = new Chess()

    try {
        chess.loadPgn(game.pgn)
    } catch(error) {
        console.log('Error loading pgn:', error)
    }
    return(
        <div>
            <Link href={`/dashboard/Games/${game.id}`}>
                <div className="bg-light-secondary/40 dark:bg-dark-secondary/40 hover:bg-light-secondary/60 hover:dark:bg-dark-secondary/60 py-2 px-3 rounded-md">
                    <div className="pb-2">
                        <p>{tournamentName}</p>
                    </div>
                    <p>{game.playerBlack}</p>
                    <Chessboard options = {{showNotation: false, position: chess.fen()}}/>
                    <p>{game.playerWhite}</p>
                </div>
            </Link>
        </div>
    )
}