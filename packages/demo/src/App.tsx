import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ActionButton, SelectButton, AuctionCard, } from '@testpkgs/bounce-ui'
function App() {
	const [count, setCount] = useState(0)
	const props = {
		categoryName: 'Dutch Auction',
		chainId: 5,
		claimAt: 1688443200,
		closeAt: 1688400000,
		dateStr: 1688400000,
		holder: <SelectButton>fdhdfsdg</SelectButton>, // 这里需要替换为适当的 React 元素
		listItems: <SelectButton>fdhdfsdg</SelectButton>, // 这里需要替换为适当的 React 元素
		poolId: '4',
		progress: {
			symbol: 'HOPE',
			decimals: 18,
			sold: '0',
			supply: '900000000000000000000',
		},
		status: 2,
		style: { minWidth: 'unset' },
		title: 'feifei',
		whiteList: 'Public',
	}
	return (
		<>
			<SelectButton>fdhdfsdg</SelectButton>
			<ActionButton onAction={() => {}} actionText="fdhdfsdg" />
			<AuctionCard {...props} />
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
