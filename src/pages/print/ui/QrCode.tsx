import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';

interface QrCodeProps {
    type: number;
    name: string;
}

// VITE_URL이 없으면 현재 접속한 주소를 그대로 사용한다 (프리뷰·프로덕션 모두 동작)
const getBaseUrl = () => import.meta.env.VITE_URL || window.location.origin;

const QrCode: React.FC<QrCodeProps> = ({ type, name }) => {
    const url = `${getBaseUrl()}/save/${type}/${encodeURIComponent(name)}`;

    return (
        <QrCodeWrapper>
            <QRCodeSVG bgColor="transparent" value={url} />
            <Text>
                QR 코드를 이용해
                <br />
                나의 유형을 간직해보세요.
            </Text>
        </QrCodeWrapper>
    );
};

export default QrCode;

const QrCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25em;
    height: auto;
`;
const Text = styled.div`
    color: #070707;
    text-align: center;
    font-size: 1.225em;
    font-weight: 700;
`;
