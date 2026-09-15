import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Input } from './ui/Input';
import StatusBar from './ui/StatusBar';
import SelectButton from './ui/SelectButton';
import { Button } from '../../component/button/Button';
import questionsData from './model/question.json';
import { useSurveyStore } from '../../store/store';
import PageLogo from './ui/PageLogo';
import NavigationButton from '../../component/button/NavigationButton';
import ResultLoading from './ui/ResultLoading';
import calculateResultType from './model/calculateResultType';
import { useReactToPrint } from 'react-to-print';
import AlertModal from './ui/AlertModal';
import MobileBr from '../../component/box/MobileBr';
import { isMobile } from '../../model/isMobile';

const TestContentPage = () => {
    const [currentProgress, setCurrentProgress] = useState(0); // 퍼센티지
    const [currentName, setCurrentName] = useState('');
    const [nameCheck, setNameCheck] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [modalDisplay1, setModalDsiplay1] = useState(false);
    const [modalDisplay2, setModalDsiplay2] = useState(false);

    const [page, setPage] = useState(0); // 현재 페이지
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);

    const navigate = useNavigate();

    const [ResultSvg, setResultSvg] = useState<React.FC | null>(null);
    const [ResultPng, setResultPng] = useState<string | null>(null);
    const componentRef = useRef(null);
    const imageRef = useRef(null);

    const downloadImage = async (resultType: number) => {
        if (imageRef.current) {
            const { default: html2canvas } = await import('html2canvas');
            html2canvas(imageRef.current, { backgroundColor: null }).then((canvas) => {
                const link = document.createElement('a');
                const urlName = name === '???' ? 'OOO' : name;
                link.download = `${urlName}님의결과지-type${resultType}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: '결과영수증',
    });

    const { setName, setResult, saveAnswer, answers, name } = useSurveyStore();

    const handleLoading = () => {
        return new Promise<void>((resolve) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                resolve(); // Promise를 완료시켜 .then을 실행
            }, 4400); // 4.4초 후에 resolve
        });
    };

    const handleAnimate = () => {
        return new Promise<void>((resolve) => {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
                resolve();
            }, 600);
        });
    };

    const submitName = () => {
        if (currentName === '') {
            //이름이 비어있을시
            setModalDsiplay1(true);
        } else if (currentName.length > 5) {
            //이름이 5글자 이하일시
            setModalDsiplay2(true);
        } else {
            setName(currentName);
            setNameCheck(true);
            handleLoading().then(() => {
                setPage(1);
            });
            setCurrentProgress((prev) => prev + 2.5);
        }
    };

    const goBack = () => {
        if (loading && page === 2) {
            setLoading(false);
            setPage(1);
        } else if (loading && page === 3) {
            setPage(2);
            handleLoading();
        } else if (currentProgress === 2.5) {
            setNameCheck(false);
            setPage(0);
        }
        setQuestionIndex((prevIndex) => prevIndex - 1); // 질문 변경
        setCurrentProgress((prev) => prev - 2.5); // 진행률 업데이트
    };

    const handleAnswer = (answer: number) => {
        if (0 <= questionIndex && questionIndex <= 37) saveAnswer(questionIndex, answer); // 답변을 상태에 저장

        if (questionIndex === 9 || questionIndex === 21) {
            setPage(questionIndex === 9 ? 2 : 3);
            handleLoading();
            setQuestionIndex((prevIndex) => prevIndex + 1);
            setCurrentProgress((prev) => prev + 2.5);
        } else if (questionIndex === 38) {
            setQuestionIndex((prevIndex) => prevIndex + 1);
            setCurrentProgress((prev) => prev + 2.5);

            console.log(answers);

            const resultType = calculateResultType();
            setResult(resultType);

            if (!isMobile()) {
                handleResult(resultType).then(() => {
                    handleLoading().then(() => {
                        loadResultSvg();
                    });
                });
            } else {
                handleMobileResult(resultType).then(() => {
                    handleLoading().then(() => {
                        loadResultPng();
                    });
                });
            }
        } else {
            handleAnimate();
            setQuestionIndex((prevIndex) => prevIndex + 1);
            setCurrentProgress((prev) => prev + 2.5);
        }
    };

    const handleResult = (resultType: number): Promise<void> => {
        return import(`../../assets/images/typeResult/type_${resultType}_bill.svg?react`)
            .then((module) => {
                setResultSvg(() => module.default);
            })
            .catch((err) => {
                console.error('SVG 로드 에러:', err);
                setLoading(false); // 에러가 발생해도 로딩 해제
            });
    };

    const handleMobileResult = (resultType: number): Promise<void> => {
        return import(`../../assets/images/typeResultPng/type_${resultType}_bill.webp`)
            .then((module) => {
                setResultPng(module.default);
            })
            .catch((err) => {
                console.error('PNG 로드 에러:', err);
                setLoading(false); // 에러가 발생해도 로딩 해제
            });
    };

    const renderQuestion = (text: string | undefined) => {
        if (!text) {
            console.error('Invalid question text:', text);
            return null;
        }
        return text.split('{{mobileBr}}').map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < text.split('{{mobileBr}}').length - 1 && <MobileBr />}
            </React.Fragment>
        ));
    };

    const loadResultSvg = async () => {
        try {
            const resultType = calculateResultType();

            setLoading(false);
            handlePrint();

            navigate(`/test/result/${resultType}/${encodeURIComponent(name)}`, { replace: true });
            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight * 0.86,
                    behavior: 'smooth',
                });
            }, 100);
        } catch (err) {
            console.error('에러 발생:', err);
            setLoading(false);
        }
    };

    const loadResultPng = async () => {
        try {
            const resultType = calculateResultType();

            downloadImage(resultType);
            // navigate 후에 setTimeout을 사용하여 스크롤 동작을 지연시킵니다.

            navigate(`/test/result/${resultType}/${encodeURIComponent(name)}`, { replace: true });
            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight * 0.5,
                    behavior: 'smooth',
                });
            }, 100);
            setTimeout(() => {
                location.reload();
            }, 500);
        } catch (err) {
            console.error('에러 발생:', err);
            setLoading(false);
        }
    };

    return (
        <>
            {modalDisplay1 && <AlertModal alertText="이름을 입력해주세요." onStop={() => setModalDsiplay1(false)} />}
            {modalDisplay2 && (
                <AlertModal alertText="이름을 5글자 이하로 입력해주세요" onStop={() => setModalDsiplay2(false)} />
            )}
            <PageWrapper>
                <StatusBar status={currentProgress} loading={loading} />

                <Column>
                    {nameCheck === false && (
                        <ContentColumn>
                            <NavigationButton top="5em" onClick={() => navigate('/')} home />
                            <Column2>
                                <Text>당신의 이름은 무엇인가요?</Text>
                                <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                            </Column2>
                            <TextContentButton onClick={() => submitName()}>다음</TextContentButton>
                        </ContentColumn>
                    )}

                    {nameCheck === true && loading === true && page === 0 && (
                        <LoadingWrapper>
                            <PageLogo rotate={true} width="16%" mobileWidth="50%" page={1} />
                            <PageIndexText>당신의 특징에 대해서 알려주세요.</PageIndexText>
                            <LoadingText>loading...</LoadingText>
                        </LoadingWrapper>
                    )}

                    {loading === false && page >= 1 && (
                        <ContentColumn>
                            {currentProgress >= 2.5 && !loading && (
                                <>
                                    <NavigationButton
                                        top="3.3125em"
                                        right="3em"
                                        mobileLeft="1.125em"
                                        onClick={() => goBack()}
                                    />
                                    <NavigationButton
                                        top="5em"
                                        mobileRight="1.125em"
                                        onClick={() => navigate('/')}
                                        home
                                    />
                                </>
                            )}
                            <PageLogo width="8%" page={page} mobileWidth="30%" />
                            <AnimationQuestionText animate={animate}>
                                {renderQuestion(questionsData.questions[questionIndex])} {}
                            </AnimationQuestionText>

                            <SelectButton
                                onClickOne={() => handleAnswer(1)}
                                onClickTwo={() => handleAnswer(2)}
                                onClickThree={() => handleAnswer(3)}
                                onClickFour={() => handleAnswer(4)}
                                onClickFive={() => handleAnswer(5)}
                            />
                        </ContentColumn>
                    )}

                    {page >= 2 && loading && questionIndex < 39 && (
                        <LoadingWrapper>
                            <PageLogo rotate={true} width="16%" page={page} mobileWidth="50%" />
                            <PageIndexText>
                                {page == 2
                                    ? '당신의 생활에 대해서 알려주세요.'
                                    : '당신의 요즘 기분에 대해서 알려주세요.'}
                            </PageIndexText>
                            <LoadingText>loading...</LoadingText>
                        </LoadingWrapper>
                    )}

                    {questionIndex === 39 && loading && (
                        <SubmitLoadingWrapper>
                            <ResultLoading />
                        </SubmitLoadingWrapper>
                    )}
                </Column>
            </PageWrapper>

            <PrintContainer ref={componentRef}>
                <Name>{name}님의 뇌유형은</Name>
                {ResultSvg && <StyledResultSvg as={ResultSvg} />}
            </PrintContainer>

            <SaveContainer ref={imageRef}>
                <MobileName>{name}님의 뇌유형은</MobileName>
                {ResultPng && <StyledResultPng src={ResultPng} alt="결과 이미지" />}
            </SaveContainer>
        </>
    );
};

export default TestContentPage;

const PageIndexText = styled.div`
    color: #fff;
    text-align: center;
    font-size: 1.725em;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.25em;
    }
`;

const PageWrapper = styled.div`
    background-color: #070707;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const fade = keyframes`
    0% {
        opacity: 0;
        
    }
    100% {
        opacity: 1;
        
    }
`;

const LoadingText = styled.div`
    position: absolute;
    bottom: 4em;
    left: 3em;
    font-size: 1.5em;
    font-weight: 700;
    color: #727272;
`;

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: -10em;
    gap: 3em;
    align-items: center;
    justify-content: center;
    background-color: #070707;
    animation: ${fade} 0.6s ease-in-out;
`;

const SubmitLoadingWrapper = styled(LoadingWrapper)`
    margin-top: 0em;
    gap: 5em;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
`;

const Column2 = styled(Column)`
    height: 60%;
    width: 100%;
`;
const ContentColumn = styled(Column)`
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    justify-content: space-between;
    @media (max-width: 768px) {
        height: 80%;
    }
`;

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const AnimationQuestionText = styled.div<{ animate: boolean }>`
    color: #fff;
    text-align: center;
    font-size: 1.75em;
    font-weight: 700;
    animation: ${({ animate }) => (animate ? fadeInUp : 'none')} 0.6s ease-in-out;
    @media (max-width: 1023px) {
        position: absolute;
        margin-top: 30%;
        font-size: 1.25em;
        width: 78%;
    }
    @media (max-width: 768px) {
        position: absolute;
        margin-top: 40%;
        font-size: 1.25em;
        width: 78%;
    }
`;

const Text = styled.div`
    color: #fff;
    text-align: center;
    font-size: 1.725em;
    font-weight: 700;
    margin-bottom: 2em;
    @media (max-width: 1023px) {
        font-size: 1.5em;
    }
`;
const TextContentButton = styled(Button)`
    margin-top: 10%;
    font-size: 1.125em;
    @meida (max-width : 768px) {
        font-sizne: 0.8125em;
    }
`;

const PrintContainer = styled.div`
    position: relative;
    display: none;

    background: #fff;
    color: #070707;
    width: 523px;
    height: fit-content;
    overflow-y: auto;
    box-sizing: border-box;

    @media print {
        display: flex;
        width: 79mm;
        height: 297mm;
        box-shadow: none;
        animation: none;

        @page {
            size: 79mm 297mm;
        }
    }
`;

const Name = styled.div`
    display: none;
    position: absolute;
    font-size: 1.625rem;
    font-weight: 800;
    left: 50%;
    top: 3em;
    color: #231815;
    transform: translate(-50%, -50%);
    @media print {
        display: flex;
        top: 3.5em;
        font-size: 0.8rem;
    }
`;

const MobileName = styled.div`
    position: absolute;
    font-size: 1rem;
    font-weight: 800;
    left: 50%;
    top: 3em;
    color: #231815;
    transform: translate(-50%, -50%);
`;
const StyledResultSvg = styled.div`
    width: 100%;
    height: auto;
`;

const SaveContainer = styled.div`
    position: relative;
    width: 50%;

    top: 5%;
    box-shadow: 0px 4px 12.5px 9px rgba(0, 0, 0, 0.16);

    @media (max-width: 1023px) {
        width: 90%;

        top: 5%;
    }
`;

const StyledResultPng = styled.img`
    width: 100%;
    height: 100%;
`;
