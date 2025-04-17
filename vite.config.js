import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // external: ['three'],  // 'three'를 외부 모듈로 처리하지 않도록 주석 처리하거나 제거
    },
    assetsInclude: ['**/*.gltf', '**/*.glb'],  // glb 파일도 포함하도록 설정
  },
});
