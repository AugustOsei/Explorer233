/**
 * Example monthly dispatch. Copy this file per send, e.g. newsletters/2026-09.ts,
 * and run: npm run newsletter -- newsletters/2026-09.ts
 */
const content = {
  subject: 'Dispatch — [headline here]',
  previewText: 'The story continues.',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#05070D;font-family:'Inter',Helvetica,Arial,sans-serif;color:#F4F1EA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070D;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:500;letter-spacing:0.32em;text-transform:uppercase;color:rgba(232,179,57,0.8);">
                Explorer 233 · Accra, Ghana
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:24px;text-align:center;border-top:1px solid rgba(244,241,234,0.08);padding-top:40px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#F4F1EA;">
                [Dispatch headline]
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:36px;text-align:center;">
              <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(244,241,234,0.72);">
                [Body copy goes here.]
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align:center;border-top:1px solid rgba(244,241,234,0.06);padding-top:28px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(244,241,234,0.25);">
                © 2026 Explorer 233 · Accra, Ghana
              </p>
              <p style="margin:0;font-size:11px;color:rgba(244,241,234,0.2);">
                {{{RESEND_UNSUBSCRIBE_URL}}}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
};

export default content;
