import { ConnectorController } from '@ridotto-io/w3-core'
import { customElement } from '@ridotto-io/w3-ui'
import { LitElement, html } from 'lit'
import { state } from 'lit/decorators.js'
import { ref, createRef } from 'lit/directives/ref.js'
import type { Ref } from 'lit/directives/ref.js'
import styles from './styles.js'
import { SnackController, RouterController } from '@ridotto-io/w3-core'

@customElement('w3m-email-login-widget')
export class W3mEmailLoginWidget extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  private formRef: Ref<HTMLFormElement> = createRef()

  // -- State & Properties -------------------------------- //
  @state() private connectors = ConnectorController.state.connectors

  @state() private email = ''

  @state() private loading = false

  public constructor() {
    super()
    this.unsubscribe.push(
      ConnectorController.subscribeKey('connectors', val => (this.connectors = val))
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  public override firstUpdated() {
    this.formRef.value?.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.onSubmitEmail(event)
      }
    })
  }

  // -- Render -------------------------------------------- //
  public override render() {
    const multipleConnectors = this.connectors.length > 1
    const connector = this.connectors.find(c => c.type === 'EMAIL')
    const showSubmit = !this.loading && this.email.length > 3

    if (!connector) {
      return null
    }

    return html`
      <form ${ref(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
        >
        </wui-email-input>

        ${showSubmit && multipleConnectors
          ? html`
              <wui-icon-link
                size="sm"
                icon="chevronRight"
                iconcolor="accent-100"
                @click=${this.onSubmitEmail.bind(this)}
              >
              </wui-icon-link>
            `
          : null}
        ${this.loading && multipleConnectors
          ? html`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
          : null}

        <input type="submit" hidden />
      </form>

      ${multipleConnectors
        ? html`<wui-separator text="or"></wui-separator>`
        : html`<wui-button
            size="md"
            variant="fill"
            fullWidth
            @click=${this.onSubmitEmail.bind(this)}
            .disabled=${!showSubmit}
            .loading=${this.loading}
          >
            Continue
          </wui-button>`}
    `
  }

  // -- Private ------------------------------------------- //
  private onEmailInputChange(event: CustomEvent<string>) {
    this.email = event.detail
  }

  private async onSubmitEmail(event: Event) {
    try {
      if (this.loading) {
        return
      }

      this.loading = true
      event.preventDefault()
      const emailConnector = ConnectorController.getEmailConnector()

      if (!emailConnector) {
        throw new Error('w3m-email-login-widget: Email connector not found')
      }

      const { action } = await emailConnector.provider.connectEmail({ email: this.email })
      if (action === 'VERIFY_OTP') {
        RouterController.push('EmailVerifyOtp', { email: this.email })
      } else if (action === 'VERIFY_DEVICE') {
        RouterController.push('EmailVerifyDevice', { email: this.email })
      }
    } catch (error) {
      SnackController.showError(error)
    } finally {
      this.loading = false
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-email-login-widget': W3mEmailLoginWidget
  }
}
