import { DEFAULT_SESSION_PARAMS } from './shared/constants'
import { testMW } from './shared/fixtures/w3m-wallet-fixture'

<<<<<<< HEAD
testMW.beforeEach(async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
  await modalPage.copyConnectUriToClipboard()
  await walletPage.connect()
  await walletPage.handleSessionProposal(DEFAULT_SESSION_PARAMS)
  await modalValidator.expectConnected()
  await walletValidator.expectConnected()
})

testMW.afterEach(async ({ modalPage, modalValidator, walletValidator }) => {
=======
testMW.beforeEach(
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      return
    }
    await modalPage.copyConnectUriToClipboard()
    await walletPage.connect()
    await walletPage.handleSessionProposal(DEFAULT_SESSION_PARAMS)
    await modalValidator.expectConnected()
    await walletValidator.expectConnected()
  }
)

testMW.afterEach(async ({ modalPage, modalValidator, walletValidator, browserName }) => {
  // Webkit cannot use clipboard.
  if (browserName === 'webkit') {
    return
  }
>>>>>>> upstream/V3
  await modalPage.disconnect()
  await modalValidator.expectDisconnected()
  await walletValidator.expectDisconnected()
})

<<<<<<< HEAD
testMW('it should sign', async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
  await modalPage.sign()
  await walletValidator.expectReceivedSign({})
  await walletPage.handleRequest({ accept: true })
  await modalValidator.expectAcceptedSign()
})

testMW(
  'it should reject sign',
  async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
=======
testMW(
  'it should sign',
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      testMW.skip()

      return
    }
    await modalPage.sign()
    await walletValidator.expectReceivedSign({})
    await walletPage.handleRequest({ accept: true })
    await modalValidator.expectAcceptedSign()
  }
)

testMW(
  'it should reject sign',
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      testMW.skip()

      return
    }
>>>>>>> upstream/V3
    await modalPage.sign()
    await walletValidator.expectReceivedSign({})
    await walletPage.handleRequest({ accept: false })
    await modalValidator.expectRejectedSign()
  }
)

testMW(
  'it should switch networks and sign',
<<<<<<< HEAD
  async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
=======
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      testMW.skip()

      return
    }
>>>>>>> upstream/V3
    let targetChain = 'Polygon'
    await modalPage.switchNetwork(targetChain)
    await modalPage.sign()
    await walletValidator.expectReceivedSign({ chainName: targetChain })
    await walletPage.handleRequest({ accept: true })
    await modalValidator.expectAcceptedSign()

    // Switch to Ethereum
    targetChain = 'Ethereum'
    await modalPage.switchNetwork(targetChain)
    await modalPage.sign()
    await walletValidator.expectReceivedSign({ chainName: targetChain })
    await walletPage.handleRequest({ accept: true })
    await modalValidator.expectAcceptedSign()
  }
)
