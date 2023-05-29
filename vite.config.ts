import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import FullReload from 'vite-plugin-full-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import removeConsole from 'vite-plugin-svelte-console-remover';
import glsl from 'vite-plugin-glsl';
import { execSync } from "child_process"
import { visualizer } from "rollup-plugin-visualizer";

const isProduction = process.env.NODE_ENV === "production";
console.log("Production build: " + isProduction)

const commitHash = execSync('git rev-parse HEAD').toString().trim();
console.log("Commit: " + commitHash)

export default defineConfig({
    define: {
        "__GIT_COMMIT_HASH__": JSON.stringify(commitHash)
    },
    clearScreen: false,
    base: "./",
    plugins: [
        // FullReload([
        //     // "src/**/*.{js,ts,scss,svelte}"
        //     "src/**/*.{scss}",
        //     "src/lib/stores/*.*",
        //     "src/**/ComfyApp.{ts,svelte}"
        // ]),
        isProduction && removeConsole(),
        glsl(),
        svelte(),
        visualizer(),
        viteStaticCopy({
            targets: [
                {
                    src: 'bin/serve.py',
                    dest: './'
                },
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
        minify: isProduction,
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
        environment: 'jsdom',
        deps: {
            inline: [/^svelte/, /^@floating-ui/, /dist/, "skeleton-elements", "mdn-polyfills", "loupe"]
        },
        include: [
            'litegraph/packages/tests/src/main.ts',
            'src/tests/main.ts'
        ]
    }
});
