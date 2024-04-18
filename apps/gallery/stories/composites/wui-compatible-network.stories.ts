import type { Meta } from '@storybook/web-components'
import '@ridotto-io/w3-ui/src/composites/wui-compatible-network'
import type { WuiCompatibleNetwork } from '@ridotto-io/w3-ui/src/composites/wui-compatible-network'
import { html } from 'lit'
import { networkImages } from '../../utils/PresetUtils'

type Component = Meta<WuiCompatibleNetwork>

export default {
  title: 'Composites/wui-compatible-network',
  args: {
    text: 'Only receive assets on these networks"',
    networkImages
  }
} as Component

export const Default: Component = {
  render: args => html`
    <wui-compatible-network .networkImages=${args.networkImages} .text=${args.text}>
    </wui-compatible-network>
  `
}
