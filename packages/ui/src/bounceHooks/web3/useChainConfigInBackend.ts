import { useMemo } from 'react'

import { ChainInfoOpt } from '@/api/user/type'
import { useOptionDatas } from '@/state/configOptions/hooks'

const useChainConfigInBackend = (searchKey: keyof ChainInfoOpt, searchValue: string | number) => {
	const optionDatas = useOptionDatas()
	console.log('🚀 ~ optionDatas:', optionDatas)

	return useMemo(() => {
		if (!optionDatas?.chainInfoOpt) return null

		return optionDatas.chainInfoOpt.find((chainInfo) => chainInfo?.[searchKey] === searchValue)
	}, [searchKey, searchValue, optionDatas.chainInfoOpt])
}

export default useChainConfigInBackend
