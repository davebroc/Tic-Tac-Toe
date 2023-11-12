import { SquareValue } from "../components/Square";

export default function calculateWinner(squares: SquareValue[]): [SquareValue | null, number[]] {
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
            return [squares[a], [a, b, c]]; // Return the winner and the winning line
        }
    }

    return [null, []]; // If no winner, return null and an empty array
}
