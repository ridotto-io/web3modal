import type { Meta } from '@storybook/web-components'
import '@ridotto-io/w3-ui/src/composites/wui-tooltip-select'
import type { WuiTooltipSelect } from '@ridotto-io/w3-ui/src/composites/wui-tooltip-select'
import { html } from 'lit'
import '../../components/gallery-container'
import { iconOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiTooltipSelect>

export default {
  title: 'Composites/wui-tooltip-select',
  args: {
    icon: 'card',
    text: 'Buy'
  },
  argTypes: {
    icon: {
      options: iconOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <gallery-container width="120"
      ><wui-tooltip-select icon=${args.icon} text=${args.text}></wui-tooltip-select>
    </gallery-container>
  `
}
