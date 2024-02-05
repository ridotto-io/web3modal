import { DEFAULT_SESSION_PARAMS } from './shared/constants'
import { testMWSiwe } from './shared/fixtures/w3m-wallet-fixture'

<<<<<<< HEAD
testMWSiwe.beforeEach(async ({ modalPage, walletPage }) => {
=======
testMWSiwe.beforeEach(async ({ modalPage, walletPage, browserName }) => {
  // Webkit cannot use clipboard.
  if (browserName === 'webkit') {
    return
  }
>>>>>>> upstream/V3
  await modalPage.copyConnectUriToClipboard()
  await walletPage.connect()
  await walletPage.handleSessionProposal(DEFAULT_SESSION_PARAMS)
})

<<<<<<< HEAD
testMWSiwe.afterEach(async ({ modalValidator, walletValidator }) => {
=======
testMWSiwe.afterEach(async ({ modalValidator, walletValidator, browserName }) => {
  // Webkit cannot use clipboard.
  if (browserName === 'webkit') {
    return
  }
>>>>>>> upstream/V3
  await modalValidator.expectDisconnected()
  await walletValidator.expectDisconnected()
})

testMWSiwe(
  'it should sign in with ethereum',
<<<<<<< HEAD
  async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
=======
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      testMWSiwe.skip()

      return
    }
>>>>>>> upstream/V3
    await modalPage.promptSiwe()
    await walletValidator.expectReceivedSign({})
    await walletPage.handleRequest({ accept: true })
    await modalValidator.expectAuthenticated()
    await modalValidator.expectConnected()
    await walletValidator.expectConnected()
    await modalPage.disconnect()
  }
)

testMWSiwe(
  'it should reject sign in with ethereum',
<<<<<<< HEAD
  async ({ modalPage, walletPage, modalValidator, walletValidator }) => {
=======
  async ({ modalPage, walletPage, modalValidator, walletValidator, browserName }) => {
    // Webkit cannot use clipboard.
    if (browserName === 'webkit') {
      testMWSiwe.skip()

      return
    }
>>>>>>> upstream/V3
    await modalPage.promptSiwe()
    await walletValidator.expectReceivedSign({})
    await walletPage.handleRequest({ accept: false })
    await modalValidator.expectSignatureDeclined()
    await modalPage.cancelSiwe()
    await modalValidator.expectUnauthenticated()
  }
)
