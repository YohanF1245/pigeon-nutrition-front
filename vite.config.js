import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        host: '0.0.0.0',
        port: 3000,
        fs: {
            allow: ['..']
        },
        proxy: {
            '/api': {
                target: process.env.BACKEND_URL || 'http://pigeon-nutrition-back-backend-1:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}); 