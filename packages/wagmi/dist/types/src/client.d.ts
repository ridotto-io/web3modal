import type { Chain, Config } from '@wagmi/core';
import type { LibraryOptions, PublicStateControllerState, Token } from '@ridotto-io/w3-scaffold';
import { Web3ModalScaffold } from '@ridotto-io/w3-scaffold';
import type { Web3ModalSIWEClient } from '@ridotto-io/w3-siwe';
export interface Web3ModalClientOptions extends Omit<LibraryOptions, 'defaultChain' | 'tokens'> {
    wagmiConfig: Config<any, any>;
    siweConfig?: Web3ModalSIWEClient;
    chains?: Chain[];
    defaultChain?: Chain;
    chainImages?: Record<number, string>;
    connectorImages?: Record<string, string>;
    tokens?: Record<number, Token>;
}
export type Web3ModalOptions = Omit<Web3ModalClientOptions, '_sdkVersion'>;
declare global {
    interface Window {
        ethereum?: Record<string, unknown>;
    }
}
interface Web3ModalState extends PublicStateControllerState {
    selectedNetworkId: number | undefined;
}
export declare class Web3Modal extends Web3ModalScaffold {
    private hasSyncedConnectedAccount;
    private options;
    constructor(options: Web3ModalClientOptions);
    getState(): {
        selectedNetworkId: number | undefined;
        open: boolean;
    };
    subscribeState(callback: (state: Web3ModalState) => void): () => void;
    private syncRequestedNetworks;
    private syncAccount;
    private syncNetwork;
    private syncProfile;
    private syncBalance;
    private syncConnectors;
    private syncEmailConnector;
    private eip6963EventHandler;
    private listenEIP6963Connector;
    private listenEmailConnector;
}
export {};
