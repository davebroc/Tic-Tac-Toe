import React, { useEffect } from 'react';
import MinmaxAgent from './MinmaxAgent';
import { SquareValue } from './Square';

interface AgentProps {
    isHumanTurn: boolean;
    handleMove: (i: number, color: SquareValue) => void;
    squares: SquareValue[];
}

interface Agent {
    move: () => void,
}

const AgentComponent: React.FC<AgentProps> = (props) => {
    const agent = new MinmaxAgent(props);

    useEffect(() => {
        if (!props.isHumanTurn)
            setTimeout(() => {
                agent.move();
            }, 400)

    }, [props.isHumanTurn]);

    return null;
};

export default AgentComponent;



export type { AgentProps, Agent };
