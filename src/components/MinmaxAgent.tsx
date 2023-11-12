import { AgentProps, Agent } from './Agent';
import { SquareValue } from './Square';
import { agentSymbol, humanSymbol } from "../util/Settings";
import calculateWinner from '../util/CalculateWinner';

class MinimaxAgent implements Agent {
    private handleMove: (i: number, color: SquareValue) => void;
    private squares: SquareValue[];
    private color: SquareValue;
    private isHumanTurn: boolean;

    constructor(props: AgentProps) {
        this.color = agentSymbol;

        this.handleMove = props.handleMove;
        this.isHumanTurn = props.isHumanTurn;
        this.squares = [...props.squares];
    }

    public move(): void {
        if (this.isHumanTurn || this.isGameOver() || this.isDraw())
            return

        const bestMoveIndex = this.getBestMove();

        if (bestMoveIndex !== -1) {
            this.handleMove(bestMoveIndex, agentSymbol);
        }
    }

    private isGameOver(): boolean {
        return calculateWinner(this.squares) !== null;
    }

    private isDraw(): boolean {
        return this.squares.every((square) => square !== null);
    }


    private getBestMove(): number {
        let bestMoveIndex: number = -1;
        let bestValue: number = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i] === null) {
                this.squares[i] = this.color; // make move
                const value = this.minimax(0, false);
                this.squares[i] = null; // undo

                if (value > bestValue) {
                    bestValue = value;
                    bestMoveIndex = i;
                }
            }
        }

        return bestMoveIndex;
    }

    private minimax(depth: number, maximizingPlayer: boolean): number {
        const winner = calculateWinner(this.squares);

        if (winner === humanSymbol) {
            return depth - 10; // win, prioritize winning sooner
        } else if (winner === agentSymbol) {
            return 10 - depth; // 'loss, prioritize loseing later
        } else if (this.isDraw()) {
            return 0; // It's a draw
        }

        const scores: number[] = [];

        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i] === null) { // make move
                this.squares[i] = maximizingPlayer ? agentSymbol : humanSymbol
                scores.push(this.minimax(depth + 1, !maximizingPlayer));
                this.squares[i] = null;  // undo
            }
        }

        return maximizingPlayer ? Math.max(...scores) : Math.min(...scores);
    }
}

export default MinimaxAgent;
