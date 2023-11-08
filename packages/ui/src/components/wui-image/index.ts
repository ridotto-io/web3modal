import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { colorStyles, resetStyles } from '../../utils/ThemeUtil.js'
import { customElement } from '../../utils/WebComponentsUtil.js'
import styles from './styles.js'

@customElement('wui-image')
export class WuiImage extends LitElement {
  public static override styles = [resetStyles, colorStyles, styles]

  // -- State & Properties -------------------------------- //
  @property() public src = './path/to/image.jpg'

  @property() public alt = 'Image'

  // -- Render -------------------------------------------- //
  public override render() {
    return html`Super Image <img width={40} src=${'https://ridotto.io/images/team/profil/mohammed.svg'} alt=${this.alt} data-another="etc" />`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wui-image': WuiImage
  }
}
