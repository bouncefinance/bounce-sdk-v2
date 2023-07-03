import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import typescript from '@rollup/plugin-typescript'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
// import presetAttributify from '@unocss/preset-attributify'
// https://vitejs.dev/config/
const resolvePath = (str: string) => resolve(__dirname, str)
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('🚀 ~ env', env)
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    },
    plugins: [react()],
    // 开发或生产环境服务的公共基础路径,可以是/foo/、https://foo.com/、空字符串或./(用于开发环境) 几种类型，这个选项也可以通过命令行参数指定（例：vite build --base=/my/public/path/）
    base: env.VITE_BASE_URL,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    build: {
      // sourcemap:true
      lib: {
        formats: ['es'],
        entry: resolve(__dirname, 'src/index.ts'), // 指定组件编译入口文件
        name: 'lib',
        fileName: format => `index.${format}.js`
      }, // 库编译模式配置
      minify: 'esbuild',
      outDir: 'lib',
      rollupOptions: {
        input: {
          lib: resolvePath('src/index.ts')
        },
        plugins: [
          svgr(),
          // dts({ tsconfigPath: './tsconfig.json', include: 'src/index.ts' })
          typescript({
            tsconfig: './tsconfig.json'
            // target: 'es2015', // 这里指定编译到的版本，
            // rootDir: resolvePath('lib'),
            // declaration: true,
            // declarationDir: resolvePath('lib'),
            // allowSyntheticDefaultImports: true
          })
          // postcss({ extract: 'css/index.css' }),
        ],
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          '@ant-design/icons',
          'ahooks',
          'antd',
          'dayjs',
          'react',
          'react-dom',
          'react-router-dom',
          'react-transition-group',
          'styled-components',
          /^@mui/
        ],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {}
          // dir: 'dist',
          // format: 'esm',
          // preserveModules: true, // 保留模块结构
          // preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
          // inlineDynamicImports: false,
        }
      }
    },
    server: {
      port: 3007
    }
  })
}
