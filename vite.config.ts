import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import FullReload from 'vite-plugin-full-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import removeConsole from 'vite-plugin-svelte-console-remover';

const isProduction = process.env.NODE_ENV === "production";
console.log("Production build: " + isProduction)

export default defineConfig({
    clearScreen: false,
    plugins: [
        // FullReload([
        //     // "src/**/*.{js,ts,scss,svelte}"
        //     "src/**/*.{scss}",
        //     "src/lib/stores/*.*",
        //     "src/**/ComfyApp.{ts,svelte}"
        // ]),
        isProduction && removeConsole(),
        svelte(),
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
        include: ['litegraph/packages/tests/src/main.ts']
    }
});
