import { AccountController } from '@web3modal/core'
import { customElement } from '@web3modal/ui'
import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { W3mAccountButton } from '../w3m-account-button/index.js'
import type { W3mConnectButton } from '../w3m-connect-button/index.js'

@customElement('w3m-button')
export class W3mButton extends LitElement {
  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @property({ type: Boolean }) public disabled?: W3mAccountButton['disabled'] = false

  @property() public balance?: W3mAccountButton['balance'] = undefined

  @property() public size?: W3mConnectButton['size'] = undefined

  @property() public label?: W3mConnectButton['label'] = undefined

  @property() public loadingLabel?: W3mConnectButton['loadingLabel'] = undefined

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
      <div> TESTINGG:::::::
          <w3m-account-button
            .disabled=${Boolean(this.disabled)}
            balance=${ifDefined(this.balance)}
          >
          </w3m-account-button></div>
        `
      : html`
      <div> TESTINGG 222222 ::::::: <w3m-connect-button
            size=${ifDefined(this.size)}
            label=${ifDefined(this.label)}
            loadingLabel=${ifDefined(this.loadingLabel)}
          ></w3m-connect-button></div>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-button': W3mButton
  }
}
