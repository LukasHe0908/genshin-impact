import path from 'path';
import adapter from '@sveltejs/adapter-static'; // 改成 static adapter
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		appDir: 'internal',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		alias: {
			$post: path.resolve('./src/post')
		},
		prerender: {
			default: true
		}
	},
	preprocess: preprocess({ postcss: true })
};

export default config;
