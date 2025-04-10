import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined, // 或 '200.html'，如果你需要 fallback 支持
			precompress: false,
			strict: true
		})
	},
	preprocess: preprocess({
		postcss: true // 如果你用到 PostCSS，可根据需要配置其他选项
	})
};

export default config;
