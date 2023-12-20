import { Buffer } from 'buffer'

if (typeof window !== 'undefined') {
  if (!(window as any).Buffer) {
    (window as any).Buffer = Buffer;
  }
  if (!(window as any).global) {
    (window as any).global = (window as any);
  }
  if (!(window as any).process) {
    // @ts-expect-error minimal process
    window.process = {};
  }
  if (!(window as any).process?.env) {
    // @ts-expect-error minimal process
    window.process = { env: {} };
  }
}
