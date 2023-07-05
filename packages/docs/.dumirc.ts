import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@Bounce/sdk',
    logo: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F841106785-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FNyEMlVfYL7xZhAA9xrd7%252Ficon%252F7CzH9xDxIQqjOJkvzUug%252Ftoken.png%3Falt%3Dmedia%26token%3De5ca3bbb-e96a-4574-b8c4-901cfc9c51d9',
  },
  clickToComponent: { editor: 'vscode' },
  chainWebpack(config) {
    config.resolve.alias.set(
      '@testpkgs/bounce-ui',
      resolve(__dirname, '../ui'),
    );

    console.log(config.resolve.alias.get('@testpkgs/bounce-ui'));

    // console.log(
    //   "🚀 ~ resolve(__dirname, '../ui/lib'):",
    //   resolve(__dirname, 'packages/ui/lib'),
    //   console.log('🚀 ~ __dirname:', __dirname),
    // );
    return config;
  },
});
