import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
// import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import typescript from '@rollup/plugin-typescript'
import nodePolyfills from 'rollup-plugin-node-polyfills'
// import typescript from 'rollup-plugin-typescript2'
// import ttypescript from 'ttypescript'
// import presetAttributify from '@unocss/preset-attributify'
// https://vitejs.dev/config/
const resolvePath = (str: string) => resolve(__dirname, str)
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	console.log('🚀 ~ env', env)
	return defineConfig({
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				// This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
				// see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
				// util: 'rollup-plugin-node-polyfills/polyfills/util',
				// sys: 'util',
				events: 'rollup-plugin-node-polyfills/polyfills/events',
				stream: 'rollup-plugin-node-polyfills/polyfills/stream',
				path: 'rollup-plugin-node-polyfills/polyfills/path',
				querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
				// global: 'rollup-plugin-node-polyfills/polyfills/global',
				// punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
				// url: 'rollup-plugin-node-polyfills/polyfills/url',
				// string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
				// http: 'rollup-plugin-node-polyfills/polyfills/http',
				// https: 'rollup-plugin-node-polyfills/polyfills/http',
				// os: 'rollup-plugin-node-polyfills/polyfills/os',
				// assert: 'rollup-plugin-node-polyfills/polyfills/assert',
				// constants: 'rollup-plugin-node-polyfills/polyfills/constants',
				// _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
				// _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
				// _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
				// _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
				// _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
				// timers: 'rollup-plugin-node-polyfills/polyfills/timers',
				// console: 'rollup-plugin-node-polyfills/polyfills/console',
				// vm: 'rollup-plugin-node-polyfills/polyfills/vm',
				// zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
				// tty: 'rollup-plugin-node-polyfills/polyfills/tty',
				// domain: 'rollup-plugin-node-polyfills/polyfills/domain',
				// 打开会后因为里面的代码用到了TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT 所以会报错global is not defined
				// buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
				// process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
			},
		},
		plugins: [react()],
		// 开发或生产环境服务的公共基础路径,可以是/foo/、https://foo.com/、空字符串或./(用于开发环境) 几种类型，这个选项也可以通过命令行参数指定（例：vite build --base=/my/public/path/）
		base: env.VITE_BASE_URL,
		define: {
			// By default, Vite doesn't include shims for NodeJS/
			// necessary for segment analytics lib to work
			// global: 'window',
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
		optimizeDeps: {
			esbuildOptions: {
				// Node.js global to browser globalThis
				define: {
					// global: 'globalThis',
				},
			},
		},
		build: {
			// sourcemap:true
			lib: {
				formats: ['es'],
				entry: resolve(__dirname, 'src/index.ts'), // 指定组件编译入口文件
				name: 'lib',
				fileName: (format) => `index.${format}.js`,
			}, // 库编译模式配置
			minify: 'esbuild',
			outDir: 'lib',
			rollupOptions: {
				input: {
					lib: resolvePath('src/index.ts'),
				},
				plugins: [
					svgr(),
					// dts({ tsconfigPath: './tsconfig.json', include: 'src/index.ts' })
					typescript({
						tsconfig: './tsconfig.json',
						// target: 'es2015', // 这里指定编译到的版本，
						// rootDir: resolvePath('lib'),
						// declaration: true,
						// declarationDir: resolvePath('lib'),
						// allowSyntheticDefaultImports: true
					}),
					// typescript({
					//   typescript: ttypescript,
					//   tsconfig: './tsconfig.json'
					//   // tsconfigDefaults: {
					//   //   compilerOptions: {
					//   //     plugins: [
					//   //       { transform: 'typescript-transform-paths' },
					//   //       {
					//   //         transform: 'typescript-transform-paths',
					//   //         afterDeclarations: true
					//   //       }
					//   //     ]
					//   //   }
					//   // }
					// })
					// postcss({ extract: 'css/index.css' }),
				],
				// 确保外部化处理那些你不想打包进库的依赖
				external: [
					'ahooks',
					'antd',
					'react',
					'react-dom',
					'react-router-dom',
					'styled-components',
					// /^@mui/,
					'moment',
					'bignumber.js',
				],
				output: {
					// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
					globals: {},
					// dir: 'dist',
					// format: 'esm',
					// preserveModules: true, // 保留模块结构
					// preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
					// inlineDynamicImports: false,
				},
			},
		},
		server: {
			port: 3007,
		},
	})
}
