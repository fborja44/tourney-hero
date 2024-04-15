import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve('src/renderer/src'),
				'@common': resolve('src/common'),
				'@redux': resolve('src/renderer/src/redux'),
				'@hooks': resolve('src/renderer/src/hooks'),
				'@utils': resolve('src/renderer/src/utils'),
				'@graphql': resolve('src/renderer/src/graphql')
			}
		},
		plugins: [react()]
	}
});
