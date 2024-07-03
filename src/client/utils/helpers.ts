export function mask(value: string): string {
  return `${value.slice(0, 10)}...${value.slice(-10)}`;
}
