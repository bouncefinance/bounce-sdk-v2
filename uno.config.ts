import presetUno from '@unocss/preset-uno'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirective from '@unocss/transformer-directives'
import { defineConfig, UserConfig } from 'unocss'
/**
 * 基础uno configs
 */
const baseUnoConfig: UserConfig = defineConfig({
	presets: [presetUno()],
	rules: [
		[
			/^ellipsis-(\d+)$|^ellipsis$/,
			([_, d]) => {
				if (d) {
					return {
						display: '-webkit-box',
						overflow: 'hidden',
						'word-break': 'break-all',
						'-webkit-line-clamp': d,
						'-webkit-box-orient': 'vertical',
					}
				}
				return {
					'text-overflow': 'ellipsis',
					'white-space': 'nowrap',
					'word-break': 'break-all',
					overflow: 'hidden',
				}
			},
		],
		[
			/^animation-delay-(\d+)$/,
			([_, d]) => ({
				'animation-delay': d + 'ms',
			}),
		],
		[
			/^animation-duration-(\d+)$/,
			([_, d]) => ({
				'animation-duration': d + 'ms',
			}),
		],
		// [
		//   /^enter-(x|y)$|^-enter-(x|y)$/,
		//   ([_, d]) => {
		//     console.log('🚀 ~ ddsgs', d)
		//     return d
		//   },
		// ],
	],
	shortcuts: {
		// shortcuts to multiple utilities
		'flex-center': 'flex justify-center items-center',
		'common-border': 'b b-solid b-#e7e7e7',
		'container-lg': 'rounded-5 p-5',
		'container-md': 'rounded-3 p-4',
		'container-sm': 'rounded-2.5 p-2',
		'common-label': 'text-2.5 c-#838385',
	},
	theme: {
		colors: {
			primary: 'var(--color-primary)',
			success: 'var(--color-success)',
			error: 'var(--color-error)',
			warning: 'var(--color-warning)',
			content: 'var(--color-content)',
			bg: 'var(--color-bg)',
		},
		height: {},
	},
	transformers: [transformerVariantGroup(), transformerDirective()],
	safelist: [],
})

export default baseUnoConfig
