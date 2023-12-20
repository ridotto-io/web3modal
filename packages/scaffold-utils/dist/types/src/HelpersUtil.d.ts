import type { CaipNetworkId, Tokens } from '@ridotto-io/w3-scaffold';
export declare const HelpersUtil: {
    caipNetworkIdToNumber(caipnetworkId?: CaipNetworkId): number | undefined;
    getCaipTokens(tokens?: Tokens): Tokens | undefined;
};
