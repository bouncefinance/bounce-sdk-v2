import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'
import inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import baseUnoConfig from '../../uno.config'
export default defineConfig({
	resolve: {
		alias: {
			'@/': path.join(__dirname, 'src/'),
		},
	},
	plugins: [
		Unocss(baseUnoConfig),
		inspect(),
		react(),
		pages({
			pagesDir: path.join(__dirname, 'src/pages'),
			useHashRouter: false,
			pageStrategy: new DefaultPageStrategy({
				extraFindPages: async (pagesDir, helpers) => {
					const basePath = path.join(__dirname, 'src/pages')

					if (String(process.env.SHOW_ALL_COMPONENT_DEMOS) === 'true') {
						// show all component demos during dev
						// put them in page `/components/demos/${componentName}`
						helpers.watchFiles(basePath, '**/demos/**/*.{[tj]sx,md?(x)}', async (file, api) => {
							const { relative, path: absolute } = file
							const match = relative.match(/(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/)
							if (!match) throw new Error('unexpected file: ' + absolute)
							const [_, componentName, demoName] = match
							const pageId = `/components/demos/${componentName}`
							// set page data
							const runtimeDataPaths = api.getRuntimeData(pageId)
							// the ?demo query will wrap the module with useful demoInfo
							runtimeDataPaths[demoName] = `${absolute}?demo`
						})
					}

					// find all component README
					helpers.watchFiles(basePath, '**/README.md?(x)', async (file, api) => {
						const { relative, path: absolute } = file
						const match = relative.match(/(.*)\/README\.mdx?$/)
						if (!match) throw new Error('unexpected file: ' + absolute)
						const [_, componentName] = match
						// const pageId = `/components/${
						// 	componentName.includes('/') ? componentName.split('/').at(-1) : componentName
						// }`
						const pageId = `/components/demos/${componentName}`
						// set page data
						const runtimeDataPaths = api.getRuntimeData(pageId)
						runtimeDataPaths.main = absolute
						// set page staticData
						const staticData = api.getStaticData(pageId)
						staticData.main = await helpers.extractStaticData(file)
					})
				},
			}),
		}),
		{
			name: 'vite-plugin-test',
			load(id, options) {
				// console.log('🚀 ~ options:', options)
				// console.log('🚀 ~ id:', id)
			},
			transform(code, id, options) {
				// if (code.includes('router') || code.includes('Router')) {
				// 	console.log('🚀 ~ id:', id)
				// 	console.log('🚀 ~ code:', code)
				// }
			},
		},
	],

	ssr: {
		// should not external them in ssr build,
		// otherwise the ssr bundle will contains `require("my-button")`
		// which will result in error
		noExternal: [],
	},
	server: { port: 2000 },
	build: {
		minify: false,
		rollupOptions: {
			output: {
				// manualChunks 配置
				manualChunks: {
					// 将 React 相关库打包成单独的 chunk 中
					'react-vendor': ['react', 'react-dom'],
					// 将组件库的代码打包
					library: ['antd'],
				},
			},
		},
	},
})
