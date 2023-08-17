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
			<BounceProvider getLibrary={getLibrary} account="0x88888888B0A018D28947b7FbDe08E0B408de9f70">
				<CreateAuctionPool
					tokenType={TokenType.ERC721}
					auctionType={AuctionType.ENGLISH_AUCTION}
					auctionInChainId={1}
				/>
			</BounceProvider>
		</>
	)
}
