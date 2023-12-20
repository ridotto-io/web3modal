import '@ridotto-io/w3-polyfills';
import type { Metadata, ProviderType } from '@ridotto-io/w3-scaffold-utils/ethers';
export interface ConfigOptions {
    enableEIP6963?: boolean;
    enableInjected?: boolean;
    enableCoinbase?: boolean;
    enableEmail?: boolean;
    rpcUrl?: string;
    defaultChainId?: number;
    metadata: Metadata;
}
export declare function defaultConfig(options: ConfigOptions): ProviderType;
