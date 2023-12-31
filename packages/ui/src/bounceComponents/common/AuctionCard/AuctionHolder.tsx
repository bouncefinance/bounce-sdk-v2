import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import VerifiedIcon from '../VerifiedIcon'
import DefaultAvatarSVG from '../../../assets/imgs/profile/yellow_avatar.svg'
import { VerifyStatus } from '../../../api/profile/type'

export interface AuctionHolderProps {
	avatar: string
	name: string
	description: string
	href: string
	isVerify: VerifyStatus
}

export const AuctionHolder: React.FC<AuctionHolderProps> = ({
	avatar,
	description,
	name,
	href,
	isVerify,
}) => {
	// const navigate = useNavigate()
	return (
		<Stack
			direction="row"
			alignItems="center"
			spacing={12}
			onClick={(ev) => {
				ev.preventDefault()
				// navigate(href)
			}}
			sx={{
				px: 10,
				py: 6,
				mt: 20,
				bgcolor: 'var(--ps-gray-50)',
				borderRadius: 12,
				'&:hover': { bgcolor: 'var(--ps-gray-200)' },
			}}
		>
			<Avatar src={avatar || DefaultAvatarSVG} sx={{ width: 52, height: 52 }} />
			<Stack spacing={4}>
				<Stack direction="row" alignItems="center" spacing={8}>
					<Typography variant="h6">{name}</Typography>
					<VerifiedIcon isVerify={isVerify} />
				</Stack>

				<Typography
					variant="body2"
					color="var(--ps-gray-700)"
					display="-webkit-box"
					textOverflow="ellipsis"
					overflow="hidden"
					height={15}
					sx={{
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: 1,
						wordBreak: 'break-all',
					}}
				>
					{description}
				</Typography>
			</Stack>
		</Stack>
	)
}

export default AuctionHolder
