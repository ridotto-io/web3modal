import { LitElement } from 'lit';
export declare class W3mAccountView extends LitElement {
    static styles: import("lit").CSSResult;
    private usubscribe;
    private readonly connectors;
    private address;
    private profileName;
    private balance;
    private balanceSymbol;
    private network;
    private disconecting;
    constructor();
    disconnectedCallback(): void;
    getProfile(): string | null;
    private onClick;
    render(): import("lit-html").TemplateResult<1>;
    private emailCardTemplate;
    private explorerBtnTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private onNetworks;
    private onTransactions;
    private onDisconnect;
    private onExplorer;
    private onGoToUpgradeView;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-view': W3mAccountView;
    }
}
