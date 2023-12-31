import { Card, CardHeader, Chip, Stack, Typography } from '@mui/material'
import React, { CSSProperties, ReactNode } from 'react'
import { useCountDown } from 'ahooks'
import moment from 'moment'
import Image from '../../../components/Image'
import { AuctionProgress, AuctionProgressProps } from './AuctionProgress'
import styles from './styles'
import PoolStatusBox from '@/bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { PoolStatus } from '@/api/pool/type'
import { ChainId, ChainListMap } from '@/constants/chain'
import { withBounceTheme } from '@/global'
import useChainConfigInBackend from '@/bounceHooks/web3/useChainConfigInBackend'

export type AuctionCardProps = {
	/**
	 * pool id
	 */
	poolId: string
	/**
	 * pool status
	 */
	status: PoolStatus
	dateStr: number
	/**
	 * auction title
	 */
	title: string
	holder?: ReactNode
	progress?: Omit<AuctionProgressProps, 'status'>
	listItems?: ReactNode
	claimAt: number
	closeAt: number
	categoryName: string
	isMe?: boolean
	creatorClaimed?: boolean
	participantClaimed?: boolean
	isCreator?: boolean
	whiteList: string
	style?: CSSProperties
	chainId: number
}

export const AuctionCard: React.FC<AuctionCardProps> = withBounceTheme(
	({
		status,
		dateStr,
		title,
		poolId,
		closeAt,
		holder,
		categoryName,
		isMe,
		whiteList,
		creatorClaimed,
		participantClaimed,
		isCreator,
		progress,
		listItems,
		style,
		claimAt,
		chainId,
	}) => {
		// const chainConfigInBackend = useContext()
		const chainConfigInBackend = useChainConfigInBackend('id', chainId)
		console.log('🚀 ~ chainConfigInBackend:', chainConfigInBackend)
		const [, { days, hours, minutes, seconds }] = useCountDown({ targetDate: claimAt * 1000 })

		const showClaim = () => {
			if (
				(isCreator && !creatorClaimed) ||
				(!isCreator && closeAt === claimAt && !participantClaimed) ||
				(!isCreator && claimAt > closeAt && claimAt < moment().unix() && !participantClaimed)
			) {
				return (
					<Typography variant="body1" component="span">
						Need to claim token
					</Typography>
				)
			}
			if (!isCreator && closeAt < claimAt && moment().unix() < claimAt) {
				return (
					<Typography variant="body1" component="span">
						Start to claim &nbsp;in {days}d : {hours}h : {minutes}m : {seconds}s
					</Typography>
				)
			}

			return null
		}

		return (
			<Card
				sx={{
					...styles.card,
					'../../..media(max-width:380px)': {
						width: 'calc(100vw - 16px - 50px)',
						minWidth: '0 !important',
					},
				}}
				elevation={0}
				style={{
					minWidth: 355,
					cursor: 'pointer',
					...style,
				}}
			>
				<Stack direction="row" justifyContent="space-between" spacing={6} alignItems="center">
					<Typography>#{poolId}</Typography>
					<Stack direction="row" spacing={6} height={24} alignItems="center">
						{isMe &&
						status === 4 &&
						((isCreator && !creatorClaimed) ||
							(!isCreator && closeAt === claimAt && !participantClaimed) ||
							(!isCreator &&
								claimAt > closeAt &&
								claimAt < moment().unix() &&
								!participantClaimed) ||
							(!isCreator && closeAt < claimAt && moment().unix() < claimAt)) ? (
							<Chip
								label={showClaim()}
								sx={{
									height: 24,
									fontSize: 12,
									bgcolor: 'var(--ps-black)',
									color: 'var(--ps-white)',
								}}
							/>
						) : null}
						<PoolStatusBox
							claimAt={claimAt}
							status={status}
							closeTime={closeAt}
							openTime={dateStr}
						/>
					</Stack>
				</Stack>
				<CardHeader title={title} />
				<Stack direction="row" spacing={10} sx={{ pt: 10 }}>
					<Chip
						label={categoryName}
						color="info"
						sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
					/>
					<Chip
						label={whiteList}
						color="info"
						sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
					/>
					<Chip
						icon={
							<Image
								src={
									chainConfigInBackend?.ethChainId
										? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.logo || ''
										: ''
								}
								width={12}
								height={12}
								alt={chainConfigInBackend?.shortName}
							/>
						}
						label={
							chainConfigInBackend?.ethChainId
								? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.name || ''
								: '-'
						}
						color="info"
						sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
					/>
				</Stack>
				<div>{holder}</div>
				{progress && <AuctionProgress status={status} {...progress} />}
				<Stack spacing={12} sx={{ pt: 20, px: 0, m: 0, whiteSpace: 'nowrap' }} component="ul">
					{listItems}
				</Stack>
			</Card>
		)
	},
)

export default AuctionCard
