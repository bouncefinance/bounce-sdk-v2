import { FC, PropsWithChildren, useEffect } from 'react'
import { useActiveWeb3React } from './hooks'
import { network } from './connectors'
interface InitialStateProps {}
export const InitialState: FC<PropsWithChildren<InitialStateProps>> = ({ children }) => {
	const { activate, active, connector } = useActiveWeb3React()

	useEffect(() => {
		if (!active && activate) {
			activate(connector ?? network)
		}
	}, [activate, connector])

	return <>{children}</>
}
