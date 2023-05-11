import sveltePreprocess from "svelte-preprocess";
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url))
const scssPath = `./src/scss`

const config = {
  preprocess: [
    sveltePreprocess({
      typescript: {
        compilerOptions: {
          debug: true,
        }
      },
      scss: {
        prependData: `@import '${scssPath}/global.scss';`
      }
    })
  ]
};

export default config;
