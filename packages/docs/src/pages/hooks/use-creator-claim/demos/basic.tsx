import { useCreatorClaim } from '@bouncefinance/hooks'

export default () => {
	console.log('🚀 ~ useCreatorClaim:', useCreatorClaim(1, 'name', '0x...'))
}
