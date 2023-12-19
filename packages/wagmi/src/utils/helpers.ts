import type { CaipNetwork } from '@ridotto-io/w3-scaffold'
import type { Chain } from '@wagmi/core'
import { ConstantsUtil, PresetsUtil } from '@ridotto-io/w3-scaffold-utils'

export function getCaipDefaultChain(chain?: Chain) {
  if (!chain) {
    return undefined
  }

  return {
    id: `${ConstantsUtil.EIP155}:${chain.id}`,
    name: chain.name,
    imageId: PresetsUtil.EIP155NetworkImageIds[chain.id]
  } as CaipNetwork
}
