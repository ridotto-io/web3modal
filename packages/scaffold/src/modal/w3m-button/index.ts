import { AccountController } from '@ridotto-io/w3-core'
import { customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { W3mAccountButton } from '../w3m-account-button/index.js'
import type { W3mConnectButton } from '../w3m-connect-button/index.js'
import styles from './styles.js'

@customElement('w3m-button')
export class W3mButton extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @property({ type: Boolean }) public disabled?: W3mAccountButton['disabled'] = false

  @property() public balance?: W3mAccountButton['balance'] = undefined

  @property() public size?: W3mConnectButton['size'] = undefined

  @property() public label?: W3mConnectButton['label'] = undefined

  @property() public loadingLabel?: W3mConnectButton['loadingLabel'] = undefined

  @property() public avatarSrc?: string = undefined

  @property() public unsupported?: boolean = undefined

  @property() public charsStart?: W3mAccountButton['charsStart'] = 4

  @property() public charsEnd?: W3mAccountButton['charsEnd'] = 6

  @state() private isAccount = AccountController.state.isConnected

  // -- Lifecycle ----------------------------------------- //
  public constructor() {
    super()
    this.unsubscribe.push(
      AccountController.subscribeKey('isConnected', val => {
        this.isAccount = val
      })
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return this.isAccount
      ? html`
          <w3m-account-button
            .disabled=${Boolean(this.disabled)}
            .unsupported=${Boolean(this.unsupported)}
            balance=${ifDefined(this.balance)}
            .avatarSrc=${this.avatarSrc}
            .charsStart=${ifDefined(this.charsStart)}
            .charsEnd=${ifDefined(this.charsEnd)}
          >
          </w3m-account-button>
        `
      : html`
          <w3m-connect-button
            size=${ifDefined(this.size)}
            label=${ifDefined(this.label)}
            loadingLabel=${ifDefined(this.loadingLabel)}
          ></w3m-connect-button>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-button': W3mButton
  }
}
