import type { CaipNetworkId } from '@ridotto-io/w3-core'

export const NetworkUtil = {
  caipNetworkIdToNumber(caipnetworkId?: CaipNetworkId) {
    return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined
  }
}
