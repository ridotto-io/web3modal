'use client'

import { useSnapshot } from 'valtio'
import { ConstantsUtil } from '@ridotto-io/w3-scaffold-utils'
import { getWeb3Modal } from '@ridotto-io/w3-scaffold-react'

import { Web3Modal } from '../src/client.js'

import type { Web3ModalOptions } from '../src/client.js'
import type { Provider } from '../src/utils/scaffold/SolanaTypesUtil.js'
import { SolStoreUtil } from '../src/utils/scaffold/SolanaStoreUtil.js'

// -- Setup -------------------------------------------------------------------
let modal: Web3Modal | undefined = undefined

export function createWeb3Modal(options: Web3ModalOptions) {
  if (!modal) {
    modal = new Web3Modal({
      ...options,
      _sdkVersion: `react-solana-${ConstantsUtil.VERSION}`
    })
  }
  getWeb3Modal(modal)

  return modal
}

// -- Hooks -------------------------------------------------------------------
export function useWeb3ModalProvider() {
  const { provider, providerType, connection } = useSnapshot(SolStoreUtil.state)

  return {
    walletProvider: provider as Provider,
    walletProviderType: providerType,
    connection
  }
}

export function useDisconnect() {
  function disconnect() {
    modal?.disconnect()
  }

  return {
    disconnect
  }
}

export function useWeb3ModalAccount() {
  const { address, isConnected, chainId, currentChain } = useSnapshot(SolStoreUtil.state)

  return {
    address,
    isConnected,
    currentChain,
    chainId
  }
}

export {
  useWeb3ModalTheme,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents
} from '@ridotto-io/w3-scaffold-react'

// -- Universal Exports -------------------------------------------------------
export { defaultSolanaConfig } from '../src/utils/defaultConfig.js'
