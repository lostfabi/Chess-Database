'use client'

import React, {useRef, useState} from "react";
import {Chess, Square} from "chess.js";
import {Chessboard, PieceDropHandlerArgs, SquareHandlerArgs} from "react-chessboard";

const Board= ({ ...options }) => {
        const chessGameRef = useRef(new Chess());
        const chessGame = chessGameRef.current;

        const [chessPosition, setChessPosition] = useState(chessGame.fen());
        const [moveFrom, setMoveFrom] = useState('');
        const [optionSquares, setOptionSquares] = useState({});

        function getMoveOptions(square: Square) {
            const moves = chessGame.moves({
                square,
                verbose: true
            });

            if (moves.length === 0) {
                setOptionSquares({});
                return false;
            }

            const newSquares: Record<string, React.CSSProperties> = {};
            for (const move of moves) {
                newSquares[move.to] = {
                    background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                    borderRadius: '50%'
                };
            }

            newSquares[square] = {
                background: 'rgba(255, 255, 0, 0.4)'
            };
            setOptionSquares(newSquares);

            return true;
        }
        function onSquareClick({ square, piece }: SquareHandlerArgs) {
            if (!moveFrom && piece) {
                const hasMoveOptions = getMoveOptions(square as Square);

                if (hasMoveOptions) {
                    setMoveFrom(square);
                }

                return;
            }

            const moves = chessGame.moves({
                square: moveFrom as Square,
                verbose: true
            });
            const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

            if (!foundMove) {
                const hasMoveOptions = getMoveOptions(square as Square);
                setMoveFrom(hasMoveOptions ? square : '');

                return;
            }

            try {
                chessGame.move({
                    from: moveFrom,
                    to: square,
                    promotion: 'q'
                });
            } catch {
                const hasMoveOptions = getMoveOptions(square as Square);

                if (hasMoveOptions) {
                    setMoveFrom(square);
                }

                return;
            }

            setChessPosition(chessGame.fen());
            setMoveFrom('');
            setOptionSquares({});
        }

        function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
            if (!targetSquare) {
                return false;
            }

            try {
                chessGame.move({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: 'q'
                });

                setChessPosition(chessGame.fen());
                setMoveFrom('');
                setOptionSquares({});

                return true;
            } catch {
                return false;
            }
        }

        const chessboardOptions = {
            onPieceDrop,
            onSquareClick,
            position: chessPosition,
            squareStyles: optionSquares,
            id: 'click-or-drag-to-move',
            ...options
        };

        return <Chessboard options={chessboardOptions} {...options} />;
}

export default Board;