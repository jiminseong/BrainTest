import styled from 'styled-components';
import { BlueButton, RedButton } from '../../component/button/Button';
import { useNavigate } from 'react-router-dom';
import BacKButton from '../../component/button/NavigationButton';
import { useState } from 'react';
import MobileBr from '../../component/box/MobileBr';

const CautionPage = () => {
    const navigate = useNavigate();

    const cautionFirst = (
        <>
            이 검사는 다년간 쌓인 연구 결과와
            <MobileBr /> 임상 경험을 참고하여 만들어졌습니다.
            <br />
            <MobileBr />
            검사 결과는 일반적 특성을 나타내며,
            <MobileBr /> 의료 전문가의 평가나 치료를 대체할 수 없습니다.
            <br />
            자기보고식 검사는 장점도 있지만 한계도 있습니다.
            <br />
            <br />
            이 검사는 여러분의 건강에 대한
            <MobileBr /> 의료 전문가의 의학적 판단을 대체하기 위해서가 아니라,
            <br />
            <MobileBr />
            여러분에게 정보를 제공하고 <MobileBr />
            보다 나은 삶을 위해서 만들어졌습니다.
            <br />
            <br />
            또한, 어떠한 의학적 상태의
            <MobileBr /> 진단, 치료, 치유를 위한 것도 아니며,
            <br />
            <MobileBr />
            본인의 감정을 잘 나타내는 뇌 유형을
            <MobileBr /> 시각적으로 구체화하기 위해 만들어졌습니다.
            <br />
            <MobileBr />
            특정한 의학적 상태와 치료방법에 대해서는 <MobileBr />
            의료 전문가와 상의하시길 바랍니다.
        </>
    );

    const cautionSecond = (
        <>
            뇌 안에서 마주한 또 다른 ‘나’는
            <br />
            현실 세계에서 살아가고 있는 ‘나’라는 존재를
            <br />
            평화와 행복으로 이끌어 주는 역할을 합니다.
            <br />
            <br />
            다양한 상황을 해결하기 위한 방법을 선택하고
            <br />
            선택에 따른 결과 값을 확인하고 보관해 보세요.
            <br />
            <br />
            검사 시간은 5분 내외입니다.
        </>
    );

    const titleFirst = '의학적 주의사항';
    const titleSecond = '검사 및 시간 안내';

    const [agreeState, setAgreeState] = useState(false);
    const [cautionText, setCautionText] = useState(cautionFirst);
    const [cautionTitle, setCautionTitle] = useState(titleFirst);

    const handleCautionText = () => {
        setCautionText(cautionSecond);
        setCautionTitle(titleSecond);
        setAgreeState(true);
    };

    const handleBackButton = () => {
        if (agreeState) {
            setCautionText(cautionFirst);
            setCautionTitle(titleFirst);
            setAgreeState(false);
        } else {
            navigate('/');
        }
    };
    return (
        <PageWrapper>
            <BacKButton top="3em" mobileLeft="1em" left="3em" mobileTop="1.125em" onClick={() => handleBackButton()} />
            <ColumnWrapper>
                <Column>
                    <Title>{cautionTitle}</Title>
                    <CautionText>{cautionText}</CautionText>
                </Column>
                {agreeState ? (
                    <BlueButton onClick={() => navigate('/test/content')}>시작하기</BlueButton>
                ) : (
                    <RowWrapper>
                        <BlueButton onClick={() => handleCautionText()}>동의합니다</BlueButton>
                        <RedButton onClick={() => handleBackButton()}>동의하지 않습니다</RedButton>
                    </RowWrapper>
                )}
            </ColumnWrapper>
        </PageWrapper>
    );
};

export default CautionPage;

const Column = styled.div`
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1023px) {
        height: 90%;
    }
`;

const ColumnWrapper = styled(Column)`
    height: 60%;
    justify-content: space-between;
    @media (max-width: 1023px) {
        width: 80%;
        height: 80%;
    }
`;

const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
`;

const Title = styled.div`
    color: #666666;
    font-size: 2em;
    font-weight: 700;
    margin-bottom: 2em;
    @media (max-width: 1023px) {
        font-size: 1.6875em;
        margin-bottom: 1em;
    }
`;

const CautionText = styled.div`
    width: 100%;
    font-size: 0.9375em;
    text-align: center;
    color: #111;
    font-weight: 500;
    line-height: 2em;
    @media (max-width: 768px) {
        font-size: 0.9375em;
        line-height: 1.25em;
    }
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 8em;
    justify-content: center;

    @media (max-width: 1023px) {
        width: 100%;
        gap: 1em;
        justify-content: space-between;
    }
`;
