<<<<<<< HEAD
import { Center, Text, VStack } from '@chakra-ui/react'
import { createWeb3Modal, defaultWagmiConfig } from '@ridotto-io/w3-wagmi/react'
import { useEffect, useState } from 'react'
=======
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
>>>>>>> upstream/V3
import { WagmiConfig } from 'wagmi'
import { Web3ModalButtons } from '../../components/Web3ModalButtons'
import { WagmiTests } from '../../components/Wagmi/WagmiTests'
import { ThemeStore } from '../../utils/StoreUtil'
<<<<<<< HEAD
import type { SIWEVerifyMessageArgs, SIWECreateMessageArgs, SIWESession } from '@ridotto-io/w3-core'
import { createSIWEConfig } from '@ridotto-io/w3-siwe'
import { TestIdSiweAuthenticationStatus } from '../../constants'

// 1. Get projectId
const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const chains = [
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  bsc,
  optimism,
  gnosis,
  zkSync,
  zora,
  base,
  celo,
  aurora
]

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Laboratory',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
=======
import { WagmiConstantsUtil } from '../../utils/WagmiConstants'
import { SiweData } from '../../components/Siwe/SiweData'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { siweConfig } from '../../utils/SiweUtils'
>>>>>>> upstream/V3

export const wagmiConfig = defaultWagmiConfig({
  chains: WagmiConstantsUtil.chains,
  projectId: ConstantsUtil.ProjectId,
  metadata: ConstantsUtil.Metadata
})

const modal = createWeb3Modal({
  wagmiConfig,
  projectId: ConstantsUtil.ProjectId,
  chains: WagmiConstantsUtil.chains,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  siweConfig
})

ThemeStore.setModal(modal)

export default function Wagmi() {
  return (
    <WagmiConfig config={wagmiConfig}>
<<<<<<< HEAD
      <Center paddingTop={10}>
        <Text fontSize="xl" fontWeight={700}>
          Wagmi with SIWE
        </Text>
      </Center>
      <Center h="65vh">
        <VStack gap={4}>
          <Text data-testid={TestIdSiweAuthenticationStatus}>Status: {status}</Text>
          {session && (
            <>
              <Text>Network: eip155:{session.chainId}</Text>
              <VStack>
                <Text>Address:</Text>
                <Text isTruncated={true} fontSize="sm">
                  {session.address}
                </Text>
              </VStack>
            </>
          )}
          <WagmiConnectButton />
          <NetworksButton />
        </VStack>
      </Center>
=======
      <Web3ModalButtons />
      <SiweData />
      <WagmiTests />
>>>>>>> upstream/V3
    </WagmiConfig>
  )
}
