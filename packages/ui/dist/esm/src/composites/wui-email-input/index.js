var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-input-text/index.js';
import styles from './styles.js';
let WuiEmailInput = class WuiEmailInput extends LitElement {
    render() {
        return html `
      <wui-input-text placeholder="Email" icon="mail" size="md">
        <wui-icon size="inherit" color="fg-100" name="chevronRight"></wui-icon>
      </wui-input-text>
      ${this.templateError()}
    `;
    }
    templateError() {
        if (this.errorMessage) {
            return html `<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`;
        }
        return null;
    }
};
WuiEmailInput.styles = [resetStyles, styles];
__decorate([
    property()
], WuiEmailInput.prototype, "errorMessage", void 0);
WuiEmailInput = __decorate([
    customElement('wui-email-input')
], WuiEmailInput);
export { WuiEmailInput };
//# sourceMappingURL=index.js.map