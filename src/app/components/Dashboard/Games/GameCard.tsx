'use client'

import { Chessboard } from "react-chessboard";
import { Game, Tournament } from "@/app/lib/definitions";
import { Chess } from "chess.js";
import DisplayMoves from "./DisplayMoves";
import {formatDateToString, movesToArray, splitResult} from "@/app/lib/helperFunctions";

export default function GameCard({ game, tournament }: { game: Game, tournament: Tournament }) {
    const pgn = game.pgn

    const chess = new Chess()
    chess.loadPgn(pgn)

    console.log(movesToArray(chess.history()))

    const date: string = formatDateToString(game.date)
    const scores = splitResult(game.result)

    return(
        <div className="max-h-full flex flex-row gap-4">
            <div className="flex flex-col flex-1.5 space-y-2 justify-between">
                <div className="flex flex-col">
                    <h2 className="self-end">{game.playerBlack}</h2>
                    <h2 className="self-end">{scores.black}</h2>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h2>{tournament.name}</h2>
                    <h3>{date}</h3>
                    <div className="bg-light-secondar/30 dark:bg-dark-secondary/30 p-2 rounded-md text-sm">
                        <p className="whitespace-pre-line">
                            {pgn}
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
                    <Chessboard options={{allowDragging: true, position: chess.fen()}} />
                </div>
            </div>
            <div className="flex-1">
                <DisplayMoves moveArray={chess.history()}/>
            </div>
        </div>
    )
}