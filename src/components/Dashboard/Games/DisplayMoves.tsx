import { MoveArray } from "@/lib/types";
import { parsePgn } from "@/lib/pgnParser";

function formatVariantMoves(moves: MoveArray): string {
    return moves.map(move => {
        if (!move.white && move.black) {
            return `${move.moveIndex}... ${move.black}`;
        }
        const white = `${move.moveIndex}. ${move.white ?? ''}`;
        return move.black ? `${white} ${move.black}` : white;
    }).join(' ');
}

function VariantLine({ moves, depth, isLast }: { moves: MoveArray; depth: number; isLast: boolean }) {
    const prefix = isLast ? '└──' : '├──';
    const subVariants = moves.flatMap((move, mi) =>
        (move.childMoves ?? []).map((childVariant, ci, arr) => ({
            variant: childVariant,
            isLast: ci === arr.length - 1,
            key: `${mi}-${ci}`,
        }))
    );

    return (
        <div>
            <div style={{ paddingLeft: `${depth * 30}px` }} className="flex items-center gap-1">
                <span>{prefix}</span>
                <span>{formatVariantMoves(moves)}</span>
            </div>
            {subVariants.map(({ variant, isLast: subIsLast, key }) => (
                <VariantLine key={key} moves={variant} depth={depth + 1} isLast={subIsLast} />
            ))}
        </div>
    );
}

export default function DisplayMoves({
    currentMoveIndex,
    showAnnotations,
    showSidelines,
    pgn,
}: {
    currentMoveIndex: number;
    showAnnotations?: boolean;
    showSidelines?: boolean;
    pgn: string;
}) {
    const { moves } = parsePgn(pgn);

    return (
        <div className="text-md">
            {moves.map((move, i) => (
                <div key={i}>
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">{move.moveIndex}.</span>
                        {move.white && (
                            <span className={currentMoveIndex === i * 2 ? 'bg-accent/40 rounded-md px-1' : 'px-1'}>
                                {move.white}
                            </span>
                        )}
                        {move.black && (
                            <span className={currentMoveIndex === i * 2 + 1 ? 'bg-accent/40 rounded-md px-1' : 'px-1'}>
                                {move.black}
                            </span>
                        )}
                        {showAnnotations && move.comment && (
                            <span className="italic text-secondary text-sm">{move.comment}</span>
                        )}
                    </div>
                    {showSidelines && move.childMoves?.map((variant, j, arr) => (
                        <VariantLine key={j} moves={variant} depth={1} isLast={j === arr.length - 1} />
                    ))}
                </div>
            ))}
        </div>
    );
}
