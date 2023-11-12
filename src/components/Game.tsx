import React, { useState, useEffect } from "react";
import { Square, SquareValue } from "./Square";
import Agent from "./Agent";
import { agentSymbol, humanSymbol } from "../util/Settings";
import calculateWinner from "../util/CalculateWinner";

const Game: React.FC = () => {
    const [isHumanTurn, setIsHumanTurn] = useState(true);
    const [status, setStatus] = useState<string>("");
    const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));
    const [winningLine, setWinningLine] = useState<number[]>([]);

    useEffect(() => {
        const [winner, line] = calculateWinner(squares);
        const draw = squares.every((square) => square !== null);

        const statusText = winner
            ? `Winner: ${winner}`
            : draw
                ? "It's a draw!"
                : `Next player: ${isHumanTurn ? humanSymbol : agentSymbol}`;

        setStatus(statusText);

        if (winner !== null)
            setWinningLine(line);
    }, [squares, isHumanTurn]);

    const handleMove = (i: number, color: SquareValue): void => {
        if (calculateWinner(squares)[0] || squares[i]) return;

        const newSquares = [...squares];
        newSquares[i] = color;
        setSquares(newSquares);

        setIsHumanTurn(!isHumanTurn);
    };

    const renderSquare = (i: number): JSX.Element => (
        <Square
            value={squares[i]}
            onClick={() => handleMove(i, humanSymbol)}
            isWinningSquare={winningLine.includes(i)}
        />
    );

    return (
        <main>
            <Agent isHumanTurn={isHumanTurn} handleMove={handleMove} squares={squares} />
            <section className="game">
                <div className="game-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="game-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="game-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </section>
            <div className="status">{status}</div>
        </main>
    );
};

export default Game;
