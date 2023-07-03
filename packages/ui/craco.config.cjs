/* eslint-env node */
const webpack = require('webpack')
const path = require('path')
const DtsPlugin = require('dts-webpack-plugin')

module.exports = {
  eslint: {
    enable: false
  },
  typescript: {
    enableTypeChecking: false
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: config => {
      const fallback = config.resolve.fallback || {}
      Object.assign(fallback, {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url')
      })
      config.resolve.fallback = fallback
      config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      ])
      config.experiments = {
        outputModule: true
      }
      config.output.filename = 'index.js'
      // config.output.library = 'YourLibraryName'
      config.output.libraryTarget = 'module'

      // 将构建目标设置为库
      // config.output.library = 'ui'
      // config.output.libraryTarget = 'module'

      // 将入口文件指向你想要打包的库文件
      config.entry = path.resolve(__dirname, 'src', 'index.ts')

      // 修改输出目录为 lib 文件夹
      config.output.path = path.resolve(__dirname, 'lib')
      config.resolve.extensions.push('.ts', '.tsx')

      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      })
      config.plugins = config.plugins || []
      config.plugins.push(
        new DtsPlugin({
          name: 'ui', // 库的名称，根据实际情况修改
          path: './lib', // 输出目录，根据实际情况修改
          exclude: /__tests__/ // 需要排除的文件夹或文件，根据实际情况修改
        })
      )
      return config
    }
  }
}
