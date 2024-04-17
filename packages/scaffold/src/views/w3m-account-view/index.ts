import { OptionsController, StorageUtil } from '@ridotto-io/w3-core'
import { customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'

@customElement('w3m-account-view')
export class W3mAccountView extends LitElement {
  // -- Render -------------------------------------------- //
  public override render() {
    const type = StorageUtil.getConnectedConnector()

    return html`
      ${OptionsController.state.enableWalletFeatures && type === 'EMAIL'
        ? this.walletFeaturesTemplate()
        : this.defaultTemplate()}
    `
  }

  // -- Private ------------------------------------------- //
  private walletFeaturesTemplate() {
    return html`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`
  }

  private defaultTemplate() {
    return html`<w3m-account-default-widget></w3m-account-default-widget>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-account-view': W3mAccountView
  }
}
