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

  @property() public unsupported?: boolean = undefined

  @property() public balance?: 'show' | 'hide' = 'show'

  @property() public charsStart?: WuiAccountButton['charsStart'] = 4

  @property() public charsEnd?: WuiAccountButton['charsEnd'] = 6

  @state() private address = AccountController.state.address

  @state() private balanceVal = AccountController.state.balance

  @state() private balanceSymbol = AccountController.state.balanceSymbol

  @state() private profileName = AccountController.state.profileName

  @state() private network = NetworkController.state.caipNetwork

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @state() private profileImage = AccountController.state.profileImage

  @state() private isUnsupportedChain = NetworkController.state.isUnsupportedChain

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
            this.profileImage = ''
            this.balanceSymbol = ''
          }
        }),
        NetworkController.subscribeKey('caipNetwork', val => {
          this.network = val
        }),
        NetworkController.subscribeKey('isUnsupportedChain', val => {
          this.isUnsupportedChain = val
        })
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
        .isUnsupportedChain=${this.isUnsupportedChain}
        address=${ifDefined(this.address)}
        profileName=${ifDefined(this.profileName)}
        networkSrc=${ifDefined(networkImage)}
        .unsupported=${Boolean(this.unsupported)}
        avatarSrc=${ifDefined(this.profileImage)}
        balance=${showBalance
          ? CoreHelperUtil.formatBalance(this.balanceVal, this.balanceSymbol)
          : ''}
        @click=${this.onClick.bind(this)}
        data-testid="account-button"
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
      >
      </wui-account-button>
    `
  }

  // -- Private ------------------------------------------- //
  private onClick() {
    if (this.isUnsupportedChain) {
      ModalController.open({ view: 'UnsupportedChain' })
    } else {
      ModalController.open()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-account-button': W3mAccountButton
  }
}
