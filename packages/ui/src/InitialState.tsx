import { FC, PropsWithChildren, useEffect } from 'react'
import { useActiveWeb3React } from './hooks'
import { useGetOptionsData } from './bounceHooks'
import { useLocationBlockInit } from './hooks'
import { useRefreshUserInfoByFirstLoad } from './state/users/hooks'
interface InitialStateProps {}
export const InitialState: FC<PropsWithChildren<InitialStateProps>> = ({ children }) => {
	const data = useActiveWeb3React()
	console.log('🚀 ~ data:', data)
	const { activate, active, connector, deactivate } = data
	useGetOptionsData()
	useLocationBlockInit()
	useRefreshUserInfoByFirstLoad()
	useEffect(() => {
		if (!active && connector) {
			activate(
				connector,
				(err) => {
					console.log('🚀 ~ err:', err)
				},
				true,
			)
		}
		// return () => {
		// 	active && deactivate()
		// }
	}, [active, activate, connector])

	return <>{children}</>
}
