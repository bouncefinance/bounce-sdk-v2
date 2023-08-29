---
title: Getting Started # 配置页面标题,同时生成 <title> 标签
description: Overview # 配置页面简介，同时用于生成 <meta> 标签
keywords: [Overview] # 配置页面关键词，同时用于生成 <meta> 标签
order: 0
---

# Getting Started

The @bounce/hooks package provides many hooks. Written in TypeScript with predictable static types

## Installation

Install the package using pnpm:

```bash
$ pnpm add ahooks
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

Import and use any components you need, such as usePoolInfo.

```ts
import { usePoolInfo } from 'ahooks'
```
