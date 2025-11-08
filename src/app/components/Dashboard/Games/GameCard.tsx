'use client'

import { Game } from "@/app/lib/definitions";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Link from "next/link";
import {splitResult} from "@/app/lib/helperFunctions";

export default function ({ game, tournamentName }: { game: Game, tournamentName: string }) {
    const scores = splitResult(game.result)

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
                    <div className="pb-2 font-bold">
                        <p>{tournamentName}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between pr-1">
                        <p>{game.playerBlack}</p>
                        <p>{scores.black}</p>
                    </div>
                    <Chessboard options = {{showNotation: false, position: chess.fen()}}/>
                    <div className="flex flex-row items-center justify-between pr-1">
                        <p>{game.playerWhite}</p>
                        <p>{scores.white}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}