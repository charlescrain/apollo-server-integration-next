export function serializeError(error: unknown): string {
  if (error instanceof Error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error))
  }
  return 'Cannot Serialize Error: Not an instance of Error'
}
