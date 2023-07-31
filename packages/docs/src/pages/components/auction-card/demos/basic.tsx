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
					avatar: 'https://example.com/avatar.jpg',
					name: 'AI助手',
					description: '我是一个智能AI助手，可以回答您的问题。',
					href: 'https://example.com/profile',
					isVerify: 1,
				}}
			/>
		),
		listItems: <AuctionListItem label="lable" value="value" />,
		poolId: '9',
		progress: {
			symbol: 'CZ',
			decimals: '18',
			sold: '0',
			supply: '10000000000000000000',
		},
		status: PoolStatus.Cancelled,
		style: {
			width: '312px',
			minWidth: 'unset',
		},
		title: 'cz2eth2',
		whiteList: 'Public',
		chainConfigInBackend: {
			chainName: 'Sepolia',
			chain_type: 1,
			ethChainId: 11155111,
			id: 5,
			shortName: 'sepolia',
		},
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