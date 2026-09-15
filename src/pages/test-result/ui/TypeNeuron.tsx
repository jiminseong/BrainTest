import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypeNeuron = ({ type }: { type: number }) => {
    const [neuronUrl, setNeuronUrl] = useState<string | null>(null);

    useEffect(() => {
        // 비동기 import로 이미지 로드
        import(`../../../assets/images/typeNeuron/type${type}_neuron.webp`)
            .then((module) => setNeuronUrl(module.default))
            .catch(() => {
                // 로드 실패 시 기본 이미지 사용
                import('../../../assets/images/typeNeuron/type1_neuron.webp').then((module) =>
                    setNeuronUrl(module.default),
                );
            });
    }, [type]);

    // 로딩 중인 경우 대체 텍스트 표시
    if (!neuronUrl) return <div>Loading...</div>;

    return (
        <ImageWrapper>
            <NeuronImage src={neuronUrl} alt={`Neuron type ${type}`} />
        </ImageWrapper>
    );
};

export default TypeNeuron;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const NeuronImage = styled.img`
    width: 60%;
    max-height: 900px;
`;
