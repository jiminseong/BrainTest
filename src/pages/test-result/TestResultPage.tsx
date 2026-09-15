import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNavigation from './ui/TopNavigationBar';
import TypeLogo from './ui/TypeLogo';
import TypeNeuron from './ui/TypeNeuron';
import TypeTitle from './ui/TypeTitle';
import TypeStructure from './ui/TypeStructure';
import TypeContentText from './ui/TypeContentText';
import GraphicContainer from './ui/GraphicContainer';
import MiddleNavigationBar from './ui/MiddleNavigationBar';
import { Navigate, useParams } from 'react-router-dom';
import { isValidResultType } from '../../model/resultType';
import { isMobile } from '../../model/isMobile';

const TestResultPage = () => {
    const { type, name = '' } = useParams();
    const resultType = Number(type);

    // 각 섹션의 ref를 생성
    const neuronSectionRef = useRef<HTMLDivElement>(null);
    const infoSectionRef = useRef<HTMLDivElement>(null);
    const graphicsSectionRef = useRef<HTMLDivElement>(null);

    // 현재 활성화된 버튼 상태
    const [activeButton, setActiveButton] = useState('Types');

    // 스크롤 위치에 따라 `activeButton` 업데이트
    const handleScroll = () => {
        if (neuronSectionRef.current && infoSectionRef.current && graphicsSectionRef.current) {
            const neuronTop = neuronSectionRef.current.offsetTop;
            const infoTop = infoSectionRef.current.offsetTop;
            const graphicsTop = graphicsSectionRef.current.offsetTop;
            const scrollPosition = isMobile()
                ? window.scrollY + window.innerHeight / 4
                : window.scrollY + window.innerHeight / 2;

            // 현재 스크롤 위치에 따라 activeButton 설정
            if (scrollPosition >= graphicsTop) {
                setActiveButton('Graphics');
            } else if (scrollPosition >= infoTop) {
                setActiveButton('Info');
            } else if (scrollPosition >= neuronTop) {
                setActiveButton('Neuron');
            }
        }
    };

    // 섹션 이동 함수
    const scrollToSection = (section: string) => {
        let sectionRef;
        switch (section) {
            case 'Neuron':
                sectionRef = neuronSectionRef;
                break;
            case 'Info':
                sectionRef = infoSectionRef;
                break;
            case 'Graphics':
                sectionRef = graphicsSectionRef;
                break;
            default:
                return;
        }
        // 해당 섹션으로 부드럽게 스크롤 이동
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 없는 유형으로 직접 접근하면 이미지 로드가 실패하므로 홈으로 돌려보낸다
    if (!isValidResultType(resultType)) {
        return <Navigate to="/" replace />;
    }

    return (
        <PageWrapper>
            <TopNavigation />
            <TypeLogo type={resultType} />

            {/* 스크롤 이동과 activeButton 전달 */}

            {/* 각 섹션에 ref 할당 */}
            <TypeIndexContent>
                <MiddleNavigationBar
                    scrollToSection={scrollToSection}
                    activeButton={activeButton}
                    name={name}
                    type={resultType}
                />
                <NeuronSection ref={neuronSectionRef}>
                    <TypeNeuron type={resultType} />
                    <TypeTitle name={name} type={resultType} />
                </NeuronSection>
                <TypeStructure type={resultType} />

                <div ref={infoSectionRef}>
                    <TypeMainContent>
                        <ContentWrapper>
                            <IndexText>'Type{resultType}'에 대하여</IndexText>
                            <TypeContentText type={resultType} />
                        </ContentWrapper>
                        <div ref={graphicsSectionRef} style={{ width: '100%' }}>
                            <GraphicContainer type={resultType} />
                        </div>
                    </TypeMainContent>
                </div>
            </TypeIndexContent>
        </PageWrapper>
    );
};

export default TestResultPage;

const NeuronSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10em;
    box-sizing: border-box;
    @media (max-width: 1023px) {
        gap: 5em;
    }
`;

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding-top: 7em;
`;

const TypeIndexContent = styled.div`
    z-index: 2;
    background: #070707;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15em;
    overflow: visible;
    @media (max-width: 1023px) {
        gap: 5em;
    }
`;
const TypeMainContent = styled.div`
    background: #ffffff;
    width: 100%;
    border-radius: 3.125em 3.125em 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 10em;
    align-items: center;
    position: relative;
    padding-top: 10em;
    box-sizing: border-box;
    @media (max-width: 1023px) {
        font-size: 0.8125em;
        width: 80%;
        gap: 5em;
    }
`;

const IndexText = styled.div`
    color: #070707;
    font-size: 3.5em;
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 2em;
    }
`;
