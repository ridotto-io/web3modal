import { createWeb3Modal } from '@ridotto-io/w3-wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { Web3ModalButtons } from '../../components/Web3ModalButtons'
import { WagmiTests } from '../../components/Wagmi/WagmiTests'
import { ThemeStore } from '../../utils/StoreUtil'
import { getWagmiConfig } from '../../utils/WagmiConstants'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { WagmiModalInfo } from '../../components/Wagmi/WagmiModalInfo'

const queryClient = new QueryClient()

const wagmiConfig = getWagmiConfig('default')

const modal = createWeb3Modal({
  wagmiConfig,
  projectId: ConstantsUtil.ProjectId,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  termsConditionsUrl: 'https://walletconnect.com/terms',
  privacyPolicyUrl: 'https://walletconnect.com/privacy',
  customWallets: ConstantsUtil.CustomWallets
})

ThemeStore.setModal(modal)

export default function Wagmi() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3ModalButtons />
        <WagmiModalInfo />
        <WagmiTests />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
