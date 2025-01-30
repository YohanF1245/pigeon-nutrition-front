import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [sveltekit()],
    server: {
        host: '0.0.0.0',
        port: 3001,
        fs: {
            allow: ['..']
        },
        proxy: {
            '/api': {
                target: 'http://api:3000',
                changeOrigin: true,
                secure: false
            }
        }
    }
}); 