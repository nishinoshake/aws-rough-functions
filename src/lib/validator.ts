export function isValidHash(str: string): boolean {
  if (!str) {
    return false
  }

  return /^[0-9A-Fa-f]{20}$/.test(str)
}
