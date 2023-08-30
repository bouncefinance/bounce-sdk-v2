---
title: Getting Started # 配置页面标题,同时生成 <title> 标签
description: Overview # 配置页面简介，同时用于生成 <meta> 标签
keywords: [Overview] # 配置页面关键词，同时用于生成 <meta> 标签
order: 0
---

# Getting Started

The @bouncefinance/hooks package provides abundant hooks written in TypeScript with predictable static types to facilitate development.

## Installation

Install the package using pnpm:

```bash
$ pnpm add @bouncefinance/hooks
```

## Setup

Integrate BounceProvider component at the root of your app. You may also configure global states like account and chainId here.

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

Import and utilize hooks as needed, such as usePoolInfo.

```ts
import { usePoolInfo } from '@bouncefinance/hooks'
```
