import type { WuiNetworkButton } from '@ridotto-io/w3-ui';
import { LitElement } from 'lit';
export declare class W3mNetworkButton extends LitElement {
    private unsubscribe;
    disabled?: WuiNetworkButton['disabled'];
    private network;
    private connected;
    private loading;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private onClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-network-button': W3mNetworkButton;
    }
}
