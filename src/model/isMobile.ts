/**
 * 모바일 여부를 감지한다.
 *
 * 원래 TestContentPage에서 export하고 있었는데, 결과·프린트 페이지가 이 함수
 * 하나 때문에 TestContentPage 모듈 전체(html2canvas·react-to-print 포함)를
 * 번들에 끌어들이고 있었다. 라우트 코드 스플리팅이 먹히도록 분리했다.
 */
export const isMobile = () => {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
};
