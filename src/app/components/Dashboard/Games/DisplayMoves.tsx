import {movesToArray} from "@/app/lib/helperFunctions";

export default function DisplayMoves({ history, currentMoveIndex }: { history: string[], currentMoveIndex: number }) {
    const moves = movesToArray(history);

    let indexes: string[] = []
    let whiteMoves: string[] = []
    let blackMoves: string[] = []
    for(let i = 0; i < moves.length; i++) {
        indexes.push(moves[i].move)
        whiteMoves.push(moves[i].white)
        blackMoves.push(moves[i].black || '')
    }

    return (
        <div className="flex flex-row space-x-2 text-lg">
            <div>
                {indexes.map((e: string, i: number) => (
                    <div key={i}>
                        <span>{e}.</span>
                    </div>
                ))}
            </div>
            <div>
                {whiteMoves.map((move: string, i: number) => (
                    <div
                        key={i}
                        className={currentMoveIndex === i * 2 ? 'bg-light-accent/40 dark:bg-dark-accent/40 rounded-md px-1' : 'px-1'}
                    >
                        <span>{move}</span>
                    </div>
                ))}
            </div>
            <div>
                {blackMoves.map((move: string, i: number) => (
                    <div
                        key={i}
                        className={currentMoveIndex === i * 2 + 1 ? 'bg-light-accent/40 dark:bg-dark-accent/40 rounded-md px-1' : 'px-1'}
                    >
                        <span>{move}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}