import { Token } from '@/bounceComponents/fixed-swap/type'
import { ChainId } from '@/constants/chain'
import { Moment } from 'moment'

// type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export enum CreationStep {
	'TOKEN_INFORMATION',
	'AUCTION_PARAMETERS',
	'ADVANCED_SETTINGS',
	'CREATION_CONFIRMATION',
}

export enum IReleaseType {
	Instant, // 0
	Cliff, // 1
	Linear, // 2
	Fragment, // 3
}

export interface IReleaseData {
	startAt: Moment | null
	// entAt in timestamp or ratio in 1e18
	endAt?: Moment | null
	ratio?: string
}

export interface NFTToken {
	// address: string
	// chainId?: number
	// tokenId?: number
	// logoURI?: string
	// name?: string
	// symbol?: string
	// tokenUrl?: string
	// dangerous?: boolean
	contractAddr?: string
	contractName?: string
	tokenId?: string
	balance?: string
	name?: string
	description?: string
	image?: string
}

export type CompletedSteps = { [k: number]: boolean }

export enum ParticipantStatus {
	'Public' = 'PUBLIC',
	'Whitelist' = 'WHITELIST',
}

export enum AllocationStatus {
	'NoLimits' = 'NO_LIMITS',
	'Limited' = 'LIMITED',
}
export enum TokenType {
	ERC20 = 'ERC20',
	ERC1155 = 'ERC1155',
	ERC721 = 'ERC721',
}

export enum AuctionType {
	ENGLISH_AUCTION = 'English Auction',
	FIXED_PRICE = 'fixed-price',
	RANDOM_SELECTION = 'random-selection',
}

export interface AuctionPool {
	tokenType: TokenType
	nftTokenFrom: NFTToken
	nft721TokenFrom: NFTToken[]
	auctionChainId?: string
	tokenFrom: Token
	tokenTo: Token
	swapRatio: string
	poolSize: string
	allocationPerWallet: string
	allocationStatus: AllocationStatus
	poolName: string
	startTime: Moment | null
	endTime: Moment | null
	shouldDelayUnlocking: boolean
	delayUnlockingTime: Moment | null
	releaseType: IReleaseType | 1000
	releaseDataArr: IReleaseData[]
	whitelist: string[]
	activeStep: CreationStep
	completed: CompletedSteps
	participantStatus: ParticipantStatus
	priceFloor?: string
	amountMinIncr1?: string
	auctionType?: AuctionType
	winnerNumber?: number
	ticketPrice?: string
	maxParticipantAllowed?: number
	enableReverse?: boolean
	auctionInChainId: ChainId
	launchPad?: boolean
}
