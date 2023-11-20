const gcd = (a: number, b: number): number => {
  if (b < 0.0000001) return a;
  return gcd(b, Math.floor(a % b));
};

export const getUKOdds = (fraction: number) => {
  const len = fraction.toFixed(2).length - 2;
  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return Math.floor(numerator) + '/' + Math.floor(denominator)
}