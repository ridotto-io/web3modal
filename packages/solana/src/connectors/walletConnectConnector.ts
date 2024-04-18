import base58 from 'bs58'
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import type UniversalProvider from '@walletconnect/universal-provider'
import { OptionsController } from '@ridotto-io/w3-core'

import type { Connector } from './baseConnector.js'
import type { Chain } from '../utils/scaffold/SolanaTypesUtil.js'
import { SolStoreUtil } from '../utils/scaffold/SolanaStoreUtil.js'
import { UniversalProviderFactory } from './universalProvider.js'
import { BaseConnector } from './baseConnector.js'

export interface WalletConnectAppMetadata {
  name: string
  description: string
  url: string
  icons: string[]
}

export class WalletConnectConnector extends BaseConnector implements Connector {
  id = 'WalletConnect'
  name = 'WalletConnect'
  ready = true
  chains: Chain[]

  protected provider: UniversalProvider | undefined
  protected qrcode: boolean

  public constructor({
    relayerRegion,
    metadata,
    qrcode,
    chains
  }: {
    relayerRegion: string
    metadata: WalletConnectAppMetadata
    qrcode?: boolean
    chains: Chain[]
  }) {
    super()
    this.chains = chains
    this.qrcode = Boolean(qrcode)
    UniversalProviderFactory.setSettings({
      projectId: OptionsController.state.projectId,
      relayerRegion,
      metadata,
      qrcode: this.qrcode
    })

    UniversalProviderFactory.getProvider().then(provider => {
      provider.on('session_delete', () => {
        delete provider.session?.namespaces['solana']
      })
    })
  }

  public static readonly connectorName = 'walletconnect'

  public async disconnect() {
    const provider = await UniversalProviderFactory.getProvider()

    try {
      await provider.disconnect()
    } finally {
      delete provider.session?.namespaces['solana']
    }

    SolStoreUtil.setAddress('')
  }

  public override getConnectorName(): string {
    return WalletConnectConnector.connectorName
  }

  public override async getProvider() {
    const provider = await UniversalProviderFactory.getProvider()

    return provider
  }

  public async signMessage(message: Uint8Array) {
    const address = SolStoreUtil.state.address
    if (!address) {
      throw new Error('No signer connected')
    }

    const signedMessage = await this.request('solana_signMessage', {
      message: base58.encode(message),
      pubkey: address
    })
    const { signature } = signedMessage

    return signature
  }

  public async signVersionedTransaction(transaction: VersionedTransaction) {
    if (!SolStoreUtil.state.address) {
      throw new Error('No signer connected')
    }
    const transactionParams = {
      feePayer: new PublicKey(SolStoreUtil.state.address).toBase58(),
      instructions: transaction.message.compiledInstructions.map(instruction => ({
        ...instruction,
        data: base58.encode(instruction.data)
      })),
      recentBlockhash: transaction.message.recentBlockhash ?? ''
    }
    await this.request('solana_signTransaction', transactionParams)

    return { signatures: [{ signature: base58.encode(transaction.serialize()) }] }
  }

  public async signTransaction(transactionParam: Transaction | VersionedTransaction) {
    const version = (transactionParam as VersionedTransaction).version
    if (typeof version === 'number') {
      return this.signVersionedTransaction(transactionParam as VersionedTransaction)
    }
    const transaction = transactionParam as Transaction
    const transactionParams = {
      feePayer: transaction.feePayer?.toBase58() ?? '',
      instructions: transaction.instructions.map(instruction => ({
        data: base58.encode(instruction.data),
        keys: instruction.keys.map(key => ({
          isWritable: key.isWritable,
          isSigner: key.isSigner,
          pubkey: key.pubkey.toBase58()
        })),
        programId: instruction.programId.toBase58()
      })),
      recentBlockhash: transaction.recentBlockhash ?? ''
    }

    const res = await this.request('solana_signTransaction', transactionParams)
    transaction.addSignature(
      new PublicKey(SolStoreUtil.state.address ?? ''),
      Buffer.from(base58.decode(res.signature))
    )

    const validSig = transaction.verifySignatures()

    if (!validSig) {
      throw new Error('Signature invalid.')
    }

    return { signatures: [{ signature: base58.encode(transaction.serialize()) }] }
  }

  public async sendTransaction(transactionParam: Transaction | VersionedTransaction) {
    const encodedTransaction = (await this.signTransaction(transactionParam)) as {
      signatures: {
        signature: string
      }[]
    }
    const signedTransaction = base58.decode(encodedTransaction.signatures[0]?.signature ?? '')
    await SolStoreUtil.state.connection?.sendRawTransaction(signedTransaction)

    return base58.encode(signedTransaction)
  }

  /**
   * Connect to user's wallet.
   *
   * If `WalletConnectConnector` was configured with `qrcode = true`, this will
   * open a QRCodeModal, where the user will scan the qrcode and then this
   * function will resolve/return the address of the wallet.
   *
   * If `qrcode = false`, this will return the pairing URI used to generate the
   * QRCode.
   */
  public generateNamespaces(chainId: string) {
    const rpcs = this.chains.reduce<Record<string, string>>((acc, chain) => {
      acc[chain.chainId] = chain.rpcUrl

      return acc
    }, {})
    const chainsNamespaces = [`solana:${chainId}`]
    const rpcMap = {
      [chainId]: rpcs[chainId] ?? ''
    }

    return {
      solana: {
        chains: [...chainsNamespaces],
        methods: ['solana_signMessage', 'solana_signTransaction'],
        events: [],
        rpcMap
      }
    }
  }

  public async connect(useURI?: boolean) {
    const solanaNamespace = this.generateNamespaces(SolStoreUtil.state.currentChain?.chainId ?? '')

    const provider = await UniversalProviderFactory.getProvider()

    return new Promise<string>((resolve, reject) => {
      provider.on('display_uri', (uri: string) => {
        if (!(this.qrcode && !useURI)) {
          resolve(uri)
        }
      })
      // Without namespaces provider.enable() will not work (reconnect flow)
      provider
        .connect({
          pairingTopic: undefined,
          namespaces: solanaNamespace,
          optionalNamespaces: solanaNamespace
        })
        .then(providerResult => {
          if (!providerResult) {
            throw new Error('Failed connection.')
          }
          const address = providerResult.namespaces['solana']?.accounts[0]?.split(':')[2] ?? null
          if (address && this.qrcode) {
            resolve(address)
          } else {
            reject(new Error('Could not resolve address'))
          }
        })
    })
  }

  public async onConnector() {
    await this.connect()
  }
}
