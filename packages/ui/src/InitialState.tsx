import { FC, PropsWithChildren, useEffect } from 'react'
import { useActiveWeb3React } from './hooks'
import { network } from './connectors'
interface InitialStateProps {}
export const InitialState: FC<PropsWithChildren<InitialStateProps>> = ({ children }) => {
	const data = useActiveWeb3React()
	console.log('🚀 ~ data:', data)
	const { activate, active, connector, deactivate } = data

	useEffect(() => {
		if (!active) {
			// activate(
			// 	connector ?? network,
			// 	(err) => {
			// 		console.log('🚀 ~ err:', err)
			// 	},
			// 	true,
			// )
		}
		// return () => {
		// 	active && deactivate()
		// }
	}, [active, activate, connector])

	return <>{children}</>
}
