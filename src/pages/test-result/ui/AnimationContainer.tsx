import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const AnimationContainer = ({ type, count, category }: { type: number; count: number; category: string }) => {
    const [IconSvg, setIconSvg] = useState<React.FC | null>(null); // 타입 정의 추가
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    // 그래픽 섹션은 화면 한참 아래에 있는데 SVG 13개(약 400KB)를 마운트 즉시 받고 있었다.
    // 뷰포트에 가까워질 때 받도록 미룬다. IntersectionObserver가 없으면 바로 받는다.
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setShouldLoad(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;
        import(`../../../assets/images/typeGraphic/type${type}_${category}_${count}.svg?react`)
            .then((module) => {
                setIconSvg(() => module.default);
            })
            .catch((err) => {
                console.error('SVG 로드 에러:', err);
            });
    }, [shouldLoad, type, category, count]);

    return (
        <StyledDiv ref={wrapperRef}>{IconSvg && <StyledIconSvg as={IconSvg} />}</StyledDiv>
    );
};

export default AnimationContainer;

const StyledIconSvg = styled.div`
    width: 100%;
    height: auto;
`;

/**
 * 호버 시 반시계로 한 바퀴 돌며 커지고, 벗어나면 그 자리에서 되감긴다.
 *
 * 이전에는 keyframes + `&:not(:hover)`를 썼는데 두 가지 문제가 있었다.
 * 1. 마우스를 올린 적 없는 아이콘도 마운트 직후 '되돌아가는' 애니메이션을 한 번 재생했다.
 *    (:not(:hover)가 처음부터 참이라 그래픽 섹션에 들어서면 전체가 한꺼번에 튀었다)
 * 2. animation은 중간에 끊어도 항상 끝 상태에서 다시 시작해서, 빠르게 스쳐 지나가면
 *    크기가 점프했다.
 * transition은 현재 값에서 이어서 되돌아가므로 두 문제가 함께 해결된다.
 */
const StyledDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 20px;
    transform: rotate(0deg) scale(1);
    transition: transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), background-color 0.55s ease-out;
    will-change: transform;

    &:hover {
        transform: rotate(-360deg) scale(2);
        background-color: #000;
        z-index: 10;
    }

    svg {
        width: 100%;
        height: 100%;
        color: #000;
        transition: color 0.55s ease-out;
    }

    &:hover svg {
        color: #fff;
    }

    /* 모션을 줄이도록 설정한 사용자에게는 회전·확대를 생략한다 */
    @media (prefers-reduced-motion: reduce) {
        transition: background-color 0.2s ease-out;
        &:hover {
            transform: none;
        }
    }
`;
