<<<<<<< HEAD
import { Center, Text, VStack } from '@chakra-ui/react'
import { NetworksButton } from '../../components/NetworksButton'
import { EthersConnectButton } from '../../components/Ethers/EthersConnectButton'
import { createWeb3Modal, defaultConfig } from '@ridotto-io/w3-ethers/react'
=======
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
>>>>>>> upstream/V3
import { ThemeStore } from '../../utils/StoreUtil'
import { EthersConstants } from '../../utils/EthersConstants'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { EthersTests } from '../../components/Ethers/EthersTests'
import { Web3ModalButtons } from '../../components/Web3ModalButtons'

const modal = createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata: ConstantsUtil.Metadata,
    defaultChainId: 1,
    rpcUrl: 'https://cloudflare-eth.com',
    enableEmail: true
  }),
  chains: EthersConstants.chains,
  projectId: ConstantsUtil.ProjectId,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  termsConditionsUrl: 'https://walletconnect.com/terms',
  privacyPolicyUrl: 'https://walletconnect.com/privacy'
})

ThemeStore.setModal(modal)

export default function Ethers() {
  return (
    <>
      <Web3ModalButtons />
      <EthersTests />
    </>
  )
}
