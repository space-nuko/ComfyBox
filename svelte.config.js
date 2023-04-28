import sveltePreprocess from "svelte-preprocess";

const config = {
  preprocess: [
    sveltePreprocess({
      typescript: {
        compilerOptions: {
          debug: true,
        }
      },
    })
  ]
};

export default config;
