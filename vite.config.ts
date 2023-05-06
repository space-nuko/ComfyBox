import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import FullReload from 'vite-plugin-full-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    clearScreen: false,
    plugins: [
        FullReload(["src/**/*.{js,ts,svelte}"]),
        svelte(), ,
        viteStaticCopy({
            targets: [
                {
                    src: 'bin/run.sh',
                    dest: './'
                },
                {
                    src: 'bin/run.bat',
                    dest: './'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '$lib': resolve(__dirname, './src/lib'),
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                mobile: resolve(__dirname, 'mobile/index.html')
            }
        },

    },
    server: {
        port: 3000,

        // hmr: {
        //   clientPort: 443,
        // },
        // fs: {
        //     allow: [
        //         "src",
        //         "mobile",
        //         "gradio",
        //         "litegraph",
        //         "node_modules",
        //     ]
        // }
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
