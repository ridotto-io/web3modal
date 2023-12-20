import type { W3mFrameTypes } from './W3mFrameTypes.js';
export declare class W3mFrameProvider {
    private w3mFrame;
    private connectEmailResolver;
    private connectDeviceResolver;
    private connectOtpResolver;
    private connectResolver;
    private disconnectResolver;
    private isConnectedResolver;
    private getChainIdResolver;
    private switchChainResolver;
    private rpcRequestResolver;
    constructor(projectId: string);
    getLoginEmailUsed(): boolean;
    connectEmail(payload: W3mFrameTypes.Requests['AppConnectEmailRequest']): Promise<{
        action: "VERIFY_DEVICE" | "VERIFY_OTP";
    }>;
    connectDevice(): Promise<unknown>;
    connectOtp(payload: W3mFrameTypes.Requests['AppConnectOtpRequest']): Promise<unknown>;
    isConnected(): Promise<{
        isConnected: boolean;
    }>;
    getChainId(): Promise<{
        chainId: number;
    }>;
    connect(payload?: W3mFrameTypes.Requests['AppGetUserRequest']): Promise<{
        chainId: number;
        address: string;
    }>;
    switchNetwork(chainId: number): Promise<unknown>;
    disconnect(): Promise<unknown>;
    request(req: W3mFrameTypes.RPCRequest): Promise<string>;
    onRpcRequest(callback: (request: unknown) => void): void;
    onRpcResponse(callback: (request: unknown) => void): void;
    onIsConnected(callback: () => void): void;
    private onConnectEmailSuccess;
    private onConnectEmailError;
    private onConnectDeviceSuccess;
    private onConnectDeviceError;
    private onConnectOtpSuccess;
    private onConnectOtpError;
    private onConnectSuccess;
    private onConnectError;
    private onIsConnectedSuccess;
    private onIsConnectedError;
    private onGetChainIdSuccess;
    private onGetChainIdError;
    private onSignOutSuccess;
    private onSignOutError;
    private onSwitchChainSuccess;
    private onSwitchChainError;
    private onRpcRequestSuccess;
    private onRpcRequestError;
    private onSessionUpdate;
    private setSessionToken;
    private getSessionToken;
    private deleteSessionToken;
}
