import { useState } from "react";
import { Square, SquareValue } from "./Square";

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

const Board: React.FC = () => {
    const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const handleClick = (i: number): void => {
        const newSquares = [...squares];
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i: number): JSX.Element => (
        <Square value={squares[i]} onClick={() => handleClick(i)} />
    );

    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <main>

            <section className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </section>

            <div className="status">{status}</div>
        </main>
    );
};


export default Board