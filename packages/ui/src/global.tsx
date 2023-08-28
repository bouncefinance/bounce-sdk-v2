import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { createContext, ReactNode, useMemo } from 'react'
import { NetworkContextName } from './constants'
import { getNetworkLibrary } from './connectors'
import { InitialState } from './InitialState'
import { FC } from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from 'react-redux'
import store from '@/state'
import { MuiThemeProvider } from './themes'
import { IMainContext, MainContext } from './context'

const MyContext = createContext<any>(null)

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

export type BounceProviderProps = Parameters<typeof Web3ReactProvider>[0] & {
	children?: ReactNode
} & IMainContext

export const BounceProvider = ({ getLibrary, children, ...rest }: BounceProviderProps) => {
	const context = useMemo<IMainContext>(() => rest, [rest])
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ProviderNetwork getLibrary={getNetworkLibrary}>
				<Provider store={store} context={MyContext}>
					<MainContext.Provider value={context}>
						{/* <LoginModal /> */}
						<InitialState>{children}</InitialState>
					</MainContext.Provider>
				</Provider>
			</Web3ProviderNetwork>
		</Web3ReactProvider>
	)
}

export const withBounceTheme = <T,>(Children: FC<T>) => {
	return (props: T) => {
		return (
			<MuiThemeProvider>
				{/* @ts-ignore */}
				<Children {...props} />
			</MuiThemeProvider>
		)
	}
}
