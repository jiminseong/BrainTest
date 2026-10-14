/**
 * GA4 연동.
 *
 * 측정 ID는 .env.production의 VITE_GA_ID에서만 들어온다. 개발 서버(npm run dev)에서는
 * 값이 없어서 스크립트 자체를 안 불러오고, 아래 함수들도 아무 일도 하지 않는다.
 *
 * 결과·저장·프린트 URL 마지막 칸에는 사용자가 입력한 이름이 들어간다.
 * GA는 모든 이벤트에 현재 주소(page_location)를 실어 보내므로, 주소를 직접 지정해
 * 이름을 지운 뒤 보낸다. 페이지뷰도 같은 이유로 GA 자동 수집 대신 여기서 보낸다.
 */

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

// /test/result/3/홍길동 → /test/result/3
const NAMED_PATH = /^(\/(?:test\/result|save|print)\/[^/]+)\/[^/]+\/?$/;

export const stripName = (pathname: string) => pathname.replace(NAMED_PATH, '$1');

export const initAnalytics = () => {
    if (!GA_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    // gtag.js는 arguments 객체 그대로를 받아야 동작한다 (배열로 넣으면 무시됨)
    window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
};

export const trackPageView = (pathname: string) => {
    if (!GA_ID) return;

    const pageLocation = `${location.origin}${stripName(pathname)}`;
    window.gtag('set', { page_location: pageLocation });
    window.gtag('event', 'page_view', { page_location: pageLocation });
};

type AnalyticsEvent =
    | { name: 'test_start' }
    | { name: 'test_complete'; params: { result_type: number } }
    | { name: 'result_save'; params: { result_type: number; method: 'print' | 'image' } };

export const trackEvent = (event: AnalyticsEvent) => {
    if (!GA_ID) return;

    window.gtag('event', event.name, 'params' in event ? event.params : {});
};
