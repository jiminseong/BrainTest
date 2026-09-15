import styled from 'styled-components';
import FirstNeuron from './ui/FirstNeuron';
import SecondNeuron from './ui/SecondNeuron';
import ThirdNeuron from './ui/ThirdNeuron';
import Logo from '../../assets/icons/Logo.svg?react';
import TestStartButton from '../../assets/images/testStartButton.svg?react';
import RightIcon from '../../assets/icons/rightIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cursorIcon from '/cursorIcon2.svg';
import { isMobile } from '../../model/isMobile';

const HomePage = () => {
    const navigate = useNavigate();
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [animationStopState, setAnimationStop] = useState(false);
    const [typedText, setTypedText] = useState<string[]>([]);
    const content = [
        '당신의 뇌 유형은 무엇입니까? 뇌 유형 테스트를 통해 또 다른 ‘나’를 발견하고 ‘나’의 감정을 마주해보세요.',
        '테스트 결과로 제공되는 16가지의 유형 중, 당신의 뇌가 어느 유형에 속하는지 확인해보세요.',
        '1단계 | 뇌 유형 검사를 받습니다.',
        '2단계 | 뇌 유형을 확인합니다.',
        '3단계 | 개별화된 결과지를 받습니다.',
        '4단계 | 건강을 개선합니다.',
        '이 검사는 현재 당신의 상황이 어떻든 실시간으로 그리고 정확하게 뇌 건강을 증진할 수 있는 생활 습관과 영양소를 추천합니다.',
        '언제나 더 좋은 ‘나’와 마주할 수 있는 방법이 있습니다.',
        '망설이지 마세요.',
    ];
    const mobileContent = [
        '당신의 뇌 유형은 무엇입니까? 뇌 유형 테스트를 통해 또 다른 ‘나’를 발견하고 ‘나’의 감정을 마주해보세요.',
        '테스트 결과로 제공되는 16가지의 유형 중, 당신의 뇌가 어느 유형에 속하는지 확인해보세요.',
        '1단계 | 뇌 유형 검사를 받습니다.',
        '2단계 | 뇌 유형을 확인합니다.',
        '3단계 | 개별화된 결과지를 받습니다.',
        '4단계 | 건강을 개선합니다.',
        '망설이지 마세요.',
    ];

    useEffect(() => {
        let i = 0; // 문장 인덱스
        let j = 0; // 글자 인덱스
        let currentText = ''; // 현재 타이핑 중인 문장
        const contentToUse = isMobile() ? mobileContent : content; // 모바일 여부에 따라 사용할 텍스트 결정
        const intervalId = setInterval(() => {
            if (i < contentToUse.length) {
                if (j < contentToUse[i].length) {
                    currentText += contentToUse[i][j]; // 한 글자씩 추가
                    setTypedText((prev) => {
                        const updatedText = [...prev];
                        updatedText[i] = currentText; // 현재 문장 업데이트
                        return updatedText;
                    });
                    j++;
                } else {
                    i++;
                    j = 0;
                    currentText = '';
                    if (i === contentToUse.length) {
                        clearInterval(intervalId); // 모든 문장이 출력되면 인터벌 종료
                        setButtonDisplay(true);
                    }
                }
            }
        }, 50); // 50ms 지연 시간

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);

    const handleMouseEnter = () => setAnimationStop(true);
    const handleMouseLeave = () => setAnimationStop(false);

    return (
        <HomePageWrapper>
            <FirstNeuron stop={animationStopState} />
            <SecondNeuron stop={animationStopState} />
            <ThirdNeuron stop={animationStopState} />
            <StyledLogo />
            <TypesNavigationButton onClick={() => navigate(`/test/result/1/%3F%3F%3F`)}>
                TYPES
                <RightIcon />
            </TypesNavigationButton>

            <FirstGreenContainer>
                <Title>brain type test 100%</Title>

                {typedText.map((text, index) => (
                    <ContentText key={index}>
                        {text}
                        <br />
                    </ContentText> // 각각의 문장을 span으로 출력
                ))}

                {buttonDisplay && (
                    <ButtonWrapper
                        onClick={() => navigate('/caution')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <StyledTestStartButton />
                    </ButtonWrapper>
                )}
            </FirstGreenContainer>
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
    font-size: 1em;
    line-height: 1em;
    color: #ffffff;
    margin: 0.5em 0;
    white-space: pre-line;
`;

const StyledLogo = styled(Logo)`
    z-index: 10;
    position: absolute;
    width: 7%;
    top: 1em;
    min-width: 100px;

    right: 5%;
    @midea (max-width : 1023px) {
        right: 1.25em;
    }
`;

const Title = styled.span`
    font-size: 2em;
    background: #070707;
    color: #fff;
`;

const ButtonWrapper = styled.button`
    cursor: url(${cursorIcon}) 37 37, pointer;
    margin-top: 5%;
    background: #070707;
    width: fit-content;
    border: none;
    outline: none;
    @media (max-width: 1023px) {
        width: 90%;
    }
`;
const StyledTestStartButton = styled(TestStartButton)`
    transition: filter 0.5s ease, transform 0.5s ease;
    &:hover {
        filter: invert(1) brightness(2) contrast(1.1) drop-shadow(0px 0px 17px #7aff77);
        transform: scale(1.005);
    }
    @media (max-width: 1023px) {
        width: 90%;
        height: 30%;
    }
`;
const FirstGreenContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25em;
    z-index: 10;
    color: #ffffff;
    min-width: 60%;
    min-height: 45%;
    top: 35%;
    left: 5%;
    box-shadow: 0 0 0 3px #7aff77 inset, 0px 0px 8.5px 1px #77ceff;
    @media (max-width: 1023px) {
        right: 5%;
        top: 25%;
    }
`;

const TypesNavigationButton = styled.div`
    z-index: 10;
    position: absolute;
    top: 5%;
    left: 5%;
    display: flex;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: url(${cursorIcon}) 37 37, pointer;
    font-size: 1.125em;
    @media (max-width: 1023px) {
        font-size: 1em;
    }
`;
