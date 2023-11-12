import React, { useEffect } from 'react';
import MinmaxAgent from './MinmaxAgent';
import { SquareValue } from './Square';

interface AgentProps {
    isHumanTurn: boolean;
    setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    calculateWinner: (squares: SquareValue[]) => SquareValue;
    squares: SquareValue[];
}

interface Agent {
    move: () => void,
    // getBestMove: () => string,
}

const AgentComponent: React.FC<AgentProps> = (props) => {
    const agent = new MinmaxAgent(props);

    useEffect(() => {
        if (!props.isHumanTurn) {
            agent.move();
        }
    }, [props.isHumanTurn]);

    return null;
};

export default AgentComponent;



export type { AgentProps, Agent };
