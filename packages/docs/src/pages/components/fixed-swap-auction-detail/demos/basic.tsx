import {
	BounceProvider,
	FixedSwapAuctionDetail,
	FixedSwapAuctionDetailProps,
	PoolType,
} from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default () => {
	const props: FixedSwapAuctionDetailProps = {
		category: PoolType.ENGLISH_AUCTION_NFT,
		// backedId: number;
		sysId: '18342',
		// chainShortName: string;
		// sysId: string;
	}
	return (
		<BounceProvider getLibrary={(provider) => new Web3Provider(provider, 'any')}>
			<FixedSwapAuctionDetail
				{...props}
				onClickAvatar={() => {
					console.log(111)
				}}
				onClickUsername={undefined}
			/>
		</BounceProvider>
	)
}
