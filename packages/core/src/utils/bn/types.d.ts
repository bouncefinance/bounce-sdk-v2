import 'bignumber.js'
declare module 'bignumber.js' {
	interface BigNumber {
		toBigInt: (this: BigNumber) => bigint
		toSignificant: (this: BigNumber, groupSeparator?: string) => string
		toHex: (this: BigNumber) => `0x${string}`
	}
}
