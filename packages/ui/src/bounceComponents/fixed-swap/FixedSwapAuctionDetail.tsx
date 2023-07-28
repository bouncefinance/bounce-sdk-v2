import { Box, Container, Stack } from '@mui/material'

import CreatorMainBlock from '@/bounceComponents/fixed-swap/MainBlock/CreatorMainBlock'
import CreatorInfoCard, {
	CreatorInfoCardProps,
} from '@/bounceComponents/fixed-swap/CreatorInfoCard'
import ActionHistory from '@/bounceComponents/fixed-swap/ActionHistory'
import Header from '@/bounceComponents/fixed-swap/Header'
import UserMainBlock from '@/bounceComponents/fixed-swap/MainBlock/UserMainBlock'
import usePoolInfo from '@/bounceHooks/auction/usePoolInfo'
import { BounceAnime } from '@/bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from '@/hooks'
import { useCurrentRegionBlock } from '@/state/application/hooks'
import NoService from '@/components/NoService'
import { useBreakpoint } from '@/hooks'
import { PoolInfoParams } from '@/types'
import { FC } from 'react'
import { withBounceTheme } from '@/global'

export interface FixedSwapAuctionDetailProps
	extends Required<PoolInfoParams>,
		Pick<CreatorInfoCardProps, 'onClickAvatar' | 'onClickUsername'> {}

export const FixedSwapAuctionDetail: FC<FixedSwapAuctionDetailProps> = withBounceTheme((props) => {
	const { onClickAvatar, onClickUsername, ...rest } = props
	const { account } = useActiveWeb3React()
	const { data: poolInfo, run: getPoolInfo } = usePoolInfo(rest)
	const isBlock = useCurrentRegionBlock(poolInfo?.ethChainId, poolInfo?.poolId)
	const isMobile = useBreakpoint('lg')

	if (isBlock) {
		return <NoService />
	}

	if (!poolInfo) {
		return (
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
		)
	}

	return (
		<Container maxWidth="lg">
			<Box sx={{ mt: 60 }}>
				<Header poolInfo={poolInfo} getPoolInfo={getPoolInfo} />

				<Box sx={{ mt: 40, display: isMobile ? 'block' : 'flex', columnGap: 20 }}>
					{!isMobile && (
						<CreatorInfoCard
							poolInfo={poolInfo}
							creator={poolInfo.creator}
							getPoolInfo={getPoolInfo}
							creatorUserInfo={poolInfo.creatorUserInfo}
							onClickAvatar={onClickAvatar}
							onClickUsername={onClickUsername}
						/>
					)}

					<Stack sx={{ flex: 1 }} spacing={20}>
						{account === poolInfo.creator ? (
							<CreatorMainBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
						) : (
							<UserMainBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
						)}

						<ActionHistory
							backedChainId={poolInfo.chainId}
							category={poolInfo.category}
							poolId={poolInfo.poolId}
						/>
					</Stack>
					{isMobile && (
						<CreatorInfoCard
							poolInfo={poolInfo}
							creator={poolInfo.creator}
							getPoolInfo={getPoolInfo}
							creatorUserInfo={poolInfo.creatorUserInfo}
						/>
					)}
				</Box>
			</Box>
		</Container>
	)
})
