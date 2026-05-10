import { Move, MoveArray, PgnObject } from "@/lib/types";

type Token =
    | { type: 'moveNumber'; value: string; isBlack: boolean }
    | { type: 'move'; value: string }
    | { type: 'comment'; value: string }
    | { type: 'variantStart' }
    | { type: 'variantEnd' }
    | { type: 'result' };

export function formatPgnWithHeader(history: string[], header: string): string {
    const moves = history.reduce((acc, move, i) => {
        if(i % 2 === 0) {
            return acc + `${Math.floor(i / 2) + 1}. ${move} `
        }
        return acc + `${move} `
    }, '').trim()

    return `${header}\n\n${moves}`
}

export function getCommentsFromPGN(pgn: string): Record<number, string> {
    const result: Record<number, string> = {};
    const commentPattern = /\{([^}]*)}/g;
    const moveNumberPattern = /\d+\./g;

    let match;
    while ((match = commentPattern.exec(pgn)) !== null) {
        const comment = match[1].trim();
        const before = pgn.slice(0, match.index);

        const moveMatches = [...before.matchAll(moveNumberPattern)];
        if (moveMatches.length === 0) continue;

        const move = parseInt(moveMatches[moveMatches.length - 1][0]);
        result[move] = comment;
    }

    return result;
}

function tokenize(pgn: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < pgn.length) {
        const ch = pgn[i];

        if (/\s/.test(ch)) { i++; continue; }

        // Comment
        if (ch === '{') {
            const end = pgn.indexOf('}', i);
            if (end === -1) break;
            tokens.push({ type: 'comment', value: pgn.slice(i + 1, end).trim() });
            i = end + 1;
            continue;
        }

        if (ch === '(') { tokens.push({ type: 'variantStart' }); i++; continue; }
        if (ch === ')') { tokens.push({ type: 'variantEnd' }); i++; continue; }

        // NAG ($1, $2, ...)
        if (ch === '$') {
            while (i < pgn.length && !/\s/.test(pgn[i])) i++;
            continue;
        }

        // Result
        const rest = pgn.slice(i);
        const resultMatch = rest.match(/^(1-0|0-1|1\/2-1\/2|\*)/);
        if (resultMatch) {
            tokens.push({ type: 'result' });
            i += resultMatch[0].length;
            continue;
        }

        // Move number: digits followed by one or more dots
        if (/\d/.test(ch)) {
            let j = i;
            while (j < pgn.length && /\d/.test(pgn[j])) j++;
            const num = pgn.slice(i, j);
            let dotCount = 0;
            while (j < pgn.length && pgn[j] === '.') { dotCount++; j++; }
            if (dotCount > 0) {
                tokens.push({ type: 'moveNumber', value: num, isBlack: dotCount > 1 });
            }
            i = j;
            continue;
        }

        // SAN move
        if (/[a-zA-Z]/.test(ch)) {
            let j = i;
            while (j < pgn.length && /[a-zA-Z0-9+#=\-x]/.test(pgn[j])) j++;
            tokens.push({ type: 'move', value: pgn.slice(i, j) });
            i = j;
            continue;
        }

        i++;
    }

    return tokens;
}

function parseLine(tokens: Token[], pos: number): { moves: MoveArray; end: number } {
    const moves: MoveArray = [];

    while (pos < tokens.length) {
        const token = tokens[pos];
        if (token.type === 'variantEnd' || token.type === 'result') break;

        let moveIndex = '';
        let isBlack = false;

        if (token.type === 'moveNumber') {
            moveIndex = token.value;
            isBlack = token.isBlack;
            pos++;
        }

        const childMovesList: MoveArray[] = [];
        let white: string | undefined;
        let black: string | undefined;
        let comment: string | undefined;

        if (!isBlack) {
            // White's move
            if (tokens[pos]?.type === 'move') {
                white = (tokens[pos] as Extract<Token, { type: 'move' }>).value;
                pos++;
            }

            // Comment after white's move
            if (tokens[pos]?.type === 'comment') {
                comment = (tokens[pos] as Extract<Token, { type: 'comment' }>).value;
                pos++;
            }

            // Variants after white's move (alternatives to white's move)
            while (tokens[pos]?.type === 'variantStart') {
                pos++;
                const variant = parseLine(tokens, pos);
                childMovesList.push(variant.moves);
                pos = variant.end + 1; // skip ')'
            }

            // Black's move — may be preceded by a re-sync move number (e.g. 3...)
            if (tokens[pos]?.type === 'moveNumber' && (tokens[pos] as Extract<Token, { type: 'moveNumber' }>).isBlack) {
                pos++;
            }

            if (tokens[pos]?.type === 'move') {
                black = (tokens[pos] as Extract<Token, { type: 'move' }>).value;
                pos++;
            }
        } else {
            // Black-only continuation (e.g. 3... Nf6)
            if (tokens[pos]?.type === 'move') {
                black = (tokens[pos] as Extract<Token, { type: 'move' }>).value;
                pos++;
            }
        }

        // Comment after black's move
        if (tokens[pos]?.type === 'comment') {
            const c = (tokens[pos] as Extract<Token, { type: 'comment' }>).value;
            comment = comment ? `${comment} ${c}` : c;
            pos++;
        }

        // Variants after black's move (or after a white-only move at end of line)
        while (tokens[pos]?.type === 'variantStart') {
            pos++;
            const variant = parseLine(tokens, pos);
            childMovesList.push(variant.moves);
            pos = variant.end + 1;
        }

        if (white !== undefined || black !== undefined) {
            const move: Move = { moveIndex };
            if (white !== undefined) move.white = white;
            if (black !== undefined) move.black = black;
            if (comment !== undefined) move.comment = comment;
            if (childMovesList.length > 0) move.childMoves = childMovesList;
            moves.push(move);
        }
    }

    return { moves, end: pos };
}

export function parsePgn(pgn: string): PgnObject {
    const withoutHeaders = pgn.replace(/\[[^\]]*\]\s*/g, '').trim();
    const tokens = tokenize(withoutHeaders);
    const { moves } = parseLine(tokens, 0);
    return { moves };
}
