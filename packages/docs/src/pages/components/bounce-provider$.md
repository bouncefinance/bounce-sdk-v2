---
title: Bounce Provider
subGroup: others
---

# Bounce Provider

## usage

Define global state such as chainId, getLibrary, etc. This component provides a configuration to all React components underneath itself via the context API. In the render tree all components will have access to the provided config.

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

## API

### BounceProviderProps

<TsInfo src="@bouncefinance/ui/index.d.ts" name="BounceProviderProps" />

### IMainContext

<TsInfo src="@bouncefinance/ui/index.d.ts" name="IMainContext" />
