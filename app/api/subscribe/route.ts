import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

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

const welcomeHtml = (email: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Explorer 233</title>
</head>
<body style="margin:0;padding:0;background:#05070D;font-family:'Inter',Helvetica,Arial,sans-serif;color:#F4F1EA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070D;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / wordmark -->
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:500;letter-spacing:0.32em;text-transform:uppercase;color:rgba(232,179,57,0.8);">
                Explorer 233 · Accra, Ghana
              </p>
            </td>
          </tr>

          <!-- Hero line -->
          <tr>
            <td style="padding-bottom:24px;text-align:center;border-top:1px solid rgba(244,241,234,0.08);padding-top:40px;">
              <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:-0.02em;line-height:1.1;color:#F4F1EA;">
                The call has been heeded.
              </h1>
            </td>
          </tr>

          <!-- Gold rule -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <div style="width:48px;height:1px;background:linear-gradient(90deg,#E8B339,transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:36px;text-align:center;">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:rgba(244,241,234,0.72);">
                Some people look up at the stars and feel small.<br />
                Others feel <em>called</em>.<br /><br />
                You just proved which kind you are.
              </p>
              <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(244,241,234,0.72);">
                Explorer 233 opens its doors on <strong style="color:#F4F1EA;">August 1, 2026</strong>.
                When that moment arrives, you'll be among the first to know —
                and the first through the door.
              </p>
            </td>
          </tr>

          <!-- Mystery beat -->
          <tr>
            <td style="padding:28px 32px;border:1px solid rgba(232,179,57,0.2);border-radius:12px;background:rgba(232,179,57,0.04);text-align:center;margin-bottom:36px;">
              <p style="margin:0;font-size:13px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:rgba(232,179,57,0.7);">
                What is Explorer 233, exactly?
              </p>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.65;color:rgba(244,241,234,0.6);">
                A fictional space agency? A game? A community? A blend of all?<br />
                <strong style="color:#F4F1EA;">Find out soon.</strong>
              </p>
            </td>
          </tr>

          <tr><td style="height:36px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;border-top:1px solid rgba(244,241,234,0.06);padding-top:28px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(244,241,234,0.25);">
                © 2026 Explorer 233 · Accra, Ghana
              </p>
              <p style="margin:0;font-size:11px;color:rgba(244,241,234,0.2);">
                You're receiving this because ${email} signed up at explorer233.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
        return NextResponse.json({ duplicate: true }, { status: 200 });
      }
      throw new Error(dbError.message);
    }

    // Send welcome email
    await getResend().emails.send({
      from: 'Explorer 233 <hello@explorer233.com>',
      to: clean,
      subject: 'The call has been heeded.',
      html: welcomeHtml(clean),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
