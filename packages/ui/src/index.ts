export type { IMainContext } from './context'

export { TypesOfAuctionOverview } from './components'

export {
	AuctionCard,
	CreateAuctionPool,
	AuctionHolder,
	AuctionListItem,
	TokenType,
	AuctionType,
	FixedSwapAuctionDetail,
	RandomSelectionAuctionDetail,
} from './bounceComponents'
export type {
	AuctionCardProps,
	CreateAuctionPoolProps,
	FixedSwapAuctionDetailProps,
	RandomSelectionAuctionDetailProps,
} from './bounceComponents'
export { BounceProvider } from './global'
export type { BounceProviderProps } from './global'
export { PoolStatus, PoolType } from './api'
export { BackedTokenType } from './enums'
export {
	usePoolInfo,
	use1155TokenList,
	useBackedPoolInfo,
	useDashboardStat,
	useCreatorClaim,
} from './bounceHooks'
export type { PoolInfoParams } from './types'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import 'inter-ui'
// import { StyledEngineProvider } from '@mui/material'
// import { MuiThemeProvider } from './themes'
// import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'
// import Blocklist from './components/essential/Blocklist'
// import { NetworkContextName } from './constants'
// import App from './pages/App'
// import store from './state'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
// import ApplicationUpdater from './state/application/updater'
// import MulticallUpdater from './state/multicall/updater'
// import TransactionUpdater from './state/transactions/updater'
// import getLibrary from './utils/getLibrary'
// import { Buffer } from 'buffer'

// function Updaters() {
//   return (
//     <>
//       <ApplicationUpdater />
//       <TransactionUpdater />
//       <MulticallUpdater />
//     </>
//   )
// }
// window.Buffer = window.Buffer || Buffer

// const container = document.getElementById('root')
// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// const root = createRoot(container!)

// root.render(
//   <StrictMode>
//     <Web3ReactProvider getLibrary={getLibrary}>
//       <Web3ProviderNetwork getLibrary={getLibrary}>
// <BounceProvider  getLibrary={getLibrary}>
//         <Blocklist>
//           <Provider store={store}>
//             <Updaters />
//             <StyledEngineProvider injectFirst>
//               <MuiThemeProvider>
//                 <BrowserRouter>
//                   <App />
//                 </BrowserRouter>
//               </MuiThemeProvider>
//             </StyledEngineProvider>
//           </Provider>
//         </Blocklist>
// <BounceProvider>
//       </Web3ProviderNetwork>
//     </Web3ReactProvider>
//   </StrictMode>
// )

// serviceWorkerRegistration.unregister()
