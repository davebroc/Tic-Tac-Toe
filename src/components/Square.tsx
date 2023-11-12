import React from "react";

type SquareValue = 'X' | 'O' | null;

interface SquareProps {
    value: SquareValue;
    onClick: () => void;
    isWinningSquare?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => (
    <button
        className={`square ${isWinningSquare ? "winning-square" : ""}`}
        onClick={onClick}
    >
        {value}
    </button>
);


export { Square };
export type { SquareProps, SquareValue };
