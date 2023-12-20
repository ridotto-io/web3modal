import type { SIWEConfig, SIWESession } from '@ridotto-io/w3-core';
import { Web3ModalSIWEClient } from '../src/client.js';
export type { Web3ModalSIWEClient, SIWEConfig, SIWESession };
export declare function createSIWEConfig(siweConfig: SIWEConfig): Web3ModalSIWEClient;
