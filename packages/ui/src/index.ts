export * from './components'
export * from './bounceComponents'
export * from './Provider'

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
