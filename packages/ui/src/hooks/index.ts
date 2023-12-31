export * from './useApproveCallback'
export * from './useAuctionConfig'
export * from './useBladeDaoShare'
export * from './useBreakpoint'
export * from './useCertifiedTokenAddress'
export * from './useContract'
export * from './useCopyClipboard'
export * from './useCreateEnglishAuctionPool'
export * from './useCreateFixedSwap1155Pool'
export * from './useCreateFixedSwapPool'
export * from './useCurrentBlockTimestamp'
export * from './useDebounce'
export * from './useENSName'
export * from './useGasPrice'
export * from './useInterval'
export * from './useIsWindowVisible'
export * from './useLocationBlock'
export * from './useModal'
export * from './useNFTApproveAllCallback'
export * from './useNFTTokenBalance'
export * from './useOnClickOutside'
export * from './usePrevious'
export * from './useQueryParams'
export * from './useScroll'
export * from './useSocksBalance'
export * from './useSwitchNetwork'
export * from './useTimestampFromBlock'
export * from './useUploadGameScoreCrypto'
export * from './useWeb3Instance'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { injected } from '../connectors'
import { NetworkContextName } from '../constants'
import { ChainId } from '../constants/chain'
import { isInjectedConnected } from '@/utils/isInjectedConnectedPrev'
import { useMainContext } from '@/context'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
	chainId?: ChainId
} {
	const context = useWeb3ReactCore<Web3Provider>()

	const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
	const mainContext = useMainContext()
	// return docsContext
	return { ...(context.active ? context : contextNetwork), ...mainContext }
	// return docsContext || context.active ? context : contextNetwork
}

export function useEagerConnect() {
	const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
	const [tried, setTried] = useState(false)

	useEffect(() => {
		const isInjected = isInjectedConnected()
		if (!isInjected) {
			setTried(true)
			return
		}
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized) {
				activate(injected, undefined, true).catch(() => {
					setTried(true)
				})
			} else {
				if (isMobile && window.ethereum) {
					activate(injected, undefined, true).catch(() => {
						setTried(true)
					})
				} else {
					setTried(true)
				}
			}
		})
	}, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (active) {
			setTried(true)
		}
	}, [active])

	return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
	const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

	useEffect(() => {
		const { ethereum } = window

		if (ethereum?.on && !active && !error && !suppress) {
			const handleChainChanged = () => {
				// eat errors
				activate(injected, undefined, true).catch((error) => {
					console.error('Failed to activate after chain changed', error)
				})
			}

			const handleAccountsChanged = (accounts: string[]) => {
				if (accounts.length > 0) {
					// eat errors
					activate(injected, undefined, true).catch((error) => {
						console.error('Failed to activate after accounts changed', error)
					})
				}
			}

			ethereum.on('chainChanged', handleChainChanged)
			ethereum.on('accountsChanged', handleAccountsChanged)

			return () => {
				if (ethereum.removeListener) {
					ethereum.removeListener('chainChanged', handleChainChanged)
					ethereum.removeListener('accountsChanged', handleAccountsChanged)
				}
			}
		}
		return undefined
	}, [active, error, suppress, activate])
}
