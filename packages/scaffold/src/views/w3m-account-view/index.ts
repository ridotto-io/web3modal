import {
  AccountController,
  ConnectionController,
  CoreHelperUtil,
  EventsController,
  ModalController,
  NetworkController,
  RouterController,
  SnackController,
  ConnectorController,
  StorageUtil,
  AssetUtil
} from '@ridotto-io/w3-core'
import { UiHelperUtil, customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import { state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import styles from './styles.js'

@customElement('w3m-account-view')
export class W3mAccountView extends LitElement {
  public static override styles = styles

  // -- Members -------------------------------------------- //
  private usubscribe: (() => void)[] = []

  private readonly connectors = ConnectorController.state.connectors

  // -- State & Properties --------------------------------- //
  @state() private address = AccountController.state.address

  @state() private profileName = AccountController.state.profileName

  @state() private balance = AccountController.state.balance

  @state() private userName = AccountController.state.userName

  @state() private profileImage = AccountController.state.profileImage
  

  @state() private balanceSymbol = AccountController.state.balanceSymbol

  @state() private network = NetworkController.state.caipNetwork

  @state() private disconecting = false

  public constructor() {
    super()
    this.usubscribe.push(
      ...[
        AccountController.subscribe(val => {
          if (val.address) {
            this.address = val.address
            this.profileName = val.profileName
            this.balance = val.balance
            this.balanceSymbol = val.balanceSymbol
            this.userName = val.userName
            this.profileImage = val.profileImage
          } else {
            ModalController.close()
          }
        })
      ],
      NetworkController.subscribeKey('caipNetwork', val => {
        if (val?.id) {
          this.network = val
        }
      })
    )
  }

  public override disconnectedCallback() {
    this.usubscribe.forEach(unsubscribe => unsubscribe())
  }

  public getProfile() {
    return localStorage.getItem('RDT_profile')
  }

  private onClick() {
    const event = new CustomEvent('RDT_ON_SPAN_CLICK', {
      detail: { data: 'some data' },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  // -- Render -------------------------------------------- //
  public override render() {
    if (!this.address) {
      throw new Error('w3m-account-view: No account provided')
    }

    const networkImage = AssetUtil.getNetworkImage(this.network)

    return html`
      <wui-flex
        flexDirection="column"
        .padding=${['0', 's', 'm', 's'] as const}
        alignItems="center"
        gap="l"
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${this.profileImage}
        ></wui-avatar>
        <wui-text variant="large-600" color="fg-100">${this.userName}</wui-text>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="large-600" color="fg-100">
              ${this.profileName
        ? UiHelperUtil.getTruncateString({
          string: this.profileName,
          charsStart: 20,
          charsEnd: 0,
          truncate: 'end'
        })
        : UiHelperUtil.getTruncateString({
          string: this.address,
          charsStart: 4,
          charsEnd: 6,
          truncate: 'middle'
        })}

            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
          <wui-flex gap="s" flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-200">
              ${CoreHelperUtil.formatBalance(this.balance, this.balanceSymbol)}
            </wui-text>

            ${this.explorerBtnTemplate()}
          </wui-flex>
        </wui-flex>
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${['0', 's', 's', 's'] as const}>
        ${this.emailCardTemplate()}
        <a
        href="/profile"
        style="text-decoration: none;"
      >
        <wui-list-item
        .variant=image
        iconVariant="overlay"
        icon="profileImage"
      >
        <wui-text variant="paragraph-500" color="fg-100">
        Profile
      </wui-text>
      </wui-list-item>
      </a>
        <wui-list-item
          .variant=${networkImage ? 'image' : 'icon'}
          iconVariant="overlay"
          icon="networkPlaceholder"
          imageSrc=${ifDefined(networkImage)}
          ?chevron=${this.isAllowedNetworkSwitch()}
          @click=${this.onNetworks.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            ${this.network?.name ?? 'Unknown'}
          </wui-text>
        </wui-list-item>
        <wui-list-item
          iconVariant="blue"
          icon="swapHorizontalBold"
          iconSize="sm"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${false}
          .loading=${this.disconecting}
          @click=${this.onDisconnect.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `
  }

  // -- Private ------------------------------------------- //
  private emailCardTemplate() {
    const type = StorageUtil.getConnectedConnector()
    const isEmail = this.connectors.find(c => c.type === 'EMAIL')
    if (!isEmail || type !== 'EMAIL') {
      return null
    }

    return html`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a non-custodial wallet"
        icon="wallet"
      ></wui-notice-card>
    `
  }

  private explorerBtnTemplate() {
    const { addressExplorerUrl } = AccountController.state

    if (!addressExplorerUrl) {
      return null
    }

    return html`
      <wui-button size="sm" variant="shade" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `
  }

  private isAllowedNetworkSwitch() {
    const { requestedCaipNetworks } = NetworkController.state
    const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false
    const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id)

    return isMultiNetwork || !isValidNetwork
  }

  private onCopyAddress() {
    try {
      if (this.address) {
        CoreHelperUtil.copyToClopboard(this.address)
        SnackController.showSuccess('Address copied')
      }
    } catch {
      SnackController.showError('Failed to copy')
    }
  }

  onProfile() {
    if (this.isAllowedNetworkSwitch()) {
        RouterController.push('/profile');
    }
}
  private onNetworks() {
    if (this.isAllowedNetworkSwitch()) {
      RouterController.push('Networks')
    }
  }

  private onTransactions() {
    EventsController.sendEvent({ type: 'track', event: 'CLICK_TRANSACTIONS' })
    RouterController.push('Transactions')
  }

  private async onDisconnect() {
    try {
      this.disconecting = true
      await ConnectionController.disconnect()
      EventsController.sendEvent({ type: 'track', event: 'DISCONNECT_SUCCESS' })
      ModalController.close()
    } catch {
      EventsController.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' })
      SnackController.showError('Failed to disconnect')
    } finally {
      this.disconecting = false
    }
  }

  private onExplorer() {
    const { addressExplorerUrl } = AccountController.state
    if (addressExplorerUrl) {
      CoreHelperUtil.openHref(addressExplorerUrl, '_blank')
    }
  }

  private onGoToUpgradeView() {
    RouterController.push('UpgradeWallet')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-account-view': W3mAccountView
  }
}
