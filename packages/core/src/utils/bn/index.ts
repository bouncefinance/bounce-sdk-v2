import BigNumber from 'bignumber.js'
import { isBigInt } from '../is'

type TargetValue = BigNumber | number | string | bigint

BigNumber.config({ EXPONENTIAL_AT: [-8, 30] })

const applyFunction: Pick<BigNumber, 'toSignificant' | 'toBigInt' | 'toHex'> = {
	toSignificant: function (groupSeparator = ',') {
		return this.toFormat({ groupSeparator, groupSize: 3, decimalSeparator: '.' })
	},
	toBigInt: function () {
		return BigInt(this.toString())
	},
	toHex: function () {
		let hex = this.dp(0).toString(16)
		if (hex === `0`) return `0x`
		return `0x${hex}`
	},
}

Object.assign(BigNumber.prototype, applyFunction)

export const bnUtils = {
	wrap: (tar: TargetValue) => {
		return new BigNumber(isBigInt(tar) ? tar.toString() : tar)
	},
	toWei: (tar: TargetValue, decimals: number) => {
		return bnUtils.wrap(tar).times(new BigNumber(10).pow(decimals))
	},
	fromWei: (tar: TargetValue, decimals: number) => {
		return bnUtils.wrap(tar).div(new BigNumber(10).pow(decimals))
	},
}
