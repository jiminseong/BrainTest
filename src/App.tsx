import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import TestContentPage from './pages/test-content/TestContentPage';
import CautionPage from './pages/caution/CautionPage';
import TestResultPage from './pages/test-result/TestResultPage';
import PrintPage from './pages/print/PrintPage';
import SavePage from './pages/save/SavePage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/caution" element={<CautionPage />} />
            <Route path="/test/content" element={<TestContentPage />} />
            <Route path="/test/result/:type/:name" element={<TestResultPage />} />
            <Route path="/save/:type/:name" element={<SavePage />} />
            <Route path="/print/:type/:name" element={<PrintPage />} />
        </Routes>
    );
}

export default App;
