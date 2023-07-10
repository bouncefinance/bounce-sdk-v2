import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'
import inspect from 'vite-plugin-inspect'
export default defineConfig({
	resolve: {
		alias: {
			'~pages/': `${path.join(__dirname, 'pages')}/`,
			'@bouncefinance/ui': path.resolve(__dirname, '../ui'),
		},
	},
	plugins: [
		inspect(),
		react(),
		pages({
			pagesDir: path.join(__dirname, 'pages'),
			useHashRouter: false,
			pageStrategy: new DefaultPageStrategy({
				extraFindPages: async (pagesDir, helpers) => {
					const basePath = path.join(__dirname, 'pages')
					console.log('🚀 ~ basePath:', basePath)

					// if (String(process.env.SHOW_ALL_COMPONENT_DEMOS) === 'true') {
					// 	// show all component demos during dev
					// 	// put them in page `/components/demos/${componentName}`
					// 	helpers.watchFiles(basePath, '**/demos/**/*.{[tj]sx,md?(x)}', async (file, api) => {
					// 		const { relative, path: absolute } = file
					// 		const match = relative.match(/(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/)
					// 		if (!match) throw new Error('unexpected file: ' + absolute)
					// 		const [_, componentName, demoName] = match
					// 		const pageId = `/components/demos/${componentName}`
					// 		// set page data
					// 		const runtimeDataPaths = api.getRuntimeData(pageId)
					// 		// the ?demo query will wrap the module with useful demoInfo
					// 		runtimeDataPaths[demoName] = `${absolute}?demo`
					// 	})
					// }

					// find all component README
					helpers.watchFiles(basePath, '**/README.md?(x)', async (file, api) => {
						const { relative, path: absolute } = file
						const match = relative.match(/(.*)\/README\.mdx?$/)
						if (!match) throw new Error('unexpected file: ' + absolute)
						const [_, componentName] = match
						console.log('🚀 ~ componentName:', componentName)
						// const pageId = `/components/${
						// 	componentName.includes('/') ? componentName.split('/').at(-1) : componentName
						// }`
						const pageId = `/components/demos/${componentName}`
						console.log('🚀 ~ pageId:', pageId)
						// set page data
						const runtimeDataPaths = api.getRuntimeData(pageId)
						runtimeDataPaths.main = absolute
						// set page staticData
						const staticData = api.getStaticData(pageId)
						staticData.main = await helpers.extractStaticData(file)
						console.log('🚀 ~ staticData:', staticData['/users'])
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
	build: {
		minify: false,
	},
})
