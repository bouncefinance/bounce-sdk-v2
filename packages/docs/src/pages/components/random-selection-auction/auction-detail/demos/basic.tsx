import {
	BounceProvider,
	PoolType,
	RandomSelectionAuctionDetail,
	RandomSelectionAuctionDetailProps,
} from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default () => {
	const props: RandomSelectionAuctionDetailProps = {
		category: PoolType.ENGLISH_AUCTION_NFT,
		// backedId: number;
		sysId: '18342',
		// chainShortName: string;
		// sysId: string;
	}
	return (
		<BounceProvider getLibrary={(provider) => new Web3Provider(provider, 'any')}>
			<RandomSelectionAuctionDetail {...props} />
		</BounceProvider>
	)
}
