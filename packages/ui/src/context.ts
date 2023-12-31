import { createContext, useContext } from 'react'
import { ChainId } from './constants/chain'

export interface IMainContext {
	/**
	 * global account
	 */
	account?: string
	/**
	 * global chain id
	 */
	chainId?: ChainId
}

export const MainContext = createContext<IMainContext | null>(null)

export const useMainContext = () => {
	const context = useContext(MainContext)
	if (context === null) {
		throw new Error('You must add a <MainContext.Provider> into the React tree')
	}
	return context
}
