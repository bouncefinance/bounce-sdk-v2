import React, { PropsWithChildren } from 'react'
import { createTheme, defaultSideNavs, useThemeCtx } from 'vite-pages-theme-doc'

import Component404 from './404'
import { Spin } from 'antd'
import 'uno.css'
import '../styles/index.less'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'
import { BounceProvider } from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default createTheme({
	logoLink(ctx) {
		let prefix = ctx.resolvedLocale.localeKey
		if (!prefix || prefix === 'en') {
			return '/'
		}
		return '/' + prefix
	},
	logo: (
		<div className="flex gap-2 items-center">
			<img
				className="w-6"
				src="https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F841106785-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FNyEMlVfYL7xZhAA9xrd7%252Ficon%252F7CzH9xDxIQqjOJkvzUug%252Ftoken.png%3Falt%3Dmedia%26token%3De5ca3bbb-e96a-4574-b8c4-901cfc9c51d9"
			/>
			<span className="text-5 hidden md:block">Bounce Finance SDK</span>
		</div>
	),
	AppWrapper: (props?: PropsWithChildren) => {
		const { pathname } = useLocation()
		const theme = useThemeCtx()
		const { resolvedLocale } = theme
		useUpdateEffect(() => {
			ReactGA.event('change_language', {
				event_label: resolvedLocale.localeKey,
			})
		}, [resolvedLocale.localeKey])
		return (
			<BounceProvider getLibrary={(provider) => new Web3Provider(provider, 'any')}>
				{props?.children}
			</BounceProvider>
		)
	},
	i18n: {
		defaultLocale: 'en',
		topBarLocaleSelector: true,
		locales: {
			en: {
				label: 'English',
				lang: 'en', // this will be set as the `lang` attribute on <html>
				routePrefix: '/',
			},
			zh: {
				label: '中文',
				lang: 'zh-CN',
				routePrefix: '/zh',
			},
		},
	},
	// TopBarExtra: (d) => {
	// 	const navigate = useNavigate()
	// 	const theme = useThemeCtx()
	// 	console.log('🚀 ~ theme:', theme)
	// 	const isEN = theme.resolvedLocale.localeKey === 'en'
	// 	return (
	// 		<Button
	// 			type="primary"
	// 			ghost
	// 			onClick={() => {
	// 				window.location.href = isEN
	// 					? '/zh' + theme.resolvedLocale.pagePathWithoutLocalePrefix
	// 					: theme.resolvedLocale.pagePathWithoutLocalePrefix!
	// 			}}
	// 		>
	// 			{isEN ? '中文' : 'English'}
	// 		</Button>
	// 	)
	// },
	topNavs: ({ resolvedLocale }) => {
		const { localeKey } = resolvedLocale
		// return config according to resolvedLocale
		return {
			en: [
				{
					label: 'Home',
					path: '/',
					activeIfMatch: {
						// match all first-level paths
						path: '/:foo',
						end: true,
					},
				},
				// // { label: 'Users', path: '/users', activeIfMatch: '/users' },
				// {
				// 	label: 'Core',
				// 	path: '/core/getting-started',
				// 	activeIfMatch: '/core',
				// },
				{
					label: 'Hooks',
					path: '/hooks/getting-started',
					activeIfMatch: '/hooks',
				},
				{
					label: 'Components',
					path: '/components/getting-started',
					activeIfMatch: '/components',
				},

				// {
				// 	subMenu: 'Links',
				// 	children: [
				// 		{
				// 			label: 'Resources',
				// 			path: '/resources',
				// 		},
				// 		{
				// 			label: 'Vite',
				// 			href: 'https://vitejs.dev/',
				// 		},
				// 		{
				// 			label: 'Ant Design',
				// 			href: 'https://ant.design/',
				// 		},
				// 	],
				// },
			],
			zh: [
				{
					label: '首页',
					path: '/zh',
					activeIfMatch: {
						// match all first-level paths
						path: '/zh/:foo',
						end: true,
					},
				},
				// { label: '用户', path: '/zh/users', activeIfMatch: '/users' },
				{
					label: '组件',
					path: '/zh/components/getting-started',
					activeIfMatch: '/zh/components',
				},
				{
					label: 'Hooks',
					path: '/zh/hooks/getting-started',
					activeIfMatch: '/zh/hooks',
				},
				// {
				// 	label: 'Core',
				// 	path: '/zh/core/getting-started',
				// 	activeIfMatch: '/zh/core',
				// },
				// {
				// 	subMenu: '链接',
				// 	children: [
				// 		{
				// 			label: '资源',
				// 			path: '/zh/resources',
				// 		},
				// 		{
				// 			label: 'Vite',
				// 			href: 'https://vitejs.dev/',
				// 		},
				// 		{
				// 			label: 'Ant Design',
				// 			href: 'https://ant.design/',
				// 		},
				// 	],
				// },
			],
		}[localeKey!]
	},
	sideNavs: (ctx) => {
		// dont render side menu in home page
		if (ctx.loadState.routePath === '/' || ctx.loadState.routePath === '/zh') return null
		return defaultSideNavs(ctx, {
			groupConfig: {
				components: {
					demos: {
						label: 'Demos (dev only)',
						order: -1,
					},
					general: {
						label: 'General',
						order: 1,
					},
					fixedSwapAuction: {
						label: 'Fixed Swap Auction',
						order: 2,
					},
					randomSelectionAuction: {
						label: 'Random Selection Auction',
						order: 2,
					},
					englishAuction: {
						label: 'English Auction',
						order: 2,
					},
					'data-display': {
						label: 'Data Display',
						order: 2,
					},
					others: {
						label: 'Others',
						order: 999,
					},
				},
			},
		})
	},
	Component404,
	ComponentLoading: () => (
		<div className="flex-center pt-20">
			<Spin size="large" />
		</div>
	),
})
