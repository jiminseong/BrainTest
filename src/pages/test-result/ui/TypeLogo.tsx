import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TypeLogoImageProps {
    logoUrl: string;
}

const TypeLogo = ({ type }: { type: number }) => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        // 비동기 import로 이미지 로드
        import(`../../../assets/images/typeLogo/type_${type}_icon.webp`)
            .then((module) => setLogoUrl(module.default))
            .catch(() => {
                // 로드 실패 시 기본 이미지 사용
                import('../../../assets/images/typeLogo/type_1_icon.webp').then((module) => setLogoUrl(module.default));
            });
    }, [type]);

    // 로딩 중인 경우 대체 텍스트 표시
    if (!logoUrl) return <div>Loading...</div>;

    return <TypeLogoImage logoUrl={logoUrl} />;
};

export default TypeLogo;

const TypeLogoImage = styled.div<TypeLogoImageProps>`
    min-width: 30%; // 컨테이너 너비
    min-height: 90%; // 컨테이너 높이
    color: #ffffff;
    font-size: 5em;
    background-image: url(${(props) => props.logoUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    @media (max-width: 1023px) {
        min-width: 60%;
        min-height: 50%;
    }
`;
