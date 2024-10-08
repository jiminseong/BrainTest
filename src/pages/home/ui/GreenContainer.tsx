import styled from 'styled-components';
import React from 'react';

interface GreenContainerProps {
    width: string;
    height: string;
    top: string;
    left: string;
    borderOpacity?: string;
    children: React.ReactNode;
}

const GreenContainer: React.FC<GreenContainerProps> = ({ width, height, top, left, borderOpacity = '1', children }) => {
    return (
        <GreenWrapper width={width} height={height} top={top} left={left} borderOpacity={borderOpacity}>
            {children}
        </GreenWrapper>
    );
};

export default GreenContainer;

interface GreenWrapperProps {
    width: string;
    height: string;
    top: string;
    left: string;
    borderOpacity: string;
}

const GreenWrapper = styled.div<GreenWrapperProps>`
    position: absolute;
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    color: #ffffff;
    line-height: 2em;
    border: 3px solid rgba(122, 255, 119, ${({ borderOpacity }) => borderOpacity});
    box-shadow: 0px 0px 8.5px 1px #77ceff;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    box-sizing: border-box;
`;
