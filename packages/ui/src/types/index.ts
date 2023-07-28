import { PoolType } from '@/api/pool'

export interface PoolInfoParams {
	category?: PoolType
	backedId?: number
	poolId?: string
	chainShortName?: string
	sysId?: string
}
