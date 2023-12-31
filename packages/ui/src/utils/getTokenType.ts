import { PoolType } from '@/api/pool/type'
import { BackedTokenType } from '@/enums'

export default function getTokenType(category: PoolType) {
	const nftPool = [PoolType.ENGLISH_AUCTION_NFT, PoolType.fixedSwapNft]
	return nftPool.includes(category) ? BackedTokenType.NFT : BackedTokenType.TOKEN
}
