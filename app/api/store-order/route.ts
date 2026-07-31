import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Ghana store intake. Captures an intent to buy — deliberately NO payment
 * handling, no card data. A local partner settles mobile money out of band.
 *
 * Uses the service-role key (same pattern as /api/subscribe) so the table needs
 * no RLS policy. See README for the table DDL.
 */

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not set');
  return createClient(url, key);
}

const MAX = { name: 120, phone: 32, address: 400, size: 24 };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const address = String(body.address ?? '').trim();
    const size = String(body.size ?? '').trim();
    const product = String(body.product ?? 'explorer-233-cap').trim();

    if (!name || !phone || !address || !size) {
      return NextResponse.json({ error: 'Please fill in every field.' }, { status: 400 });
    }
    if (
      name.length > MAX.name ||
      phone.length > MAX.phone ||
      address.length > MAX.address ||
      size.length > MAX.size
    ) {
      return NextResponse.json({ error: 'That looks too long — please shorten it.' }, { status: 400 });
    }
    // Loose on purpose: Ghanaian numbers get written many ways (+233…, 0…, spaced).
    if (!/^[\d+()\s-]{7,}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a reachable phone number.' }, { status: 400 });
    }

    const { error } = await getSupabase()
      .from('store_orders')
      .insert({ name, phone, address, size, product, region: 'ghana', status: 'new' });

    if (error) {
      console.error('store_orders insert failed:', error.message);
      return NextResponse.json({ error: 'Could not save your order. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('store-order route error:', err);
    return NextResponse.json({ error: 'Could not save your order. Please try again.' }, { status: 500 });
  }
}
