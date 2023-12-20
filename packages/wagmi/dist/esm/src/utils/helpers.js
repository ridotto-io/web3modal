import { ConstantsUtil, PresetsUtil } from '@ridotto-io/w3-scaffold-utils';
export function getCaipDefaultChain(chain) {
    if (!chain) {
        return undefined;
    }
    return {
        id: `${ConstantsUtil.EIP155}:${chain.id}`,
        name: chain.name,
        imageId: PresetsUtil.EIP155NetworkImageIds[chain.id]
    };
}
//# sourceMappingURL=helpers.js.map