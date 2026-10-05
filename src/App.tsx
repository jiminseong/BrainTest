import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 라우트별 코드 스플리팅.
 *
 * 이전에는 모든 페이지를 정적 import해서, 공유 링크로 들어오는 결과 페이지에도
 * 홈의 framer-motion과 테스트 페이지의 react-to-print까지 전부 따라왔다.
 * 가장 많이 공유되는 URL이 결과·저장 링크라 그쪽 초기 로드를 우선했다.
 */
const HomePage = lazy(() => import('./pages/home/HomePage'));
const TestContentPage = lazy(() => import('./pages/test-content/TestContentPage'));
const CautionPage = lazy(() => import('./pages/caution/CautionPage'));
const TestResultPage = lazy(() => import('./pages/test-result/TestResultPage'));
const PrintPage = lazy(() => import('./pages/print/PrintPage'));
const SavePage = lazy(() => import('./pages/save/SavePage'));

function App() {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/caution" element={<CautionPage />} />
                <Route path="/test/content" element={<TestContentPage />} />
                <Route path="/test/result/:type/:name" element={<TestResultPage />} />
                <Route path="/save/:type/:name" element={<SavePage />} />
                <Route path="/print/:type/:name" element={<PrintPage />} />
                {/* 존재하지 않는 경로는 빈 화면 대신 홈으로 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;

// 청크를 받는 찰나에 흰 화면이 깜빡이지 않도록 배경색만 채운다
const RouteFallback = styled.div`
    width: 100%;
    height: 100%;
    background-color: #070707;
`;
