import type { WcWallet } from '@ridotto-io/w3-core';
export declare function markWalletsAsInstalled(wallets: WcWallet[]): (WcWallet & {
    installed: boolean;
})[];
