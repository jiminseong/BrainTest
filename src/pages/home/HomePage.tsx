import styled from 'styled-components';
import FirstNeuron from './ui/FirstNeuron';
import SecondNeuron from './ui/SecondNeuron';
import ThirdNeuron from './ui/ThirdNeuron';
import Logo from '../../assets/icons/Logo.svg?react';
import GreenContainer from './ui/GreenContainer';
import testStartButtonUrl from '../../assets/images/TestStartButton.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const HomePage = () => {
    const navigate = useNavigate();
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [animationState, setAnimation] = useState(true);
    const [typedText, setTypedText] = useState('');
    const content = `당 신의 뇌 유형은 무엇입니까? 뇌 유형 테스트를 통해 또 다른 ‘나’를 발견하고 ‘나’의 감정을 마주해보세요.\n테스트 결과로 제공되는 16가지의 유형 중, 당신의 뇌가 어느 유형에 속하는지 확인해보세요.\n 1단계 | 뇌 유형 검사를 받습니다.\n  2단계 | 뇌 유형을 확인합니다.\n 3단계 | 개별화된 결과지를 받습니다.\n 4단계 | 건강을 개선합니다.\n 이 검사는 현재 당신의 상황이 어떻든 실시간으로 그리고 정확하게 뇌 건강을 증진할 수 있는 생활 습관과 영양소를 추천합니다.\n 언제나 더 좋은 ‘나’와 마주할 수 있는 방법이 있습니다.\n 망설이지 마세요.`;

    useEffect(() => {
        let i = 0;
        if (!buttonDisplay) {
            const intervalId = setInterval(() => {
                if (i < content.length - 1) {
                    setTypedText((prev) => prev + (content[i] === '\n' ? '\n' : content[i]));
                    i++;
                } else {
                    clearInterval(intervalId);
                    setButtonDisplay(true);
                }
            }, 50); // 50ms 지연 시간

            return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
        }
    }, [content]);

    // 핸들러 추가
    const handleMouseEnter = () => setAnimation(false);
    const handleMouseLeave = () => setAnimation(true);

    return (
        <HomePageWrapper>
            <FirstNeuron stop={animationState} />
            <SecondNeuron stop={animationState} />
            <ThirdNeuron stop={animationState} />
            <StyledLogo />
            <GreenContainer maxWidth="auto" minWidth="25%" minHeight="80%" maxHeight="fit-content" left="40%" top="15%">
                <ContentText>brain cell 99%</ContentText>
            </GreenContainer>
            <GreenContainer maxWidth="auto" minWidth="15%" minHeight="20%" maxHeight="fit-content" left="60%" top="5%">
                <ContentText>dendritic spines 99%</ContentText>
            </GreenContainer>
            <GreenContainer
                maxWidth="fit-content"
                minWidth="50%"
                minHeight="50%"
                maxHeight="fit-content"
                left="5%"
                top="35%"
            >
                <Title>brain type test 100%</Title>
                <ContentText2 ref={contentRef}>{typedText}</ContentText2>
                {buttonDisplay && (
                    <ButtonWrapper
                        onClick={() => navigate('/caution')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image src={testStartButtonUrl} alt="테스트시작버튼" />
                    </ButtonWrapper>
                )}
            </GreenContainer>
        </HomePageWrapper>
    );
};

export default HomePage;

const HomePageWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #070707;
    contain: paint;
`;

const ContentText = styled.p`
    background-color: #070707;
    width: fit-content;
    line-height: 1.5em;
    color: #ffffff;
    margin: 0.5em 0;
    white-space: pre-line;
`;

const ContentText2 = styled.p`
    background-color: #070707;
    width: fit-content;
    line-height: 2em;
    color: #ffffff;
    margin: 0.5em 0;
    white-space: pre-line;
`;

const StyledLogo = styled(Logo)`
    position: absolute;
    top: 1.5em;
    right: 2em;
`;

const Title = styled.div`
    font-size: 2em;
    color: #fff;
`;

const Image = styled.img`
    width: 100%;
    max-width: 550px;
`;

const ButtonWrapper = styled.button`
    cursor: pointer;
    margin-top: 5%;
    background: #070707;
    width: fit-content;
    border: none;
    outline: none;
`;
