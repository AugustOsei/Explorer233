import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { unsubscribeUrl } from '../../../lib/unsubscribeToken';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://explorer233.com';
const FROM = 'Explorer 233 <theteam@explorer233.com>';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not set');
  return createClient(url, key);
}

const welcomeHtml = (email: string, unsubscribeLink: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Explorer 233</title>
</head>
<body style="margin:0;padding:0;background:#FFFFFF;font-family:'Inter',Helvetica,Arial,sans-serif;color:#1A1D24;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="${SITE_URL}/logo-mark-dark.png" width="52" alt="Explorer 233" style="display:block;width:52px;height:auto;" />
            </td>
          </tr>

          <!-- Wordmark -->
          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:#8A8F98;">
                Explorer 233 · Accra, Ghana
              </p>
            </td>
          </tr>

          <!-- Hero line -->
          <tr>
            <td style="padding-bottom:20px;text-align:center;border-top:1px solid #EDEDEF;padding-top:32px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.01em;line-height:1.2;color:#1A1D24;">
                Welcome aboard.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:28px;text-align:center;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#4A4F58;">
                You're now part of Explorer 233 — an African science-fiction saga about a
                Ghanaian-led space exploration company answering signals from other worlds.
              </p>
              <p style="margin:0;font-size:16px;line-height:1.65;color:#4A4F58;">
                Expect new dispatches, story world reveals and event announcements — only
                when there's something worth sharing, never just noise.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="${SITE_URL}/story" style="display:inline-block;padding:0.75rem 1.8rem;font-size:14px;font-weight:600;color:#FFFFFF;background:#1A1D24;border-radius:6px;text-decoration:none;">
                Begin Dispatch One
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#8A8F98;">
                Want to collaborate or support the project?
                <a href="mailto:hello@explorer233.com?subject=Explorer%20233&body=Tell%20us%20who%20you%20are%20and%20how%20you%20would%20like%20to%20be%20involved." style="color:#1A1D24;text-decoration:underline;">Get in touch.</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;border-top:1px solid #EDEDEF;padding-top:24px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#B4B8BF;">
                © 2026 Explorer 233 · Accra, Ghana
              </p>
              <p style="margin:0 0 6px;font-size:11px;color:#B4B8BF;">
                You're receiving this because ${email} signed up at explorer233.com
              </p>
              <p style="margin:0;font-size:11px;color:#B4B8BF;">
                <a href="${unsubscribeLink}" style="color:#8A8F98;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const welcomeText = (email: string, unsubscribeLink: string) => `EXPLORER 233 · ACCRA, GHANA

Welcome aboard.

You're now part of Explorer 233 — an African science-fiction saga about a
Ghanaian-led space exploration company answering signals from other worlds.

Expect new dispatches, story world reveals and event announcements — only when
there's something worth sharing, never just noise.

Begin Dispatch One: ${SITE_URL}/story

Want to collaborate or support the project? Get in touch: hello@explorer233.com

—
You're receiving this because ${email} signed up at explorer233.com
Unsubscribe: ${unsubscribeLink}`;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const clean = email.toLowerCase().trim();

    // Insert into Supabase using the service role key (bypasses RLS)
    const supabase = getSupabase();
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({ email: clean });

    if (dbError) {
      if (dbError.code === '23505') {
        // Already on the list. If they'd unsubscribed, reactivate them.
        const { data: existing, error: fetchError } = await supabase
          .from('subscribers')
          .select('unsubscribed')
          .eq('email', clean)
          .single();

        if (fetchError) throw new Error(fetchError.message);

        if (!existing?.unsubscribed) {
          return NextResponse.json({ duplicate: true }, { status: 200 });
        }

        const { error: updateError } = await supabase
          .from('subscribers')
          .update({ unsubscribed: false })
          .eq('email', clean);

        if (updateError) throw new Error(updateError.message);
      } else {
        throw new Error(dbError.message);
      }
    }

    // Send welcome email
    const unsubscribeLink = unsubscribeUrl(clean);
    await getResend().emails.send({
      from: FROM,
      to: clean,
      subject: 'Welcome aboard.',
      html: welcomeHtml(clean, unsubscribeLink),
      text: welcomeText(clean, unsubscribeLink),
      headers: { 'List-Unsubscribe': `<${unsubscribeLink}>` },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
