import React, { useState, useEffect } from "react";
import { Square, SquareValue } from "./Square";
import Agent from "./Agent";

const Game: React.FC = () => {
    const [isHumanTurn, setIsHumanTurn] = useState(true);
    const [status, setStatus] = useState<string>("");
    const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));

    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(squares);
    const draw = squares.every((square) => square !== null);

    useEffect(() => {
        if (winner) {
            setStatus(`Winner: ${winner}`);
        } else if (draw) {
            setStatus("It's a draw!");
        } else {
            setStatus(`Next player: ${isHumanTurn ? "X" : "O"}`);
        }
    }, [winner, draw, isHumanTurn]);


    const handleClick = (i: number): void => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const newSquares = [...squares];
        newSquares[i] = isHumanTurn ? "X" : "O";
        setSquares(newSquares);
        setIsHumanTurn(!isHumanTurn);
    };

    const renderSquare = (i: number): JSX.Element => (
        <Square value={squares[i]} onClick={() => handleClick(i)} />
    );

    return (
        <main>
            <Agent
                isHumanTurn={isHumanTurn}
                setIsHumanTurn={setIsHumanTurn}
                calculateWinner={calculateWinner}
                squares={squares}
            />
            <section className="Game">
                <div className="Game-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="Game-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="Game-row">
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
