export function env(name: string): string {
  const value = process.env[`NX_${name}`];

  if (value) {
    return value;
  }

  return '';
}
