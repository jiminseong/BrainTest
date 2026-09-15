import styled from 'styled-components';
import BottomLogo from '../../../assets/icons/blackLogo.svg?react';
import AnimationRow from './AnimationList';
import MobileBr from '../../../component/box/MobileBr';
const GraphicContainer = ({ type }: { type: number }) => {
    return (
        <GraphicContainerWrapper>
            <Wrapper>
                <Title>GRAPHICS PROCESS</Title>

                <Column>
                    <Column2>
                        <Text>Emotion cell body_감정세포체</Text>
                        <Text>감정뉴런을 구성하는 한 부분으로 type{type}의 핵이 있다.</Text>
                    </Column2>
                    <AnimationRow type={type} category="saepo" />
                </Column>

                <Column>
                    <Column2>
                        <Text>Emotion dendrite_감정가지돌기</Text>
                        <Text>감정세포에 달려 감정 자극을 중계하는 가느다란 세포질의 돌기이다.</Text>
                    </Column2>
                    <AnimationRow type={type} category="gaji" />
                </Column>

                <Column>
                    <Column2>
                        <Text>Emotion axon_감정축삭돌기</Text>
                        <Text>감정세포에 달려 감정 자극을 중계하는 가느다란 세포질의 돌기이다.</Text>
                    </Column2>
                    <AnimationRow type={type} category="chucksack" />
                </Column>
                <Column3>
                    <StyledBottomLogo />
                    <BottomText>
                        ⓒ 2024 WHY ARE YOU NERVOUS :<MobileBr />
                        Look Inside My Brain, All rights reserved.
                    </BottomText>
                </Column3>
            </Wrapper>
        </GraphicContainerWrapper>
    );
};

export default GraphicContainer;

const StyledBottomLogo = styled(BottomLogo)`
    width: 8em;
`;
const GraphicContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 3.125em 3.125em 0px 0px;
    background: #f4f4f4;
    margin-top: 15em;
    padding: 5em 0em;
    box-sizing: border-box;
`;

const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 5em;
    @media (max-width: 1023px) {
        width: 90%;
    }
`;

const Column = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.25em;
`;
const Column2 = styled(Column)`
    gap: 0.8125em;
`;

const Column3 = styled(Column)`
    margin-top: 45em;
    @media (max-width: 1023px) {
    }
`;
const Title = styled.div`
    color: #070707;
    text-align: center;
    font-size: 3.5em;
    font-weight: 500;
    margin-top: 3em;
    @media (max-width: 1023px) {
        margin-top: 0em;
        font-size: 2em;
    }
`;

const Text = styled.div`
    color: #070707;
    text-align: center;
    font-size: 1.25em;
    font-weight: 500;
`;

const BottomText = styled.div`
    color: #070707;
    font-weight: 500;
    text-align: center;
`;
