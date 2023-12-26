import {
  AccountController,
  AssetUtil,
  CoreHelperUtil,
  ModalController,
  NetworkController
} from '@ridotto-io/w3-core'
import type { WuiAccountButton } from '@ridotto-io/w3-ui'
import { customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('w3m-account-button')
export class W3mAccountButton extends LitElement {
  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @property({ type: Boolean }) public disabled?: WuiAccountButton['disabled'] = false

  @property() public avatarSrc?: string = undefined

  @property() public balance?: 'show' | 'hide' = 'show'

  @state() private address = AccountController.state.address

  @state() private balanceVal = AccountController.state.balance

  @state() private balanceSymbol = AccountController.state.balanceSymbol

  @state() private profileName = AccountController.state.profileName

  @state() private network = NetworkController.state.caipNetwork

  @state() private profileImage = AccountController.state.profileImage

  // -- Lifecycle ----------------------------------------- //
  public constructor() {
    super()
    this.unsubscribe.push(
      ...[
        AccountController.subscribe(val => {
          if (val.isConnected) {
            this.address = val.address
            this.balanceVal = val.balance
            this.profileName = val.profileName
            this.balanceSymbol = val.balanceSymbol
            this.profileImage = val.profileImage
          } else {
            this.address = ''
            this.balanceVal = ''
            this.profileName = ''
            this.balanceSymbol = ''
          }
        }),
        NetworkController.subscribeKey('caipNetwork', val => (this.network = val))
      ]
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    const networkImage = AssetUtil.getNetworkImage(this.network)
    const showBalance = this.balance === 'show'

    return html`
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        address=${ifDefined(this.profileName ?? this.address)}
        ?isProfileName=${Boolean(this.profileName)}
        networkSrc=${ifDefined(networkImage)}
        avatarSrc=${ifDefined(this.profileImage)}
        balance=${showBalance
          ? CoreHelperUtil.formatBalance(this.balanceVal, this.balanceSymbol)
          : ''}
        @click=${this.onClick.bind(this)}
      >
      </wui-account-button>
    `
  }

  // -- Private ------------------------------------------- //
  private onClick() {
    ModalController.open()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-account-button': W3mAccountButton
  }
}
