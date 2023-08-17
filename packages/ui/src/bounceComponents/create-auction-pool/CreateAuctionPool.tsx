import { FC } from 'react'
import { ChainId } from '@/constants/chain'
import NiceModal from '@ebay/nice-modal-react'
import { Box } from '@mui/material'

import { useEffect } from 'react'

import RoundedContainer from '@/bounceComponents/create-auction-pool/RoundedContainer'
import { CreationStep, TokenType, AuctionType } from '@/bounceComponents/create-auction-pool/types'
import ValuesProvider, {
	ActionType,
	useValuesDispatch,
	useValuesState,
} from '@/bounceComponents/create-auction-pool/ValuesProvider'
import Stepper from '@/bounceComponents/create-auction-pool/Stepper'
import { isSupportedAuctionType } from '@/constants/auction'

import useBreakpoint from '@/hooks/useBreakpoint'
import { Erc1155Pool, Erc20Pool, Erc721Pool, RandomSelection } from './pools'
import { withBounceTheme } from '@/global'
import { useActiveWeb3React } from '@/hooks'

export interface CreateAuctionPoolProps {
	tokenType: TokenType
	auctionType: AuctionType
	auctionInChainId: ChainId
}

const steps = ['1. Token Information', '2. Auction Parameters', '3. Advanced Settings']

const InteralCreateAuctionPool = () => {
	const valuesState = useValuesState()
	const { tokenType, auctionType, account } = valuesState
	const valuesDispatch = useValuesDispatch()
	const isSm = useBreakpoint('sm')

	const temp = useActiveWeb3React()
	console.log('🚀 ~ temp:', temp)
	// const { tokenType, auctionType } = useQueryParams()

	useEffect(() => {
		valuesDispatch?.({
			type: ActionType.SetTokenType,
			payload: { tokenType: tokenType || TokenType.ERC20 },
		})
		valuesDispatch?.({
			type: ActionType.SetAuctionType,
			payload: { auctionType: auctionType },
		})
	}, [auctionType, tokenType, valuesDispatch])
	useEffect(() => {
		if (!account || typeof auctionType !== 'string' || !isSupportedAuctionType(auctionType)) {
			console.warn('CreateAuctionPool warning')
		}
	}, [account, auctionType])

	return (
		<RoundedContainer maxWidth="md" sx={{ pt: 22 }}>
			{valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION && (
				<Box sx={{ px: isSm ? 16 : 22 }}>
					<Stepper steps={steps} valuesState={valuesState} valuesDispatch={valuesDispatch} />
				</Box>
			)}
			{valuesState.auctionType === AuctionType.FIXED_PRICE &&
			valuesState.tokenType === TokenType.ERC20 ? (
				<Erc20Pool />
			) : null}
			{valuesState.auctionType === AuctionType.FIXED_PRICE &&
			valuesState.tokenType === TokenType.ERC1155 ? (
				<Erc1155Pool />
			) : null}
			{valuesState.auctionType === AuctionType.RANDOM_SELECTION &&
			valuesState.tokenType === TokenType.ERC20 ? (
				<RandomSelection />
			) : null}
			{valuesState.auctionType === AuctionType.ENGLISH_AUCTION &&
			valuesState.tokenType === TokenType.ERC721 ? (
				<Erc721Pool />
			) : null}
		</RoundedContainer>
	)
}
export const CreateAuctionPool: FC<CreateAuctionPoolProps> = withBounceTheme((props) => {
	return (
		<NiceModal.Provider>
			<ValuesProvider state={props}>
				<InteralCreateAuctionPool />
			</ValuesProvider>
		</NiceModal.Provider>
	)
})
