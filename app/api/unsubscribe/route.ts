import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyUnsubscribeToken } from '../../../lib/unsubscribeToken';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not set');
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  const token = req.nextUrl.searchParams.get('token');

  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return NextResponse.redirect(new URL('/unsubscribe?status=invalid', req.url));
  }

  const clean = email.toLowerCase().trim();

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('subscribers')
      .update({ unsubscribed: true })
      .eq('email', clean);

    if (error) throw new Error(error.message);

    return NextResponse.redirect(new URL('/unsubscribe?status=success', req.url));
  } catch (err) {
    console.error('[unsubscribe]', err);
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url));
  }
}
