import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
    plugins: [
        sveltekit(),
        FullReload(["src/**/*.{js,ts,svelte}"])
    ],
    build: {
        sourcemap: true,
    },
    server: {
        port: 3000,
        fs: {
            allow: ["./gradio"]
        }
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
