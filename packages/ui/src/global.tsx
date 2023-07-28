import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { createContext, PropsWithChildren } from 'react'
import { NetworkContextName } from './constants'
import { getNetworkLibrary } from './connectors'
import { InitialState } from './InitialState'
import { FC } from 'react'
import { createDispatchHook, createSelectorHook, createStoreHook, Provider } from 'react-redux'
import store from '@/state'
import { MuiThemeProvider } from './themes'
import { LoginModal } from './components/Header/LoginModal'

const MyContext = createContext<any>(null)

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
export const BounceProvider = ({
	getLibrary,
	children,
}: PropsWithChildren<
	Parameters<typeof Web3ReactProvider>[0] & {
		theme?: {
			fontFamily?: string
		}
	}
>) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ProviderNetwork getLibrary={getNetworkLibrary}>
				<Provider store={store} context={MyContext}>
					<LoginModal />
					<InitialState>{children}</InitialState>
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
