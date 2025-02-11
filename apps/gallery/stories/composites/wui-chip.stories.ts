import type { Meta } from '@storybook/web-components'
import '@ridotto-io/w3-ui/src/composites/wui-chip'
import type { WuiChip } from '@ridotto-io/w3-ui/src/composites/wui-chip'
import { html } from 'lit'
import {
  chipVariants,
  externalLink,
  iconOptions,
  walletImagesOptions
} from '../../utils/PresetUtils'

type Component = Meta<WuiChip>

export default {
  title: 'Composites/wui-chip',
  args: {
    variant: 'fill',
    disabled: false,
    icon: 'externalLink',
    imageSrc: walletImagesOptions[3]?.src,
    href: externalLink
  },
  argTypes: {
    variant: {
      options: chipVariants,
      control: { type: 'select' }
    },
    icon: {
      options: iconOptions,
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-chip
      icon=${args.icon}
      variant=${args.variant}
      href=${args.href}
      ?disabled=${args.disabled}
      .imageSrc=${args.imageSrc}
    ></wui-chip>`
}
