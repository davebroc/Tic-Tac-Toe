type SquareValue = 'X' | 'O' | null;

interface SquareProps {
    value: SquareValue;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
    <button className="square" onClick={onClick}>
        {value}
    </button>
);


export { Square };
export type { SquareProps, SquareValue };

