import { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { isValidResultType } from '../../model/resultType';
import styled from 'styled-components';
import { Button } from '../../component/button/Button';
import ResultLoading from '../test-content/ui/ResultLoading';

const SavePage = () => {
    const { type, name = '' } = useParams();
    const resultType = Number(type);
    const [ResultPng, setResultPng] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    const downloadImage = async () => {
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

    useEffect(() => {
        const loadImage = async () => {
            try {
                const module = await import(`../../assets/images/typeResultPng/type_${resultType}_bill.webp`);
                setResultPng(module.default);
            } catch (err) {
                console.error('PNG 로드 에러:', err);
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [resultType]);

    // 없는 유형으로 직접 접근하면 이미지 로드가 실패하므로 홈으로 돌려보낸다
    if (!isValidResultType(resultType)) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {loading ? (
                <ResultLoading content="결과를 불러오는 중입니다.." marginTop="10%" />
            ) : (
                <PageWrapper>
                    <RowWrapper>
                        <SaveButton onClick={downloadImage}>저장하기</SaveButton>
                        <SaveButton onClick={() => navigate('/')}>홈으로가기</SaveButton>
                    </RowWrapper>
                    <SaveContainer ref={imageRef}>
                        <Name>{name}님의 뇌유형은</Name>
                        {ResultPng && <StyledResultPng src={ResultPng} alt="결과 이미지" />}
                    </SaveContainer>
                </PageWrapper>
            )}
        </>
    );
};

export default SavePage;

const RowWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 2em;
    width: 50%;
    @media (max-width: 1023px) {
        width: 90%;
    }
`;

const SaveButton = styled(Button)`
    padding: 1em 1em;
    width: 100%;
    @media (max-width: 1023px) {
        font-size: 1em;
    }
`;

const PageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1em;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }
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

const Name = styled.div`
    position: absolute;
    font-size: 1.625em;
    font-weight: 800;
    left: 50%;
    top: 4%;
    color: #231815;
    transform: translate(-50%, -50%);
    @media (max-width: 390px) {
        font-size: 1em;
        font-weight: 800;
    }
    @media (max-width: 820px) {
        font-size: 1.125em;
        font-weight: 800;
    }
`;

const StyledResultPng = styled.img`
    width: 100%;
    height: 100%;
`;
