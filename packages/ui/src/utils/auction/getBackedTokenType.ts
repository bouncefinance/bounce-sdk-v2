import { PoolType } from '@/api/pool/type'
import { BackedTokenType } from '@/enums'

export default function getBackedTokenType(category: PoolType) {
	if ([PoolType.ENGLISH_AUCTION_NFT, PoolType.fixedSwapNft].includes(category)) {
		return BackedTokenType.NFT
	}
	return BackedTokenType.TOKEN
}
