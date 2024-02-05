import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

export class WalletValidator {
  private readonly gotoSessions: Locator

  constructor(public readonly page: Page) {
    this.gotoSessions = this.page.getByTestId('sessions')
  }

  async expectConnected() {
<<<<<<< HEAD
    await this.page.reload()
=======
>>>>>>> upstream/V3
    await this.gotoSessions.click()
    await expect(this.page.getByTestId('session-card')).toBeVisible()
  }

  async expectDisconnected() {
<<<<<<< HEAD
    await this.page.waitForTimeout(1000)
    await this.page.reload()
=======
>>>>>>> upstream/V3
    await this.gotoSessions.click()
    await expect(this.page.getByTestId('session-card')).not.toBeVisible()
  }

  async expectReceivedSign({ chainName = 'Ethereum' }) {
    await expect(this.page.getByTestId('session-approve-button')).toBeVisible()
    await expect(this.page.getByTestId('request-details-chain')).toHaveText(chainName)
  }
}
