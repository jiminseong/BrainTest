import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import firstUrl from '../../../assets/images/firstLogo.webp';
import secondUrl from '../../../assets/images/secondLogo.webp';
import thirdUrl from '../../../assets/images/thirdLogo.webp';

interface PageLogoProps {
    page: number;
    width: string;
    mobileWidth: string;
    rotate?: boolean; // rotate prop 추가, 기본값은 false
}

const PageLogo: React.FC<PageLogoProps> = ({ width, page, mobileWidth, rotate = false }) => {
    return (
        <>
            {page === 1 && <Logo width={width} mobileWidth={mobileWidth} rotate={rotate} src={firstUrl} />}
            {page === 2 && <Logo width={width} mobileWidth={mobileWidth} rotate={rotate} src={secondUrl} />}
            {page === 3 && <Logo width={width} mobileWidth={mobileWidth} rotate={rotate} src={thirdUrl} />}
        </>
    );
};

export default PageLogo;

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Logo = styled.img<{ width: string; rotate: boolean; mobileWidth: string }>`
    width: ${(props) => props.width};
    animation: ${(props) =>
        props.rotate
            ? css`
                  ${rotateAnimation} 4s linear
              `
            : 'none'};
    @media (max-width: 1023px) {
        width: ${(props) => props.mobileWidth};
    }
`;
