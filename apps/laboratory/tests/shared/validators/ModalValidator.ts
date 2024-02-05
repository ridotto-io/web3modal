import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'
<<<<<<< HEAD
import { SigningFailedToastTitle, SigningSucceededToastTitle } from '../../../src/constants'
=======
import { ConstantsUtil } from '../../../src/utils/ConstantsUtil'
>>>>>>> upstream/V3

export class ModalValidator {
  constructor(public readonly page: Page) {}

  async expectConnected() {
    await expect(this.page.getByTestId('account-button')).toBeVisible()
  }

  async expectAuthenticated() {
<<<<<<< HEAD
    await expect(this.page.getByTestId('w3m-authentication-status')).toContainText(
      'Status: authenticated'
    )
=======
    await expect(this.page.getByTestId('w3m-authentication-status')).toContainText('authenticated')
>>>>>>> upstream/V3
  }

  async expectUnauthenticated() {
    await expect(this.page.getByTestId('w3m-authentication-status')).toContainText(
<<<<<<< HEAD
      'Status: unauthenticated'
=======
      'unauthenticated'
>>>>>>> upstream/V3
    )
  }

  async expectSignatureDeclined() {
    await expect(this.page.getByText('Signature declined')).toBeVisible()
  }

  async expectDisconnected() {
    await expect(this.page.getByTestId('account-button')).not.toBeVisible()
  }

  async expectAcceptedSign() {
    // We use Chakra Toast and it's not quite straightforward to set the `data-testid` attribute on the toast element.
<<<<<<< HEAD
    await expect(this.page.getByText(SigningSucceededToastTitle)).toBeVisible()
=======
    await expect(this.page.getByText(ConstantsUtil.SigningSucceededToastTitle)).toBeVisible()
>>>>>>> upstream/V3
  }

  async expectRejectedSign() {
    // We use Chakra Toast and it's not quite straightforward to set the `data-testid` attribute on the toast element.
<<<<<<< HEAD
    await expect(this.page.getByText(SigningFailedToastTitle)).toBeVisible()
=======
    await expect(this.page.getByText(ConstantsUtil.SigningFailedToastTitle)).toBeVisible()
>>>>>>> upstream/V3
  }
}
