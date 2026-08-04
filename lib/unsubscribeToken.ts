import { createHmac, timingSafeEqual } from 'crypto';

function getSecret(): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error('UNSUBSCRIBE_SECRET is not set');
  return secret;
}

export function createUnsubscribeToken(email: string): string {
  const normalized = email.toLowerCase().trim();
  return createHmac('sha256', getSecret()).update(normalized).digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = Buffer.from(createUnsubscribeToken(email), 'hex');
  let provided: Buffer;
  try {
    provided = Buffer.from(token, 'hex');
  } catch {
    return false;
  }
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function unsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://explorer233.com';
  const token = createUnsubscribeToken(email);
  const params = new URLSearchParams({ email: email.toLowerCase().trim(), token });
  return `${base}/api/unsubscribe?${params.toString()}`;
}
