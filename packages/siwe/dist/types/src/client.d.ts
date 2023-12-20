import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs, SIWEControllerClient, SIWEConfig, SIWEClientMethods } from '@ridotto-io/w3-core';
export declare class Web3ModalSIWEClient {
    options: SIWEControllerClient['options'];
    methods: SIWEClientMethods;
    constructor(siweConfig: SIWEConfig);
    getNonce(): Promise<string>;
    createMessage(args: SIWECreateMessageArgs): string;
    verifyMessage(args: SIWEVerifyMessageArgs): Promise<boolean>;
    getSession(): Promise<import("@ridotto-io/w3-core").SIWESession>;
    signIn(): Promise<import("@ridotto-io/w3-core").SIWESession>;
    signOut(): Promise<boolean>;
}
