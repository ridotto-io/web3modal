import type { CaipNetwork } from '@ridotto-io/w3-core';
import { LitElement } from 'lit';
export declare class W3mNetworksView extends LitElement {
    private unsubscribe;
    caipNetwork: CaipNetwork | undefined;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private onNetworkHelp;
    private networksTemplate;
    private onSwitchNetwork;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-networks-view': W3mNetworksView;
    }
}
