import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    clearScreen: false,
    plugins: [
        tsconfigPaths({loose: true}),
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
