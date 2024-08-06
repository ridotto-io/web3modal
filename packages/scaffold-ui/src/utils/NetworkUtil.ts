import { OptionsController, RouterUtil } from '@ridotto-io/w3-core'

export const NetworkUtil = {
  onNetworkChange: async () => {
    if (OptionsController.state.isSiweEnabled) {
      const { SIWEController } = await import('@ridotto-io/w3-siwe')
      if (SIWEController.state._client?.options?.signOutOnNetworkChange) {
        await SIWEController.signOut()
      } else {
        RouterUtil.navigateAfterNetworkSwitch()
      }
    } else {
      RouterUtil.navigateAfterNetworkSwitch()
    }
  }
}
