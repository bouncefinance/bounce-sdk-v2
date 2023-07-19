import { FC } from 'react'
import MuiThemeProvider from './context'
import { Provider } from 'react-redux'
import store from '@/state'

export * from './context'
export * from './options/color'
export * from './components'

export const withBounceTheme = <T,>(Children: FC<T>) => {
	return (props: T) => {
		return (
			<MuiThemeProvider>
				<Provider store={store}>
					{/* @ts-ignore */}
					<Children {...props} />
				</Provider>
			</MuiThemeProvider>
		)
	}
}
