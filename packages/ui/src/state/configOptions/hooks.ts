import { useSelector } from '@/global'
import { AppState } from '@/state'
// import { useSelector } from 'react-redux'

export function useOptionDatas() {
	const configOptions = useSelector<AppState, AppState['configOptions']>(
		(state) => state.configOptions,
	)
	return configOptions.optionDatas
}
