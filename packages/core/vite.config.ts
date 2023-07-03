import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	console.log('🚀 ~ env', env)
	return defineConfig({
		resolve: {
			alias: [
				{
					find: /^~/,
					replacement: '',
				},
				{
					find: '@',
					replacement: resolve(__dirname, './src'),
				},
			],
		},
		// 开发或生产环境服务的公共基础路径,可以是/foo/、https://foo.com/、空字符串或./(用于开发环境) 几种类型，这个选项也可以通过命令行参数指定（例：vite build --base=/my/public/path/）
		base: env.VITE_BASE_URL,
		plugins: [
			react(),
			Unocss(),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[name]',

				/**
				 * 自定义插入位置
				 * @default: body-last
				 */
				// inject?: 'body-last' | 'body-first'
				/**
				 * custom dom id
				 * @default: __svg__icons__dom__
				 */
				customDomId: '__svg__icons__dom__',
			}),
			{
				name: 'singleHMR',
				handleHotUpdate({ modules, file }) {
					if (file.match(/xml$/)) return []
					modules.map((m) => {
						m.importedModules = new Set()
						m.importers = new Set()
					})

					return modules
				},
			},
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
		build: {
			// sourcemap:true
			// outDir: env.VITE_OUTDIR,
		},
		server: {
			port: 2001,
			host: false,
		},
	})
}
