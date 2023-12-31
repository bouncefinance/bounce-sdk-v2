import { Box, Typography } from '@mui/material'
import { useEnglishAuctionPoolInfo } from '@/pages/auction/englishAuctionNFT/ValuesProvider'
import { useIsSMDown } from '@/themes/useTheme'

const PoolBaseInfo = () => {
	const isSm = useIsSMDown()
	const { data: poolInfo } = useEnglishAuctionPoolInfo()
	return (
		<Box
			sx={{
				width: isSm ? '100%' : '458px',
				marginBottom: isSm ? '43px' : '0',
			}}
		>
			<Typography
				sx={{
					fontFamily: `'Public Sans'`,
					fontWeight: 600,
					fontSize: isSm ? 20 : 28,
					color: '#fff',
					lineHeight: '34px',
					marginBottom: '16px',
				}}
			>
				{poolInfo?.name || '--'}
			</Typography>
			<Typography
				sx={{
					fontFamily: `'Public Sans'`,
					fontWeight: 600,
					fontSize: 14,
					color: 'var(--ps-text-2)',
					lineHeight: '34px',
					marginBottom: '16px',
				}}
			>
				NFT issued by foundo
			</Typography>
			<Box
				sx={{
					display: 'inline-block',
					height: '29px',
					lineHeight: '29px',
					padding: '0 12px',
					cursor: 'pointer',
					color: 'var(--ps-text-3)',
					borderRadius: '100px',
					background: '#fff',
					whiteSpace: 'nowrap',
					fontSize: isSm ? 13 : 14,
				}}
			>
				Physically Backed NFT
			</Box>
		</Box>
	)
}
export default PoolBaseInfo
