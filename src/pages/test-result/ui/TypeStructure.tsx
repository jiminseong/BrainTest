import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypeStructure = ({ type }: { type: number }) => {
    const [structureUrl, setStructureUrl] = useState<string | null>(null);

    useEffect(() => {
        // 비동기 import로 이미지 로드
        import(`../../../assets/images/typeStructure/type_${type}_word.webp`)
            .then((module) => setStructureUrl(module.default))
            .catch(() => {
                // 로드 실패 시 기본 이미지 사용
                import('../../../assets/images/typeStructure/type_2_word.webp').then((module) =>
                    setStructureUrl(module.default),
                );
            });
    }, [type]);

    // 로딩 중인 경우 대체 텍스트 표시
    if (!structureUrl) return <div>Loading...</div>;

    return (
        <ImageWrapper>
            <NeuronImage src={structureUrl} alt="Structure" />
        </ImageWrapper>
    );
};

export default TypeStructure;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const NeuronImage = styled.img`
    width: 50%;
`;
