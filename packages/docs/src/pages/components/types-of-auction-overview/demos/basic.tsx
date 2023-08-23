import { BounceProvider, TypesOfAuctionOverview } from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default () => {
	return (
		<BounceProvider getLibrary={(provider) => new Web3Provider(provider, 'any')}>
			<TypesOfAuctionOverview />
		</BounceProvider>
	)
}
