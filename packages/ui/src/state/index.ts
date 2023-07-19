import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
// TODO: 因为运行时会报错global is not defined 所以把所有global都替换成globalThis了 这里打开就会识别不到路径
// import { updateVersion } from './global/actions'
// import user from './user/reducer'
import transactions from './transactions/reducer'
import multicall from './multicall/reducer'
import users from './users/reducer'
import configOptions from './configOptions/reducer'

const PERSISTED_KEYS: string[] = ['users', 'transactions']

const store = configureStore({
	reducer: {
		application,
		// user,
		transactions,
		multicall,
		users,
		configOptions,
	},
	middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
	preloadedState: load({ states: PERSISTED_KEYS }),
})

// store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
