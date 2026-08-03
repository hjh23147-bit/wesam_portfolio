import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [
        react(),
        glsl(),
    ],
    server: {
        port: 5173,
        host: true,
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/three/')) return 'three';
                    if (id.includes('@react-three/fiber') || id.includes('@react-three/drei')) return 'r3f';
                    if (id.includes('@react-three/postprocessing') || id.includes('node_modules/postprocessing/')) return 'postprocessing';
                    if (id.includes('node_modules/gsap/')) return 'gsap';
                },
            },
        },
    },
    assetsInclude: ['**/*.glsl', '**/*.vert', '**/*.frag'],
});
