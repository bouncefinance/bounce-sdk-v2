import { CreateAuctionPool, TokenType, AuctionType, BounceProvider } from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
	const library = new Web3Provider(provider, 'any')
	library.pollingInterval = 15000
	return library
}

export default () => {
	return (
		<>
			<BounceProvider getLibrary={getLibrary}>
				<CreateAuctionPool
					tokenType={TokenType.ERC20}
					auctionType={AuctionType.FIXED_PRICE}
					auctionInChainId={1}
					account="0xFbdBB755cB4b8ee2ceb85E29D23df0d5D04e70F0"
				/>
			</BounceProvider>
		</>
	)
}
