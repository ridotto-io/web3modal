import type { SIWEConfig, SIWESession } from '@ridotto-io/w3-core'
import { Web3ModalSIWEClient } from '../src/client.js'

export type { Web3ModalSIWEClient, SIWEConfig, SIWESession }

export function createSIWEConfig(siweConfig: SIWEConfig) {
  return new Web3ModalSIWEClient(siweConfig)
}
