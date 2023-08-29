---
title: Getting Started # 配置页面标题,同时生成 <title> 标签
description: Overview # 配置页面简介，同时用于生成 <meta> 标签
keywords: [Overview] # 配置页面关键词，同时用于生成 <meta> 标签
order: 0
---

# Getting Started

The @bounce/ui package provides React components for easily integrating BounceFinance into your application.

## Installation

Install the package using pnpm:

```bash
pnpm add @bounce/ui
```

## Setup

Add the BounceProvider component to your app's root. You can also define some global state here, such as account and chainId.

```tsx
import { BounceProvider } from '@bouncefinance/ui'

export default () => {
	return (
		<BounceProvider
			getLibrary={(provider) => new Web3Provider(provider, 'any')}
			account="0x..."
			chainId="5"
		>
			<YourApp />
		</BounceProvider>
	)
}
```

## Usage

Import and use any components you need, such as CreateAuctionPool.

```tsx
import { CreateAuctionPool, TokenType, AuctionType, BounceProvider } from '@bouncefinance/ui'
import { Web3Provider } from '@ethersproject/providers'

export default () => {
	return (
		<>
			<BounceProvider
				getLibrary={(provider) => new Web3Provider(provider, 'any')}
				account="0x88888888B0A018D28947b7FbDe08E0B408de9f70"
			>
				<CreateAuctionPool
					tokenType={TokenType.ERC20}
					auctionType={AuctionType.FIXED_PRICE}
					auctionInChainId={1}
				/>
			</BounceProvider>
		</>
	)
}
```

You will then see:
<Demo src="./fixed-swap-auction/create-erc20-auction-pool/demos/basic.tsx" />

The components are designed to work seamlessly together while allowing extensive customization through props.
