import { UiHelperUtil, customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { property } from 'lit/decorators.js'
import { RouterController, SendController } from '@ridotto-io/w3-core'
import type { Balance } from '@ridotto-io/w3-common'
import { NumberUtil } from '@ridotto-io/w3-common'

@customElement('w3m-input-token')
export class W3mInputToken extends LitElement {
  public static override styles = styles

  // -- State & Properties -------------------------------- //
  @property({ type: Object }) public token?: Balance

  @property({ type: Number }) public sendTokenAmount?: number

  @property({ type: Number }) public gasPriceInUSD?: number

  // -- Render -------------------------------------------- //
  public override render() {
    return html` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${['xl', 's', 'l', 'l'] as const}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token && true}
          .value=${this.sendTokenAmount ? String(this.sendTokenAmount) : ''}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  private buttonTemplate() {
    if (this.token) {
      return html`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`
    }

    return html`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`
  }

  private handleSelectButtonClick() {
    RouterController.push('WalletSendSelectToken')
  }

  private sendValueTemplate() {
    if (this.token && this.sendTokenAmount) {
      const price = this.token.price
      const totalValue = price * this.sendTokenAmount

      return html`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${totalValue
          ? `$${UiHelperUtil.formatNumberToLocalString(totalValue, 2)}`
          : 'Incorrect value'}</wui-text
      >`
    }

    return null
  }

  private maxAmountTemplate() {
    if (this.token) {
      if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
        return html` <wui-text variant="small-400" color="error-100">
          ${UiHelperUtil.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
        </wui-text>`
      }

      return html` <wui-text variant="small-400" color="fg-200">
        ${UiHelperUtil.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>`
    }

    return null
  }

  private actionTemplate() {
    if (this.token) {
      if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
        return html`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`
      }

      return html`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`
    }

    return null
  }

  private onInputChange(event: InputEvent) {
    SendController.setTokenAmount(event.detail)
  }

  private onMaxClick() {
    if (this.token && this.gasPriceInUSD) {
      const amountOfTokenGasRequires = NumberUtil.bigNumber(
        this.gasPriceInUSD.toFixed(5)
      ).dividedBy(this.token.price)

      const isNetworkToken = this.token.address === undefined

      const maxValue = isNetworkToken
        ? NumberUtil.bigNumber(this.token.quantity.numeric).minus(amountOfTokenGasRequires)
        : NumberUtil.bigNumber(this.token.quantity.numeric)

      SendController.setTokenAmount(Number(maxValue.toFixed(20)))
    }
  }

  private onBuyClick() {
    RouterController.push('OnRampProviders')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-input-token': W3mInputToken
  }
}
