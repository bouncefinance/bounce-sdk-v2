import { Stack, SxProps, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'

export interface AuctionStatusProps {
	status: string
	dateStr: string // 12:12:00
}

const statusText: { [key in string]: string } = {
	Upcoming: 'Upcoming in',
}

const statusSx: { [key in string]: any } = {
	Live: {
		color: '#259C4A',
		bgcolor: '#D4F5DE',
	},
	Upcoming: {},
	Closed: {
		color: 'var(--ps-blue)',
		bgcolor: 'rgba(38, 99, 255, 0.15)',
	},
	Cancelled: {
		color: 'var(--ps-blue)',
		bgcolor: 'rgba(38, 99, 255, 0.15)',
	},
}

export const AuctionStatus: React.FC<AuctionStatusProps> = ({ status, dateStr }) => {
	return (
		<Stack
			sx={{ ...styles.statusTag, ...(statusSx ? statusSx[status] : {}) } as SxProps}
			direction="row"
			alignItems="center"
			spacing={8}
		>
			<Typography variant="body2">
				{statusText[status] || status}
				{dateStr}
			</Typography>
		</Stack>
	)
}
