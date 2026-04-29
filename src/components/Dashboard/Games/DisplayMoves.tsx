import {getCommentsFromPGN, movesToArray} from "@/lib/helperFunctions";

export default function DisplayMoves({
    history,
    currentMoveIndex,
    showAnnotations,
    pgn,
}: {
    history: string[];
    currentMoveIndex: number;
    showAnnotations?: boolean;
    pgn: string;
}) {

    const comments = getCommentsFromPGN(pgn);

    const moves = movesToArray(history);

    let indexes: string[] = []
    let whiteMoves: string[] = []
    let blackMoves: string[] = []
    for (let i = 0; i < moves.length; i++) {
        indexes.push(moves[i].move)
        whiteMoves.push(moves[i].white)
        blackMoves.push(moves[i].black || '')
    }

    return (
        <div className="flex flex-row space-x-2 text-md">
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
                        className={currentMoveIndex === i * 2 ? 'bg-accent/40 rounded-md px-1' : 'px-1'}
                    >
                        <span>{move}</span>
                    </div>
                ))}
            </div>
            <div>
                {blackMoves.map((move: string, i: number) => (
                    <div
                        key={i}
                        className={currentMoveIndex === i * 2 + 1 ? 'bg-accent/40 rounded-md px-1' : 'px-1'}
                    >
                        <span>{move}</span>
                    </div>
                ))}
            </div>
            {showAnnotations ? (
                <div>
                    {indexes.map((e: string, i: number) => (
                        <div key={i}>
                            {comments[parseInt(e)] ?
                                <span className='italic text-secondary'>{comments[parseInt(e)]}</span> :
                                <span>&#8203;</span>}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}