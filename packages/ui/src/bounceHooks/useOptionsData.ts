import { useRequest } from 'ahooks'
import { getOptionsData } from '@/api/optionsData'
import { useDispatch } from '@/global'

export const useGetOptionsData = () => {
	const dispatch = useDispatch()
	const { data: optionsData, run: getOpData } = useRequest(getOptionsData, {
		cacheKey: 'optionsData',
		onSuccess: (response) => {
			if (response.code === 200) {
				dispatch({
					type: 'configOptions/setOptionDatas',
					payload: {
						optionDatas: response.data,
					},
				})
				return response.data
			}
			return undefined
		},
	})
	return { optionsData, getOpData }
}
