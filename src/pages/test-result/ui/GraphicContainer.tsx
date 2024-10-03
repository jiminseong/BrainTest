import styled from 'styled-components';

const GraphicContainer = ({ type }: { type: number }) => {
    console.log(type);
    return (
        <GraphicContainerWrapper>
            <Title>Graphics Process</Title>
        </GraphicContainerWrapper>
    );
};

export default GraphicContainer;

const GraphicContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 3.125em 3.125em 0px 0px;
    background: #f4f4f4;
    margin-top: 5em;
    padding-top: 5em;
    box-sizing: border-box;
`;

const Title = styled.div`
    color: #070707;
    text-align: center;
    font-size: 4.375em;
    font-weight: 500;
`;
