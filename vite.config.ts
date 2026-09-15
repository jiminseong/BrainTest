import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), svgr()],
    optimizeDeps: {
        include: ['html2canvas'],
    },
    esbuild: {
        // 채점 로직·답변 배열이 콘솔로 새지 않도록 프로덕션 빌드에서만 제거
        drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    build: {
        chunkSizeWarningLimit: 1500,
    },
}));
