import type { LibraryOptions, PublicStateControllerState, Token } from '@ridotto-io/w3-scaffold';
import { Web3ModalScaffold } from '@ridotto-io/w3-scaffold';
import type { Web3ModalSIWEClient } from '@ridotto-io/w3-siwe';
import type { ProviderType, Chain, EthersStoreUtilState } from '@ridotto-io/w3-scaffold-utils/ethers';
import type { Eip1193Provider } from 'ethers';
export interface Web3ModalClientOptions extends Omit<LibraryOptions, 'defaultChain' | 'tokens'> {
    ethersConfig: ProviderType;
    chains: Chain[];
    siweConfig?: Web3ModalSIWEClient;
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
    private EIP6963Providers;
    private walletConnectProvider?;
    private walletConnectProviderInitPromise?;
    private projectId;
    private chains;
    private metadata?;
    private options;
    private emailProvider?;
    constructor(options: Web3ModalClientOptions);
    getState(): {
        selectedNetworkId: number | undefined;
        open: boolean;
    };
    subscribeState(callback: (state: Web3ModalState) => void): () => void;
    setAddress(address?: string): void;
    getAddress(): string | undefined;
    getError(): unknown;
    getChainId(): number | undefined;
    getIsConnected(): boolean;
    getWalletProvider(): Eip1193Provider | undefined;
    getWalletProviderType(): "walletConnect" | "injected" | "coinbaseWallet" | "eip6963" | "w3mEmail" | undefined;
    subscribeProvider(callback: (newState: EthersStoreUtilState) => void): () => void;
    disconnect(): Promise<void>;
    private createProvider;
    private initWalletConnectProvider;
    private getWalletConnectProvider;
    private syncRequestedNetworks;
    private checkActiveWalletConnectProvider;
    private checkActiveInjectedProvider;
    private checkActiveCoinbaseProvider;
    private checkActive6963Provider;
    private setWalletConnectProvider;
    private setInjectedProvider;
    private setEIP6963Provider;
    private setCoinbaseProvider;
    private setEmailProvider;
    private watchWalletConnect;
    private watchInjected;
    private watchEIP6963;
    private watchCoinbase;
    private watchEmail;
    private syncAccount;
    private syncNetwork;
    private syncProfile;
    private syncBalance;
    private switchNetwork;
    private syncConnectors;
    private syncEmailConnector;
    private listenEmailConnector;
    private eip6963EventHandler;
    private listenConnectors;
}
export {};
