'use client'

import type { Web3ModalOptions } from '../src/client.js'
import { Web3Modal } from '../src/client.js'
import { ConstantsUtil } from '@ridotto-io/w3-scaffold-utils'
import { EthersStoreUtil } from '@ridotto-io/w3-scaffold-utils/ethers'
import { getWeb3Modal } from '@ridotto-io/w3-scaffold-react'
import { useSnapshot } from 'valtio'
import type { Eip1193Provider } from 'ethers'

// -- Types -------------------------------------------------------------------
export type { Web3ModalOptions } from '../src/client.js'

// -- Setup -------------------------------------------------------------------
let modal: Web3Modal | undefined = undefined

export function createWeb3Modal(options: Web3ModalOptions) {
  if (!modal) {
    modal = new Web3Modal({
      ...options,
      _sdkVersion: `react-ethers-${ConstantsUtil.VERSION}`
    })
  }
  getWeb3Modal(modal)

  return modal
}

// -- Hooks -------------------------------------------------------------------
export function useWeb3ModalProvider() {
  const { provider, providerType } = useSnapshot(EthersStoreUtil.state)

  const walletProvider = provider as Eip1193Provider | undefined
  const walletProviderType = providerType

  return {
    walletProvider,
    walletProviderType
  }
}

export function useDisconnect() {
  async function disconnect() {
    await modal?.disconnect()
  }

  return {
    disconnect
  }
}

export function useSwitchNetwork() {
  async function switchNetwork(chainId: number) {
    await modal?.switchNetwork(chainId)
  }

  return {
    switchNetwork
  }
}

export function useWeb3ModalAccount() {
  const { address, isConnected, chainId, status } = useSnapshot(EthersStoreUtil.state)

  return {
    address,
    isConnected,
    chainId,
    status
  }
}

export function useWeb3ModalError() {
  const { error } = useSnapshot(EthersStoreUtil.state)

  return {
    error
  }
}

export {
  useWeb3ModalTheme,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents,
  useWalletInfo
} from '@ridotto-io/w3-scaffold-react'

// -- Universal Exports -------------------------------------------------------
export { defaultConfig } from '../src/utils/defaultConfig.js'
