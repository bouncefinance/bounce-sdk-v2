import React, { useMemo, useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, styled, Typography } from '@mui/material'
import TokenAuctionImg from '@/assets/imgs/common/TokenAuction.png'
import NFTAuctionImg from '@/assets/imgs/common/NFTAuction.png'
import AdSpaceAuctionImg from '@/assets/imgs/common/AdSpaceAuction.png'
import RealWorldImg from '@/assets/imgs/common/RealWorld.png'
import leftArrowLightImg from '@/assets/imgs/common/leftArrowLight.svg'
import leftArrowGrayImg from '@/assets/imgs/common/leftArrowGray.svg'
import rightArrayLightImg from '@/assets/imgs/common/rightArrayLight.svg'
import rightArrayGrayImg from '@/assets/imgs/common/rightArrayGray.svg'
import { useRequest } from 'ahooks'
import { getAuctionTypeCountData, getPools } from '@/api/market'
import { Link } from 'react-router-dom'
import { NFTCard } from '@/pages/market/nftAuctionPool'
import { useOptionDatas } from '@/state/configOptions/hooks'
import { routes } from '@/constants/routes'
import { getLabelById, shortenAddress } from '@/utils'
import AuctionCard, { AuctionHolder, AuctionListItem } from '@/bounceComponents/common/AuctionCard'
import TokenImage from '@/bounceComponents/common/TokenImage'
import BigNumber from 'bignumber.js'
import CopyToClipboard from '@/bounceComponents/common/CopyToClipboard'
import { PoolType } from '@/api/pool/type'
import CertifiedTokenImage from '@/components/CertifiedTokenImage'
import getAuctionPoolLink from '@/utils/auction/getAuctionPoolRouteLink'
import { poolTypeText } from '@/pages/market/pools'
import useBreakpoint from '../../hooks/useBreakpoint'

interface InfoBoxParams {
	title: string
	value: string
	style?: React.CSSProperties
}

const InfoBox = (props: InfoBoxParams) => {
	const { title, value, style } = props
	return (
		<Box
			sx={{
				background: 'var(--ps-text-3)',
				borderRadius: 20,
				width: 110,
				height: 81,
				padding: 12,
				...style,
			}}
		>
			<Typography
				sx={{
					textAlign: 'left',
					fontFamily: `'Public Sans'`,
					fontWeight: 600,
					fontSize: 14,
					width: '100%',
					height: '21px',
					lineHeight: '21px',
					color: '#626262',
					marginBottom: 12,
					letterSpacing: '-0.02em',
				}}
			>
				{title}
			</Typography>
			<Typography
				sx={{
					textAlign: 'right',
					fontFamily: `'Public Sans'`,
					fontWeight: 600,
					fontSize: 14,
					lineHeight: '21px',
					color: '#959595',
					width: '100%',
					height: '21px',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					letterSpacing: '-0.02em',
				}}
			>
				{value ? Number(value).toLocaleString() : '--'}
			</Typography>
		</Box>
	)
}

const enum AuctionType {
	TokenAuction = 'Token Auction',
	NFTAuction = 'NFT Auction',
	AdSpaceAuction = 'Ad Space Auction',
	RealWorldCollectibleAuction = 'Real-World Collectible Auction',
}
type Tuple4<TItem> = [TItem, ...TItem[]] & { length: 4 }

interface PaginationParams {
	index: number
	total: number
	rotateRatioList: Tuple4<number>
	style?: React.CSSProperties
	setCurrent: (index: number) => void
	setRotateRatioList: (value: Tuple4<number>) => void
}

const ComBtn = styled(Box)(({ theme }) => ({
	width: 60,
	height: 60,
	display: 'flex',
	flexFlow: 'row nowrap',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 8,
	cursor: 'pointer',
	background: 'var(--ps-text-3)',
	'.img': {
		display: 'block',
		width: 16,
		height: 16,
	},
	'.active': {
		display: 'none',
		width: 16,
		height: 16,
	},
	'&:hover': {
		background: 'var(--ps-yellow-1)',
		'.img': {
			display: 'none',
		},
		'.active': {
			display: 'block',
		},
	},
	[theme.breakpoints.down('sm')]: {
		width: 44,
		height: 44,
	},
}))
const PaginationBox = (props: PaginationParams) => {
	const { index, total, style, setCurrent, rotateRatioList, setRotateRatioList } = props
	const isSm = useBreakpoint('sm')
	const toPrev = () => {
		const result: Tuple4<number> = [...rotateRatioList] as Tuple4<number>
		const value = index - 1 < 0 ? total - 1 : index - 1
		result[index] += 180
		result[value] += 180
		setRotateRatioList(result)
		setCurrent && setCurrent(value)
	}
	const toNext = () => {
		const result: Tuple4<number> = [...rotateRatioList] as Tuple4<number>
		const value = index + 1 > total - 1 ? 0 : index + 1
		result[index] -= 180
		result[value] -= 180
		setRotateRatioList(result)
		setCurrent && setCurrent(value)
	}
	return (
		<Box
			sx={{
				padding: isSm ? 16 : 'inherit',
				width: isSm ? '100%' : 128,
				height: 60,
				display: 'flex',
				flexFlow: 'row nowrap',
				alignItems: isSm ? 'center' : 'inherit',
				justifyContent: 'space-between',
				'@media(max-width:1347px)': {
					right: 20,
				},
				...style,
			}}
		>
			<ComBtn onClick={toPrev}>
				<img
					className={'img'}
					src={leftArrowLightImg}
					alt=""
					style={{
						width: 16,
						height: 16,
					}}
				/>
				<img
					className={'active'}
					src={leftArrowGrayImg}
					alt=""
					style={{
						width: 16,
						height: 16,
					}}
				/>
			</ComBtn>
			{isSm && (
				<Typography sx={{ color: '#E1F25C' }}>
					{index + 1}/{total}
				</Typography>
			)}
			<ComBtn onClick={toNext}>
				<img
					className={'img'}
					src={rightArrayLightImg}
					alt=""
					style={{
						width: 16,
						height: 16,
					}}
				/>
				<img
					className={'active'}
					src={rightArrayGrayImg}
					alt=""
					style={{
						width: 16,
						height: 16,
					}}
				/>
			</ComBtn>
		</Box>
	)
}
const TokenAuction: React.FC = () => {
	const optionDatas = useOptionDatas()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [rotateRatioList, setRotateRatioList] = useState<Tuple4<number>>([0, 180, 180, 180])
	const isSm = useBreakpoint('sm')
	const isLg = useBreakpoint('lg')
	const { data: nftPoolData, loading: nftLoading } = useRequest(async () => {
		const resp = await getPools({
			offset: 0,
			limit: 4,
			category: 0,
			chainId: 0,
			creatorAddress: '',
			creatorName: '',
			orderBy: 'openTs',
			poolId: '',
			poolName: '',
			tokenType: 2, // erc20:1, nft:2
			token0Address: '',
		})
		return {
			list: resp.data.fixedSwapNftList.list,
			total: resp.data.fixedSwapNftList.total,
		}
	})
	const { data: countData } = useRequest(async () => {
		const resp = await getAuctionTypeCountData()
		return {
			data: (resp?.data && resp?.data?.stat) || [],
		}
	})
	const { data, loading } = useRequest(async () => {
		const resp = await getPools({
			offset: 0,
			limit: 4,
			category: 0,
			tokenType: 1, // erc20:1, nft:2
			chainId: 0,
			creatorAddress: '',
			creatorName: '',
			orderBy: '',
			poolId: '',
			poolName: '',
			token0Address: '',
		})
		return {
			list: resp.data.fixedSwapList.list,
			total: resp.data.fixedSwapList.total,
		}
	})
	const AuctionList = useMemo(() => {
		const result = [
			{
				title: AuctionType.TokenAuction,
				subTitle:
					'Experience seamless trading of digital tokens through diverse types of on-chain auctions across various blockchain ecosystems, ensuring a fair and transparent marketplace.',
				totalValue: '',
				totalAuction: '',
				trendingTokenAuction: '',
				auctionImg: TokenAuctionImg,
				checkAllLink: routes.tokenAuction.index,
			},
			{
				title: AuctionType.NFTAuction,
				subTitle:
					'Dive into the world of Non-Fungible Tokens (NFTs) across multiple blockchains, offering a streamlined and secure way to buy, sell, and trade unique digital art and virtual goods within a decentralized environment.',
				totalValue: '',
				totalAuction: '',
				trendingTokenAuction: '',
				auctionImg: NFTAuctionImg,
				checkAllLink: routes.nftAuction.index,
			},
			{
				title: AuctionType.AdSpaceAuction,
				subTitle:
					'Explore our innovative approach to auctioning ad spaces on websites and digital platforms, fostering a transparent, decentralized marketplace that empowers advertisers and publishers to connect and transact directly, optimizing value and efficiency.',
				totalValue: '',
				totalAuction: '',
				trendingTokenAuction: '',
				auctionImg: AdSpaceAuctionImg,
				checkAllLink: routes.adsAuction.index,
			},
			{
				title: AuctionType.RealWorldCollectibleAuction,
				subTitle:
					'Discover our groundbreaking solution for auctioning real-world assets on blockchain, bridging the gap between physical and digital domains, and unlocking unprecedented opportunities for decentralized auctions of collectibles, memorabilia, and beyond.',
				totalValue: '',
				totalAuction: '',
				trendingTokenAuction: '',
				auctionImg: RealWorldImg,
				checkAllLink: routes.realAuction.index,
			},
		]
		if (
			countData &&
			countData?.data &&
			Array.isArray(countData?.data) &&
			countData.data.length > 0
		) {
			countData.data.map((item, index) => {
				result[index].totalAuction = `${typeof item.totalPools === 'number' ? item.totalPools : 0}`
				result[index].totalValue = `${item.totalVolume ? item.totalVolume : 0}`
				result[index].trendingTokenAuction = `${
					typeof item.totalLivePools === 'number' ? item.totalLivePools : 0
				}`
			})
		}
		return result || []
	}, [countData])
	const showData = useMemo(() => {
		return AuctionList[currentIndex]
	}, [AuctionList, currentIndex])
	const AuctionImg = styled('img')(({}) => ({
		position: 'absolute',
		top: isSm ? 217 : 100,
		display: 'block',
		width: isSm ? 283 : 350,
		'@media(max-width:640px)': {
			left: '50%',
			transform: 'translateX(-50%)',
		},
		'@media(max-width:996px)': {
			right: 0,
		},
		'@media(min-width:996px)': {
			left: '50%',
			transform: 'translateX(-50%)',
		},
	}))
	function NftSkeleton() {
		return (
			<Box>
				<Skeleton
					variant="rounded"
					height={400}
					sx={{ bgcolor: 'var(--ps-gray-30)', borderRadius: 20 }}
				/>
			</Box>
		)
	}
	function NftLink({ nft }: { nft: any }) {
		return (
			<Link to={getAuctionPoolLink(nft.id, nft.category, nft.chainId, nft.poolId)}>
				<NFTCard nft={nft} hiddenStatus={true} />
			</Link>
		)
	}
	const TokenAuctionSkeleton = () => {
		return (
			<Stack spacing={18} direction={'row'} sx={{ width: 1380, overflowX: 'scroll' }}>
				{Array.from(new Array(4)).map((lodingItem, index) => (
					<Box display={'flex'} flexDirection={'column'} key={index} flex={1}>
						<Box
							height={400}
							sx={{
								bgcolor: 'var(--ps-white)',
								borderRadius: 20,
								padding: '16px',
								border: '1px solid rgba(0, 0, 0, 0.1)',
							}}
						>
							<Box
								display="flex"
								width={'100%'}
								gap={20}
								sx={{ '& > span': { borderRadius: '12px' } }}
							>
								<Skeleton variant="rectangular" width={'15%'} height={24} />
								<Skeleton variant="rectangular" width={'25%'} height={24} />
								<Skeleton variant="rectangular" width={'60%'} height={24} />
							</Box>
							<Skeleton
								component={'div'}
								variant="rectangular"
								width={'50%'}
								height={24}
								sx={{ marginTop: '20px', borderRadius: '12px' }}
							/>
							<Skeleton
								component={'div'}
								variant="rectangular"
								width={'100%'}
								height={24}
								sx={{ marginTop: '10px', borderRadius: '12px' }}
							/>
							<Box mt={20} display={'flex'}>
								<Skeleton variant="circular" width={52} height={52} />
								<Box width={'calc(100% - 52px)'} sx={{ marginLeft: '10px' }}>
									<Skeleton variant="text" width={'20%'} />
									<Skeleton variant="text" width={'40%'} />
								</Box>
							</Box>
							<Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
							<Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
							<Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
							<Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
							<Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
						</Box>
					</Box>
				))}
			</Stack>
		)
	}
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				maxWidth: 1540,
				height:
					showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction
						? 1188
						: 622,
				margin: isSm ? '80px auto 0' : '120px auto 0',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height:
						showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction
							? 865
							: 622,
					background: 'var(--ps-text-4)',
					borderRadius: 12,
				}}
			>
				<Box
					sx={{
						position: 'relative',
						maxWidth: isSm ? '100%' : 1296,
						height: 622,
						padding: isSm ? '40px 16px 20px' : '80px 0 0 0',
						margin: '0 auto',
						overflow: 'hidden',
						'@media(max-width:1360px)': {
							paddingLeft: 20,
						},
					}}
				>
					<Typography
						sx={{
							textAlign: 'left',
							fontFamily: `'Public Sans'`,
							fontWeight: 700,
							fontSize: isSm ? 24 : 44,
							width: '100%',
							lineHeight: '32px',
							color: 'var(--ps-yellow-1)',
							marginBottom: 30,
							letterSpacing: '-0.02em',
						}}
					>
						{showData.title}
					</Typography>
					<Typography
						sx={{
							textAlign: 'left',
							width: '100%',
							maxWidth: 420,
							fontFamily: `'Public Sans'`,
							fontWeight: 400,
							fontSize: isSm ? 14 : 16,
							lineHeight: '21px',
							color: 'var(--ps-primary)',
							marginBottom: 30,
							letterSpacing: '-0.02em',
						}}
					>
						{showData.subTitle}
					</Typography>
					{!isSm && (
						<Typography
							sx={{
								position: 'absolute',
								right: 0,
								bottom: 172,
								textAlign: 'right',
								fontFamily: `'Inter'`,
								fontWeight: 400,
								fontSize: 14,
								width: 200,
								lineHeight: '20px',
								color: 'var(--ps-yellow-1)',
								'@media(max-width:1347px)': {
									right: 20,
								},
							}}
						>
							{`${currentIndex + 1} / ${AuctionList.length}`}
						</Typography>
					)}
					{!isSm && (
						<Box
							sx={{
								'@media(max-width:1360px)': {
									'&>div:nth-child(1)': {
										left: 20,
									},
									'&>div:nth-child(2)': {
										left: 130,
									},
									'&>div:nth-child(3)': {
										left: 20,
									},
								},
							}}
						>
							<InfoBox
								title={'total value'}
								value={showData.totalValue}
								style={{
									position: 'absolute',
									bottom: 161,
									left: 0,
								}}
							/>
							<InfoBox
								title={'Total Auction'}
								value={showData.totalAuction}
								style={{
									position: 'absolute',
									bottom: 161,
									left: 110,
								}}
							/>
							<InfoBox
								title={'Trending Token Auction'}
								value={showData.trendingTokenAuction}
								style={{
									position: 'absolute',
									width: 220,
									background: 'var(--ps-yellow-1)',
									bottom: 80,
									left: 0,
								}}
							/>
						</Box>
					)}
					<Box
						sx={{
							position: 'absolute',
							bottom: isSm ? '-80%' : '-50%',
							left: '50%',
							transform: 'translateX(-50%)',
							width: 763,
							height: 763,
							borderRadius: '50%',
							border: '1px solid var(--ps-yellow-1)',
							opacity: 0.6,
						}}
					></Box>
					{/* Token Auction */}
					<Box
						sx={{
							position: 'absolute',
							width: 763,
							height: 622,
							top: 622,
							left: '50%',
							transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[0]}deg)`,
							transformOrigin: 'bottom center',
							transition: 'all 1s',
							animationTimingFunction: 'ease-in-out',
						}}
					>
						<AuctionImg src={AuctionList[0].auctionImg} alt="" />
					</Box>
					{/* NFT Auctioin */}
					<Box
						sx={{
							position: 'absolute',
							width: 763,
							height: 622,
							top: 622,
							left: '50%',
							transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[1]}deg)`,
							transformOrigin: 'bottom center',
							transition: 'all 1s',
							animationTimingFunction: 'ease-in-out',
						}}
					>
						<AuctionImg src={AuctionList[1].auctionImg} alt="" />
					</Box>
					{/* Real World Auction */}
					<Box
						sx={{
							position: 'absolute',
							width: 763,
							height: 622,
							top: 622,
							left: '50%',
							transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[2]}deg)`,
							transformOrigin: 'bottom center',
							transition: 'all 1s',
							animationTimingFunction: 'ease-in-out',
						}}
					>
						<AuctionImg src={AuctionList[2].auctionImg} alt="" />
					</Box>
					{/* Ad Space Auction */}
					<Box
						sx={{
							position: 'absolute',
							width: 763,
							height: 622,
							top: 622,
							left: '50%',
							transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[3]}deg)`,
							transformOrigin: 'bottom center',
							transition: 'all 1s',
							animationTimingFunction: 'ease-in-out',
						}}
					>
						<AuctionImg src={AuctionList[3].auctionImg} alt="" />
					</Box>
					<PaginationBox
						rotateRatioList={rotateRatioList}
						index={currentIndex}
						total={AuctionList.length}
						setCurrent={setCurrentIndex}
						setRotateRatioList={setRotateRatioList}
						style={
							isSm
								? {
										position: 'absolute',
										bottom: '30px',
										left: '50%',
										transform: 'translateX(-50%)',
								  }
								: {
										position: 'absolute',
										bottom: 80,
										right: 0,
								  }
						}
					/>
				</Box>
			</Box>
			{(showData.title === AuctionType.NFTAuction ||
				showData.title === AuctionType.TokenAuction) && (
				<>
					<Box
						sx={{
							position: 'absolute',
							width: 1440,
							minHeight: 496,
							top: 622,
							left: 0,
							borderRadius: 30,
							margin: '0 auto',
							background: '#fff',
							padding: isSm ? '24px 16px' : 24,
							'@media(min-width:1440px)': {
								transform: 'translateX(-50%)',
								left: '50%',
							},
							'@media(max-width:1440px)': {
								width: '100%',
							},
						}}
					>
						<Box
							sx={{
								minHeight: 368,
								marginBottom: 24,
							}}
						>
							{showData.title === AuctionType.NFTAuction && (
								<>
									{nftLoading &&
										(isSm ? (
											<Stack spacing={18} direction={'row'} sx={{ overflowX: 'scroll' }}>
												{Array.from(new Array(4)).map((_, index) => (
													<NftSkeleton key={index} />
												))}
											</Stack>
										) : (
											<Grid container spacing={18}>
												{Array.from(new Array(4)).map((_, index) => (
													<Grid item key={index} xs={3}>
														<NftSkeleton />
													</Grid>
												))}
											</Grid>
										))}
									{isLg ? (
										<Box
											sx={{
												width: '100%',
												overflowX: 'scroll',
												'&::-webkit-scrollbar': {
													display: 'none',
												},
											}}
										>
											<Stack gap={18} direction={'row'} sx={{ minWidth: 1440, '&>a': { flex: 1 } }}>
												{optionDatas?.chainInfoOpt &&
													nftPoolData?.list.map((nft: any, i: number) => (
														<NftLink nft={nft} key={i} />
													))}
											</Stack>
										</Box>
									) : (
										<Grid container spacing={18}>
											{optionDatas?.chainInfoOpt &&
												nftPoolData?.list.map((nft: any, i: number) => (
													<Grid key={i} xs={3} item>
														<Link
															to={getAuctionPoolLink(nft.id, nft.category, nft.chainId, nft.poolId)}
														>
															<NFTCard nft={nft} hiddenStatus={true} />
														</Link>
													</Grid>
												))}
										</Grid>
									)}
								</>
							)}
							{showData.title === AuctionType.TokenAuction && (
								<>
									{loading ? (
										<TokenAuctionSkeleton />
									) : (
										<Stack
											spacing={isSm ? 8 : 18}
											direction={'row'}
											sx={{
												overflowX: 'scroll',
												'&::-webkit-scrollbar': {
													display: 'none',
												},
											}}
										>
											{data?.list?.map((fixedSwaptem: any, index: number) => (
												<Link
													key={index}
													to={getAuctionPoolLink(
														fixedSwaptem.id,
														fixedSwaptem.category,
														fixedSwaptem.chainId,
														fixedSwaptem.poolId,
													)}
												>
													<AuctionCard
														style={{ minWidth: 'unset' }}
														poolId={fixedSwaptem.poolId}
														title={fixedSwaptem.name}
														status={fixedSwaptem.status}
														claimAt={fixedSwaptem.claimAt}
														closeAt={fixedSwaptem.closeAt}
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
															symbol: fixedSwaptem.token0.symbol?.toUpperCase(),
															decimals: fixedSwaptem.token0.decimals,
															sold: fixedSwaptem.swappedAmount0,
															supply: fixedSwaptem.amountTotal0,
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
												</Link>
											))}
										</Stack>
									)}
								</>
							)}
						</Box>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexFlow: 'row nowrap',
								justifyContent: 'center',
								'@media(max-width:1440px)': {
									width: '100vw',
								},
							}}
						>
							<Button
								href={AuctionList[currentIndex].checkAllLink}
								variant="contained"
								sx={{
									// background: 'var(--ps-yellow-1)',
									padding: '16px 20px',
								}}
							>
								View all auctions
							</Button>
						</Box>
					</Box>
				</>
			)}
		</Box>
	)
}

export default TokenAuction
