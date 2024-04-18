import { AssetUtil, CoreHelperUtil, NetworkController } from '@ridotto-io/w3-core'
import { customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import styles from './styles.js'
import { W3mFrameHelpers, W3mFrameRpcConstants } from '@ridotto-io/w3-wallet'

@customElement('w3m-wallet-compatible-networks-view')
export class W3mWalletCompatibleNetworksView extends LitElement {
  public static override styles = styles

  // -- Render -------------------------------------------- //
  public override render() {
    return html` <wui-flex
      flexDirection="column"
      .padding=${['xs', 's', 'm', 's'] as const}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  networkTemplate() {
    const { approvedCaipNetworkIds, requestedCaipNetworks, caipNetwork } = NetworkController.state
    const isNetworkEnabledForSmartAccounts = NetworkController.checkIfSmartAccountEnabled()
    const preferredAccountType = W3mFrameHelpers.getPreferredAccountType()

    let sortedNetworks = CoreHelperUtil.sortRequestedNetworks(
      approvedCaipNetworkIds,
      requestedCaipNetworks
    )

    // For now, each network has a unique account
    if (
      isNetworkEnabledForSmartAccounts &&
      preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
    ) {
      if (!caipNetwork) {
        return null
      }
      sortedNetworks = [caipNetwork]
    }

    return sortedNetworks.map(
      network => html`
        <wui-list-network
          imageSrc=${ifDefined(AssetUtil.getNetworkImage(network))}
          name=${network.name ?? 'Unknown'}
          ?transparent=${true}
        >
        </wui-list-network>
      `
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-wallet-compatible-networks-view': W3mWalletCompatibleNetworksView
  }
}
