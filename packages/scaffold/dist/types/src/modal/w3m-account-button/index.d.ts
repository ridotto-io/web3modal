import type { WuiAccountButton } from '@ridotto-io/w3-ui';
import { LitElement } from 'lit';
export declare class W3mAccountButton extends LitElement {
    private unsubscribe;
    disabled?: WuiAccountButton['disabled'];
    avatarSrc?: string;
    balance?: 'show' | 'hide';
    private address;
    private balanceVal;
    private balanceSymbol;
    private profileName;
    private network;
    private profileImage;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private onClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-button': W3mAccountButton;
    }
}
