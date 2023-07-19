import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { PropsWithChildren } from 'react'
import { NetworkContextName } from './constants'
import { getNetworkLibrary } from './connectors'
import { InitialState } from './InitialState'

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
				<InitialState>{children}</InitialState>
			</Web3ProviderNetwork>
		</Web3ReactProvider>
	)
}
