import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Box, Typography, Grid, Pagination, Stack } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import React, { useEffect, useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import CloseIcon from '@/assets/imgs/common/closeIcon.svg'
import { BounceAnime } from '@/bounceComponents/common/BounceAnime'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import { getPools } from '@/api/market'
import { routes } from '@/constants/routes'
import { useOptionDatas } from '@/state/configOptions/hooks'
import FooterPc from '@/components/Footer/FooterPc'
import AuctionCard, { AuctionHolder, AuctionListItem } from '@/bounceComponents/common/AuctionCard'
import { useActiveWeb3React } from '@/hooks'
import TokenImage from '@/bounceComponents/common/TokenImage'
import BigNumber from 'bignumber.js'
import { getLabelById, shortenAddress } from '@/utils'
import CopyToClipboard from '@/bounceComponents/common/CopyToClipboard'
import { PoolType } from '@/api/pool/type'
import { formatNumber } from '@/utils/number'
import FixedSelected from '@/components/FixedSelected'
import EmptyData from '@/bounceComponents/common/EmptyData'
import CertifiedTokenImage from '@/components/CertifiedTokenImage'
import { poolTypeText } from '@/pages/market/pools'
import useBreakpoint from '@/hooks/useBreakpoint'
import MobileFixedSelected from '@/components/FixedSelected/mobileFixedSelected'

const Transition = React.forwardRef(
	(
		props: TransitionProps & {
			children: React.ReactElement<any, any>
		},
		ref: React.Ref<unknown>,
	) => {
		return <Slide direction="up" ref={ref} {...props} />
	},
)

interface DialogParams {
	open: boolean
	handleClose: () => void
}
const NFTDialog = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		borderRadius: '30px 30px 0 0',
	},
	[theme.breakpoints.up('sm')]: {
		'&.MuiDialog-root': {
			top: theme.height.header,
		},
		'.MuiModal-backdrop': {
			top: theme.height.header,
			height: `calc(100% - ${theme.height.header})`,
		},
		'.MuiDialog-paperScrollPaper': {
			position: 'relative',
			top: theme.height.header,
			height: `calc(100%)`,
		},
		'.MuiDialog-paper': {
			borderRadius: '30px 30px 0 0',
			backgroundColor: 'var(--ps-text-8)',
			maxWidth: '100%',
			width: '100%',
		},
	},
	[theme.breakpoints.down('sm')]: {
		'.MuiDialog-paper': {
			position: 'relative',
			marginLeft: 0,
			marginRight: 0,
			marginTop: 44,
			marginBottom: 0,
			maxHeight: 'calc(100% - 44px)',
		},
		'.MuiDialogContent-root': {
			padding: '0 16px',
		},
	},
}))
interface TitleProps {
	title: string
	handleClose: () => void
}
const DialogTitle = (props: TitleProps) => {
	const { title, handleClose } = props
	const isSm = useBreakpoint('sm')
	return (
		<Box
			sx={{
				position: 'relative',
				height: isSm ? 70 : 140,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography
				sx={{
					textAlign: 'center',
					lineHeight: '28px',
					fontFamily: `'Public Sans'`,
					fontSize: isSm ? 20 : 28,
					fontWeight: 600,
				}}
			>
				{title}
			</Typography>
			<img
				src={CloseIcon}
				style={{
					position: 'absolute',
					right: isSm ? 0 : 72,
					top: '50%',
					marginTop: -30,
					width: 60,
					height: 60,
					cursor: 'pointer',
				}}
				onClick={() => {
					handleClose && handleClose()
				}}
				alt=""
				srcSet=""
			/>
		</Box>
	)
}
export const initialValues = {
	searchText: '',
	searchType: 0,
	sortBy: 0,
	offset: 0,
	tokenFromAddress: '',
	tokenFromSymbol: '',
	tokenFromLogoURI: '',
	tokenFromDecimals: '',
	poolStatus: 0,
	auctionType: 1,
	chain: 0,
}
export interface InitialValuesPros {
	searchText?: string
	searchType?: number
	sortBy?: number
	offset?: number
	tokenFromAddress?: string
	tokenFromSymbol?: string
	tokenFromLogoURI?: string
	tokenFromDecimals?: string
	poolStatus?: number
	auctionType?: number
	chain?: number
}
const defaultIdeaPageSize = 16
const NFTAuctionListDialog = (props: DialogParams) => {
	const { open, handleClose } = props
	const optionDatas = useOptionDatas()
	const { account } = useActiveWeb3React()
	const [filterValues, setFilterValues] = useState<InitialValuesPros>(initialValues)
	const {
		pagination: poolsPagination,
		data: poolsData,
		loading,
		run,
	} = usePagination<any, Params>(
		async ({
			current,
			pageSize,
			category,
			chainId,
			creatorAddress,
			creatorName,
			orderBy,
			poolId,
			poolName,
			poolStatusFrontend,
			token0Address,
		}) => {
			if (!chainId && chainId !== 0) {
				return Promise.reject(new Error('No ChainId'))
			}
			const resp: any = await getPools({
				offset: (current - 1) * pageSize,
				limit: pageSize,
				category: category,
				tokenType: 1, // erc20:1, nft:2
				chainId: chainId || 0,
				creatorAddress: creatorAddress,
				creatorName: creatorName,
				orderBy: orderBy === 0 ? 'openTs' : 'createTs',
				poolId: poolId,
				poolName: poolName,
				poolStatusFrontend: poolStatusFrontend === 0 ? null : poolStatusFrontend,
				token0Address: token0Address,
			})
			return {
				list: resp.data.fixedSwapList.list,
				total: resp.data.fixedSwapList.total,
			}
		},
		{
			defaultPageSize: defaultIdeaPageSize,
			debounceWait: 500,
		},
	)

	const handleSubmit = useCallback(
		(values: InitialValuesPros) => {
			run({
				current: 1,
				pageSize: 12,
				category: values.auctionType,
				chainId: values.chain,
				creatorAddress: values.searchType === 3 ? values.searchText : '',
				creatorName: values.searchType === 2 ? values.searchText : '',
				orderBy: values.sortBy,
				poolId: values.searchType === 1 ? values.searchText : '',
				poolName: values.searchType === 0 ? values.searchText : '',
				poolStatusFrontend: values.poolStatus,
				token0Address: values.tokenFromAddress,
			})
		},
		[run],
	)
	const handleScrollToTop = () => {
		const topEl = document.getElementById('topTitle')
		topEl &&
			topEl.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
	}
	const filterSubmit = (values: InitialValuesPros) => {
		setFilterValues(values)
		handleScrollToTop()
	}
	const handlePageChange = (_: any, p: number) => {
		poolsPagination.changeCurrent(p)
		handleScrollToTop()
	}
	useEffect(() => {
		open && handleSubmit(filterValues)
	}, [handleSubmit, open, filterValues])
	// const navigate = useNavigate()
	const isSm = useBreakpoint('sm')
	return (
		<NFTDialog
			fullScreen={false}
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogContent>
				<Box id="topTitle">
					<DialogTitle title="Token  Auction Space" handleClose={handleClose} />
				</Box>
				<Box
					sx={{
						width: '100%',
						paddingBottom: 100,
						footer: {
							width: 'calc(100vw - 32px) !important',
						},
					}}
				>
					<Box
						mb={160}
						sx={{
							width: '100%',
							maxWidth: 1440,
							margin: '0 auto',
							paddingBottom: 100,
						}}
					>
						{loading ? (
							<Box
								sx={{
									width: '100%',
									height: '70vh',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<BounceAnime />
							</Box>
						) : poolsData?.total > 0 ? (
							<Grid container spacing={18}>
								{poolsData?.list?.map((fixedSwaptem: any, index: number) => (
									<Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
										<Box
										// onClick={() =>
										// 	navigate(
										// 		getAuctionPoolLink(
										// 			fixedSwaptem.id,
										// 			fixedSwaptem.category,
										// 			fixedSwaptem.chainId,
										// 			fixedSwaptem.poolId,
										// 		),
										// 	)
										// }
										>
											<AuctionCard
												style={{ minWidth: 'unset' }}
												poolId={fixedSwaptem.poolId}
												title={fixedSwaptem.name}
												status={fixedSwaptem.status}
												claimAt={fixedSwaptem.claimAt}
												closeAt={fixedSwaptem.closeAt}
												isCreator={fixedSwaptem.creator === account}
												creatorClaimed={fixedSwaptem.creatorClaimed}
												participantClaimed={fixedSwaptem.participant.claimed}
												dateStr={
													fixedSwaptem.status == 1 ? fixedSwaptem.openAt : fixedSwaptem.closeAt
												}
												holder={
													<AuctionHolder
														href={`${routes.profile.summary}?id=${fixedSwaptem.creatorUserInfo?.userId}`}
														avatar={fixedSwaptem.creatorUserInfo?.avatar}
														name={fixedSwaptem.creatorUserInfo?.name}
														description={
															fixedSwaptem.creatorUserInfo?.publicRole?.length > 0
																? fixedSwaptem.creatorUserInfo?.publicRole?.map(
																		(item: any, index: number) => {
																			return (
																				getLabelById(item, 'role', optionDatas?.publicRoleOpt) +
																				`${
																					index !==
																					fixedSwaptem.creatorUserInfo?.publicRole?.length - 1
																						? ', '
																						: ''
																				}`
																			)
																		},
																  )
																: 'Individual account'
														}
														isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
													/>
												}
												progress={{
													symbol:
														fixedSwaptem.category === 3
															? ''
															: fixedSwaptem.token0.symbol?.toUpperCase(),
													decimals: fixedSwaptem.category === 3 ? '' : fixedSwaptem.token0.decimals,
													sold:
														fixedSwaptem.category === 3
															? fixedSwaptem.curPlayer
															: fixedSwaptem.swappedAmount0,
													supply:
														fixedSwaptem.category === 3
															? fixedSwaptem.maxPlayere
															: fixedSwaptem.amountTotal0,
												}}
												listItems={
													<>
														<AuctionListItem
															label="Token symbol"
															value={
																<Stack direction="row" alignItems="center" spacing={4}>
																	<TokenImage
																		src={fixedSwaptem.token0.largeUrl}
																		alt={fixedSwaptem.token0.symbol}
																		size={20}
																	/>
																	<span>{fixedSwaptem.token0.symbol.toUpperCase()}</span>
																</Stack>
															}
														/>
														<AuctionListItem
															label="Contract address"
															value={
																<Stack direction="row" alignItems="center" spacing={4}>
																	<CertifiedTokenImage
																		address={fixedSwaptem.token0.address}
																		coingeckoId={fixedSwaptem.token0.coingeckoId}
																		ethChainId={fixedSwaptem.ethChainId}
																		backedChainId={fixedSwaptem.chainId}
																	/>
																	<span>{shortenAddress(fixedSwaptem.token0.address)}</span>
																	<CopyToClipboard text={fixedSwaptem.token0.address} />
																</Stack>
															}
														/>
														{fixedSwaptem.category !== PoolType.Lottery && (
															<AuctionListItem
																label="Fixed price ratio"
																value={
																	<Stack direction="row" spacing={8}>
																		<Typography fontSize={12}>1</Typography>
																		<Typography fontSize={12}>
																			{fixedSwaptem.token0.symbol.toUpperCase()} ={' '}
																			{new BigNumber(fixedSwaptem.ratio)
																				.decimalPlaces(6, BigNumber.ROUND_DOWN)
																				.toFormat()}
																		</Typography>
																		<Typography fontSize={12}>
																			{fixedSwaptem.token1.symbol.toUpperCase()}
																		</Typography>
																	</Stack>
																}
															/>
														)}
														{fixedSwaptem.category === PoolType.Lottery && (
															<AuctionListItem
																label="Ticket Price"
																value={
																	<Stack direction="row" spacing={8}>
																		<Typography fontSize={12}>
																			{formatNumber(fixedSwaptem.maxAmount1PerWallet, {
																				unit: fixedSwaptem.token1.decimals,
																				decimalPlaces: fixedSwaptem.token1.decimals,
																			})}
																		</Typography>
																		<Typography fontSize={12}>
																			{fixedSwaptem.token1.symbol.toUpperCase()}
																		</Typography>
																	</Stack>
																}
															/>
														)}
														<AuctionListItem
															label="Price,$"
															value={
																<span>
																	{new BigNumber(fixedSwaptem.poolPrice)
																		.decimalPlaces(6, BigNumber.ROUND_DOWN)
																		.toFormat()}
																</span>
															}
														/>
													</>
												}
												categoryName={poolTypeText[fixedSwaptem.category as PoolType]}
												whiteList={fixedSwaptem.enableWhiteList ? 'Whitelist' : 'Public'}
												chainId={fixedSwaptem.chainId}
											/>
										</Box>
									</Grid>
								))}
							</Grid>
						) : (
							<EmptyData />
						)}

						{poolsData?.total >= defaultIdeaPageSize && (
							<Box mt={58} display="flex" justifyContent="center">
								<Pagination
									onChange={handlePageChange}
									count={Math.ceil(poolsData?.total / defaultIdeaPageSize) || 0}
									siblingCount={0}
									sx={{
										'.MuiPaginationItem-root': {
											margin: '0 8px',
										},
										'.MuiPagination-ul': {
											flexWrap: 'nowrap',
											alignItems: 'center',
										},
									}}
								/>
							</Box>
						)}
					</Box>
					<FooterPc />
				</Box>
				{!isSm && <FixedSelected handleSubmit={filterSubmit} />}
				{isSm && <MobileFixedSelected handleSubmit={filterSubmit} />}
			</DialogContent>
		</NFTDialog>
	)
}
export default NFTAuctionListDialog
