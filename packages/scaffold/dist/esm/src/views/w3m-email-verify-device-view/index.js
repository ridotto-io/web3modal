var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from '@ridotto-io/w3-ui';
import { LitElement, html } from 'lit';
import styles from './styles.js';
import { RouterController, ConnectorController, SnackController } from '@ridotto-io/w3-core';
import { state } from 'lit/decorators.js';
let W3mEmailVerifyDeviceView = class W3mEmailVerifyDeviceView extends LitElement {
    constructor() {
        super();
        this.email = RouterController.state.data?.email;
        this.emailConnector = ConnectorController.getEmailConnector();
        this.loading = false;
        this.listenForDeviceApproval();
    }
    render() {
        if (!this.email) {
            throw new Error('w3m-email-verify-device-view: No email provided');
        }
        if (!this.emailConnector) {
            throw new Error('w3m-email-verify-device-view: No email provided');
        }
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['0', '3xl', 'xxl', '3xl']}
      >
        <wui-flex justifyContent="center" .padding=${['0', '0', 'xxl', '0']}>
          <wui-icon-box
            size="xl"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon="verify"
            background="opaque"
          ></wui-icon-box>
        </wui-flex>
        <wui-text variant="large-600" color="fg-100">Register this device to continue</wui-text>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          .padding=${['s', '0', '0', '0']}
        >
          <wui-text variant="paragraph-400" color="fg-200">Check the instructions sent to</wui-text>
          <wui-text variant="paragraph-600" color="fg-100">${this.email}</wui-text>
        </wui-flex>

        <wui-flex alignItems="center" id="w3m-resend-section">
          ${this.loading
            ? html `<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`
            : html ` <wui-link @click=${this.onResendCode.bind(this)}>Resend email</wui-link>`}
        </wui-flex>

        <wui-flex alignItems="center">
          <wui-text variant="paragraph-400" color="fg-200" align="center">
            This is a quick one-time approval that will keep your account secure
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
    }
    async listenForDeviceApproval() {
        if (this.emailConnector) {
            await this.emailConnector.provider.connectDevice();
            RouterController.replace('EmailVerifyOtp', { email: this.email });
        }
    }
    async onResendCode() {
        try {
            if (!this.loading) {
                const emailConnector = ConnectorController.getEmailConnector();
                if (!emailConnector || !this.email) {
                    throw new Error('w3m-email-login-widget: Unable to resend email');
                }
                this.loading = true;
                await emailConnector.provider.connectEmail({ email: this.email });
                SnackController.showSuccess('New Email sent');
            }
        }
        catch (error) {
            SnackController.showError(error);
        }
        finally {
            this.loading = false;
        }
    }
};
W3mEmailVerifyDeviceView.styles = styles;
__decorate([
    state()
], W3mEmailVerifyDeviceView.prototype, "loading", void 0);
W3mEmailVerifyDeviceView = __decorate([
    customElement('w3m-email-verify-device-view')
], W3mEmailVerifyDeviceView);
export { W3mEmailVerifyDeviceView };
//# sourceMappingURL=index.js.map