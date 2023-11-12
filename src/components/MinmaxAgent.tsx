import { AgentProps, Agent } from './Agent';

class MinimaxAgent implements Agent {
    private setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    private squares: Array<string | null>;
    private color: string;

    constructor(props: AgentProps) {
        this.color = 'O'; // Assume the agent always plays as 'X' in Tic Tac Toe
        this.setIsHumanTurn = props.setIsHumanTurn;
        this.squares = props.squares;
    }

    public move(): void {
        if (!this.isGameOver() && !this.isDraw()) {
            const bestMoveIndex = this.getBestMove();

            if (bestMoveIndex !== -1) {
                this.squares[bestMoveIndex] = this.color;
                this.setIsHumanTurn(true);
            }
        }
    }

    private isGameOver(): boolean {
        return this.calculateWinner() !== null;
    }

    private isDraw(): boolean {
        return this.squares.every((square) => square !== null);
    }

    private calculateWinner(): string | null {
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
            if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
                return this.squares[a];
            }
        }

        return null;
    }

    private getBestMove(): number {
        let bestMoveIndex: number = -1;
        let bestValue: number = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i] === null) {
                this.squares[i] = this.color;
                const value = this.minimax(0, false);
                this.squares[i] = null;

                if (value > bestValue) {
                    bestValue = value;
                    bestMoveIndex = i;
                }
            }
        }

        return bestMoveIndex;
    }

    private minimax(depth: number, maximizingPlayer: boolean): number {
        const winner = this.calculateWinner();

        if (winner === 'X') {
            return depth - 10; // 'X' wins, prioritize winning sooner
        } else if (winner === 'O') {
            return 10 - depth; // 'O' wins, prioritize winning later
        } else if (this.isDraw()) {
            return 0; // It's a draw
        }

        const scores: number[] = [];

        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i] === null) {
                this.squares[i] = maximizingPlayer ? 'O' : 'X';
                scores.push(this.minimax(depth + 1, !maximizingPlayer));
                this.squares[i] = null;
            }
        }

        return maximizingPlayer ? Math.max(...scores) : Math.min(...scores);
    }
}

export default MinimaxAgent;
