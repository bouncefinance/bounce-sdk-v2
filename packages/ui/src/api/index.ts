export * from './account'
export * from './bladeDao'
export * from './company'
export * from './fundo'
export * from './game'
export * from './idea'
export * from './market'
export * from './optionsData'
export * from './pool'
export * from './profile'
export * from './thirdPart'
export * from './type'
export * from './upload'
export * from './user'
import { toast } from 'react-toastify'
import { IResponse } from './type'
import store from '@/state'
import { removeLoginInfo, removeUserInfo } from '@/state/users/reducer'
import { ENV_CONFIGS } from '@/constants/config'

const request = (url: string, options?: any) => {
	// TODO: add request/response interceptors
	return fetch(url, options).then(async (response) => {
		if (response.status === 401) {
			toast.error('Login has expired, please login again.', {
				toastId: 'loginHasExpired',
			})
			store.dispatch(removeLoginInfo())
			store.dispatch(removeUserInfo())
			// location.href = '/login'
			// setTimeout(() => {
			//   window.location.reload()
			// }, 1000)
		}
		const json = await response?.json()
		if (response.status !== 200) {
			return Promise.reject(json)
		}
		return json
	})
}

const initSignature = (): { token: string | undefined } => {
	const { token, address } = store.getState().users
	const { currentConnectedAccount } = store.getState().application
	return {
		'X-Api-Key': 'e6216d6d7e546ea82da644f415712011c1bc0a017c99757dede787234fd5ebbc',
		token: currentConnectedAccount === address ? token || '' : '',
	}
}

const instance = (baseuri: string) => ({
	get(url: string, params: any, headers?: any): Promise<IResponse<any>> {
		return request(`${baseuri}${url}?${new URLSearchParams(params).toString()}`, {
			headers: {
				...headers,
				...initSignature(),
			},
		})
	},
	post<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
		const _headers = headers || { 'Content-Type': 'application/json' }
		return request(`${baseuri}${url}`, {
			headers: {
				..._headers,
				...initSignature(),
			},
			method: 'POST',
			body: body instanceof FormData ? body : JSON.stringify(body),
		})
	},
})

export const ApiInstance = instance(ENV_CONFIGS.REACT_APP_REQUEST_BASEURL || '')
