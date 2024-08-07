/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from 'buffer'

if (typeof window !== 'undefined') {
  if (!(window as any).Buffer) {
    ;(window as any).Buffer = Buffer
  }

  if (!window.global) {
    window.global = window
  }

  if (!window.process) {
    // @ts-expect-error minimal process
    window.process = {}
  }

  if (!window.process?.env) {
    // @ts-expect-error minimal process
    window.process = { env: {} }
  }
}
