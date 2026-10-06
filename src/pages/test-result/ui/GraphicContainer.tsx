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
                        <CreditRow>
                            <span>Designed By Kim MinZi</span>
                            <span>Developed By Ji MinSeong</span>
                        </CreditRow>
                        <CopyrightLine>
                            ⓒ 2024 WHY ARE YOU NERVOUS :<MobileBr />
                            Look Inside My Brain, All rights reserved.
                        </CopyrightLine>
                        <Notice>
                            해당 테스트는 그래픽 시스템을 사용하여 <MobileBr />
                            가상의 뉴런을 생성하는 뇌 유형 테스트입니다.
                            <br />
                            더 정확한 뇌 유형을 확인하고 싶은 분은 <MobileBr />
                            ‘Brain MD BY DANIEL AMEN, MD’ TEST를 이용하시길 바랍니다.
                        </Notice>
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

/* 피그마 스펙(2026-10-05): SUIT 500, 16px, 줄 간격 22px, 자간 -0.02em, 가로 584px.
   첫 줄 → (빈 줄) → 저작권 → (빈 줄 2) → 안내문 14px 두 줄 */
const BottomText = styled.div`
    width: 100%;
    max-width: 36.5em;
    color: #070707;
    font-weight: 500;
    font-size: 1em;
    line-height: 1.375em;
    text-align: center;
    letter-spacing: -0.02em;
    text-transform: capitalize;
`;

/* 2026-10-06 피드백: Designed/Developed를 저작권 줄 양끝(약 534px)에 맞춰 안쪽으로 */
const CreditRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1em;
    width: 33.5em;
    max-width: 100%;
    margin: 0 auto 1.375em;
    @media (max-width: 1023px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        gap: 0;
        margin-bottom: 0.6875em;
    }
`;

const CopyrightLine = styled.div`
    margin-bottom: 2.75em;
    @media (max-width: 1023px) {
        margin-bottom: 1.375em;
    }
`;

const Notice = styled.div`
    font-size: 0.875em;
    line-height: 1.5714em;
    text-transform: none;
    word-break: keep-all;
    /* 2026-10-06 피드백: 모바일 안내문 5pt 축소 (14px → 9px).
       em(0.5625em)으로 주면 Chrome의 '최소 논리 글꼴 크기' 때문에 10px로 올라가서 px로 고정 */
    @media (max-width: 1023px) {
        font-size: 9px;
    }
`;
