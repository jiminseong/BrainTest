import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { isValidResultType } from '../../model/resultType';
import TypeLogo from './ui/TypeLogo';
import TopNavigationBar from '../test-result/ui/TopNavigationBar';
import UnderTriangleIcon from '../../assets/icons/triangleIcon.svg?react';
import CloseIcon from '../../assets/icons/closeIcon.svg?react';
import QrCode from './ui/QrCode';
import cursorIcon from '/cursorIcon2.svg';
import MobileBr from '../../component/box/MobileBr';
import { isMobile } from '../test-content/TestContentPage';
import html2canvas from 'html2canvas';
import RightIcon from '../../assets/icons/rightIcon.svg?react';

const PrintPage = () => {
    const navigate = useNavigate();
    const [isWrapperVisible, setWrapperVisible] = useState(false);
    const [isPrintContainerVisible, setPrintContainerVisible] = useState(false);
    const [ResultSvg, setResultSvg] = useState<React.FC | null>(null); // 타입 정의 추가
    const [ResultPng, setResultPng] = useState<string | null>(null);
    const componentRef = useRef(null);
    const imageRef = useRef(null);
    const { type, name = '' } = useParams();
    const resultType = Number(type);
    const urlName = encodeURIComponent(name);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: '결과페이지',
    });
    const downloadImage = () => {
        if (imageRef.current) {
            html2canvas(imageRef.current, { backgroundColor: null }).then((canvas) => {
                const link = document.createElement('a');
                const urlName = name === '???' ? 'OOO' : name;
                link.download = `${urlName}님의결과지-type${resultType}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };
    useEffect(() => {
        if (isWrapperVisible && isPrintContainerVisible) {
            if (isMobile()) {
                downloadImage();
            } else {
                handlePrint();
            }
        }
    }, [isWrapperVisible, isPrintContainerVisible]);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const module1 = await import(`../../assets/images/typeResultPng/type_${resultType}_bill.png`);
                setResultPng(module1.default);
                console.log('PNG 로드됨');

                const module2 = await import(`../../assets/images/typeResult/type_${resultType}_bill.svg?react`);
                setResultSvg(() => module2.default);
                console.log('SVG 로드됨');
            } catch (err) {
                console.error('이미지 로드 에러:', err);
            }
        };

        loadImage();
    }, [resultType]);

    const handleOpenPrint = () => {
        setWrapperVisible(true);
        setPrintContainerVisible(true);
    };

    const handleClosePrint = () => {
        setPrintContainerVisible(false);
    };

    const handleAnimationEnd = () => {
        if (!isPrintContainerVisible) {
            setWrapperVisible(false);
        }
    };

    // 없는 유형으로 직접 접근하면 이미지 로드가 실패하므로 홈으로 돌려보낸다
    if (!isValidResultType(resultType)) {
        return <Navigate to="/" replace />;
    }

    return (
        <PageWrapper>
            <TopNavigationBar />
            <TypesNavigationButton onClick={() => navigate(`/test/result/${resultType}/${urlName}`)}>
                TYPES
                <RightIcon />
            </TypesNavigationButton>
            <RowWrapper>
                <TypeLogo type={resultType} />
                <PrintButton onClick={handleOpenPrint}>
                    PRINT
                    <StyledUnderTriangleIcon />
                </PrintButton>
                <SaveButton onClick={handleOpenPrint}>
                    SAVE
                    <StyledUnderTriangleIcon />
                </SaveButton>
            </RowWrapper>

            {isWrapperVisible && (
                <>
                    <QrCodeWrapper isPrintContainerVisible={isPrintContainerVisible}>
                        <QrCode name={name} type={resultType} />
                    </QrCodeWrapper>
                    <CloseButton onClick={handleClosePrint} />
                    <PrintContainerWrapper isWrapperVisible>
                        <PrintContainer
                            ref={componentRef}
                            isPrintContainerVisible={isPrintContainerVisible}
                            onAnimationEnd={handleAnimationEnd}
                        >
                            <Name>{name}님의 뇌유형은</Name>
                            {ResultSvg && <StyledResultSvg as={ResultSvg} />}
                        </PrintContainer>
                        <SaveContainer
                            isPrintContainerVisible={isPrintContainerVisible}
                            onAnimationEnd={handleAnimationEnd}
                            ref={imageRef}
                        >
                            <MobileName>{name}님의 뇌유형은</MobileName>
                            {ResultPng && <StyledResultPng src={ResultPng} alt="결과 이미지" />}
                        </SaveContainer>
                    </PrintContainerWrapper>
                </>
            )}
            <Text>
                결과지를 프린트해서 해당 유형에 맞는
                <MobileBr /> 다양한 그래픽과 특징 및 행복 찾는 방법을 간직하세요!
                <MobileBr />
                <br /> 다른 사람에게 당신의 유형을 공유하고 <MobileBr /> 주변 사람들의 유형도 알아보세요!
            </Text>
        </PageWrapper>
    );
};

export default PrintPage;

const TypesNavigationButton = styled.div`
    z-index: 20;
    position: absolute;
    top: 2em;
    left: 5%;
    display: flex;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
    color: #000;
    cursor: url(${cursorIcon}) 37 37, pointer;
    font-size: 1.125em;
    @media (max-width: 1023px) {
        font-size: 1em;
    }
`;

const StyledUnderTriangleIcon = styled(UnderTriangleIcon)`
    @media (max-width: 1023px) {
    }
    @media (max-width: 768px) {
        width: 0.8125em;
    }
`;
const SaveContainer = styled.div<{
    isPrintContainerVisible: boolean;
}>`
    display: none;
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        display: flex;
        position: absolute;
        width: 80%;
        box-shadow: 0px 4px 12.5px 9px rgba(0, 0, 0, 0.16);
        animation: ${({ isPrintContainerVisible }) => (isPrintContainerVisible ? fadeUp : fadeDown)} 0.5s ease-in-out;
        animation-fill-mode: forwards;
    }
    @media (max-width: 1023px) {
        display: flex;
        position: absolute;
        width: 80%;
        box-shadow: 0px 4px 12.5px 9px rgba(0, 0, 0, 0.16);
        animation: ${({ isPrintContainerVisible }) => (isPrintContainerVisible ? fadeUp : fadeDown)} 0.5s ease-in-out;
        animation-fill-mode: forwards;
    }
`;

const StyledResultPng = styled.img`
    width: 100%;
    height: 100%;
`;

const StyledResultSvg = styled.div`
    width: 100%;
    height: 100%;
`;
const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    background: #fff;
`;

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 80%;
    justify-content: center;
    align-items: center;
    gap: 5em;
    @media (max-width: 1023px) {
        flex-direction: column;
        gap: 2em;
    }
    @media (max-width: 768px) {
        margin-top: 5em;
        height: 50%;
        flex-direction: column;
        gap: 2em;
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const PrintContainerWrapper = styled.div<{ isWrapperVisible: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: rgba(217, 217, 217, 0.3);
    backdrop-filter: blur(10px);
    z-index: 10;
    display: flex;
    justify-content: center;
    padding-top: 2em;
    box-sizing: border-box;
    animation: ${({ isWrapperVisible }) => (isWrapperVisible ? fadeIn : fadeOut)} 0.15s ease-out;
    transition: visibility 0.15s ease-out;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera 스크롤바 숨기기 */
    }
`;

const CloseButton = styled(CloseIcon)`
    position: fixed;
    top: 2em;
    right: 2em;
    cursor: url(${cursorIcon}) 46 45, pointer;
    z-index: 15;
    @media (max-width: 1023px) {
        font-size: 1.125em;
        top: 1em;
        right: 1em;
        width: 2em;
    }
`;

const fadeUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const fadeDown = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
`;

const PrintContainer = styled.div<{
    isPrintContainerVisible: boolean;
}>`
    margin-top: 3em;
    position: relative;
    background: #fff;
    color: #070707;
    width: 523px;
    height: fit-content;
    box-shadow: 0px 4px 12.5px 9px rgba(0, 0, 0, 0.16);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    animation: ${({ isPrintContainerVisible }) => (isPrintContainerVisible ? fadeUp : fadeDown)} 0.5s ease-in-out;
    animation-fill-mode: forwards;
    @media (max-width: 1023px) {
        display: none;
    }
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        display: none;
    }
    @media print {
        display: flex;
        width: 79mm;
        height: 297mm;
        box-shadow: none;
        animation: none;
        margin-top: 0em;

        @page {
            size: 79mm 297mm;
        }
    }
`;

const QrCodeWrapper = styled.div<{ isPrintContainerVisible: boolean }>`
    animation: ${({ isPrintContainerVisible }) => (isPrintContainerVisible ? fadeUp : fadeDown)} 0.5s ease-in-out;
    animation-fill-mode: forwards;
    position: fixed;
    z-index: 15;
    bottom: 2em;
    left: 5%;
    @media (max-width: 1023px) {
        display: none;
    }
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        display: none;
    }
`;

const Name = styled.div`
    position: absolute;
    font-size: 1.625rem;
    font-weight: 800;
    left: 50%;
    top: 3em;
    color: #231815;
    transform: translate(-50%, -50%);

    @media (max-width: 1023px) {
        font-size: 1.25em;
    }
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        font-size: 3em;
    }
    @media print {
        top: 3.5em;
        font-size: 1em;
    }
`;

const MobileName = styled.div`
    position: absolute;
    font-size: 1em;
    font-weight: 800;
    left: 50%;
    top: 2.25em;
    color: #231815;
    transform: translate(-50%, -50%);
`;

const printButtonAnimation = keyframes`
    0% {    
        transform: rotate(0deg);
    }
    50% {    
        transform: rotate(2deg);
    }
    100% {
        transform: rotate(-2deg);
    }
`;

const PrintButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    border-radius: 2em;
    background: #77ceff;
    color: #070707;
    font-size: 5em;
    font-weight: 700;
    padding: 1em 1.5em;
    box-sizing: border-box;
    cursor: url(${cursorIcon}) 46 45, pointer;
    &:hover {
        animation: ${printButtonAnimation} 0.2s infinite;
    }

    @media (max-width: 1023px) {
        display: none;
    }
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        display: none;
    }
`;

const SaveButton = styled(PrintButton)`
    display: none;

    @media (max-width: 1023px) {
        font-size: 3em;
        display: flex;
    }
    @media (max-width: 768px) {
        font-size: 2em;
        display: flex;
    }
    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
        font-size: 5em;
        display: flex;
    }
`;
const Text = styled.div`
    color: #070707;
    font-size: 1.5em;
    text-align: center;
    @media (max-width: 1023px) {
        font-size: 1em;
    }
`;
