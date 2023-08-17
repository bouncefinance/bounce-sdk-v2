import {
	AuctionCard,
	AuctionHolder,
	AuctionListItem,
	AuctionCardProps,
	PoolStatus,
	BounceProvider,
} from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default () => {
	const props: AuctionCardProps = {
		categoryName: 'Dutch Auction',
		claimAt: 1688436000,
		closeAt: 1688356800,
		dateStr: 1688356800,
		holder: (
			<AuctionHolder
				{...{
					avatar: 'https://nft-auction.com/assets/avatar.png',
					name: 'NFT Auction House',
					description: 'Premier NFT auction platform',
					href: 'https://nft-auction.com',
					isVerify: 1,
				}}
			/>
		),
		listItems: <AuctionListItem label="lable" value="value" />,
		poolId: '456',
		progress: {
			symbol: 'ETH',
			decimals: '18',
			sold: '0.2',
			supply: '1',
		},
		status: PoolStatus.Cancelled,
		style: {
			width: '312px',
		},
		title: 'CryptoPunk #245',
		whiteList: 'Invited Bidders',
		chainId: 1,
	}
	return (
		<BounceProvider getLibrary={(provider) => new Web3Provider(provider, 'any')}>
			<div className="flex flex-wrap gap-5">
				<AuctionCard {...props} isCreator />
				<AuctionCard {...props} {...{ status: PoolStatus.Closed }} />
				<AuctionCard {...props} {...{ status: PoolStatus.Finish }} />
				<AuctionCard {...props} {...{ status: PoolStatus.Live }} />
				<AuctionCard {...props} {...{ status: PoolStatus.Upcoming }} />
			</div>
		</BounceProvider>
	)
}
