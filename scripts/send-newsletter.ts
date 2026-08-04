/**
 * Sends a monthly dispatch to every subscriber in Supabase via a Resend Broadcast.
 *
 * Usage:
 *   npx tsx scripts/send-newsletter.ts newsletters/2026-08.ts
 *   npx tsx scripts/send-newsletter.ts newsletters/2026-08.ts --draft   (create but don't send)
 *
 * The content file must default-export { subject, previewText?, html }.
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { Resend, type CreateBroadcastOptions } from 'resend';
import path from 'path';
import { pathToFileURL } from 'url';

const SEGMENT_NAME = 'Explorer 233 — Subscribers';
const FROM = 'Explorer 233 <explorer233@augustwheel.com>';

interface NewsletterContent {
  subject: string;
  previewText?: string;
  html: string;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not set');
  return createClient(url, key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

async function getOrCreateSegment(resend: Resend): Promise<string> {
  const list = await resend.segments.list();
  if (list.error) throw new Error(list.error.message);
  const existing = list.data?.data.find((s) => s.name === SEGMENT_NAME);
  if (existing) return existing.id;

  const created = await resend.segments.create({ name: SEGMENT_NAME });
  if (created.error) throw new Error(created.error.message);
  if (!created.data) throw new Error('Segment creation returned no data');
  return created.data.id;
}

async function syncContacts(resend: Resend, segmentId: string, emails: string[]) {
  let synced = 0;
  for (const email of emails) {
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });

    if (created.error) {
      // Contact already exists in Resend — attach it to the segment instead.
      const added = await resend.contacts.segments.add({ email, segmentId });
      if (added.error) {
        console.error(`  ! failed to sync ${email}: ${added.error.message}`);
        continue;
      }
    }
    synced += 1;
  }
  return synced;
}

async function main() {
  const [, , contentPathArg, ...flags] = process.argv;
  const isDraft = flags.includes('--draft');

  if (!contentPathArg) {
    console.error('Usage: npx tsx scripts/send-newsletter.ts <path-to-content-file> [--draft]');
    process.exit(1);
  }

  const contentPath = path.resolve(process.cwd(), contentPathArg);
  const mod = await import(pathToFileURL(contentPath).href);
  const content: NewsletterContent = mod.default;

  if (!content?.subject || !content?.html) {
    throw new Error('Content file must default-export { subject, html }');
  }

  const supabase = getSupabase();
  const resend = getResend();

  console.log('Fetching active subscribers from Supabase...');
  const { data: rows, error } = await supabase
    .from('subscribers')
    .select('email')
    .eq('unsubscribed', false);

  if (error) throw new Error(error.message);
  const emails = (rows ?? []).map((r) => r.email as string);
  console.log(`  ${emails.length} active subscriber(s)`);

  if (emails.length === 0) {
    console.log('Nothing to send.');
    return;
  }

  console.log('Resolving Resend segment...');
  const segmentId = await getOrCreateSegment(resend);

  console.log('Syncing subscribers into Resend...');
  const synced = await syncContacts(resend, segmentId, emails);
  console.log(`  synced ${synced}/${emails.length} contact(s)`);

  console.log('Creating broadcast...');
  // `segmentId` alone satisfies Resend's API (it maps to `segment_id`), but the SDK's
  // `RequireAtLeastOne<SegmentOptions>` union type incorrectly demands `audienceId` too.
  const broadcastOptions = {
    segmentId,
    from: FROM,
    subject: content.subject,
    ...(content.previewText ? { previewText: content.previewText } : {}),
    html: content.html,
    send: !isDraft,
  } as unknown as CreateBroadcastOptions;
  const broadcast = await resend.broadcasts.create(broadcastOptions);

  if (broadcast.error) throw new Error(broadcast.error.message);

  if (isDraft) {
    console.log(`Draft created: ${broadcast.data?.id}. Review and send from the Resend dashboard.`);
  } else {
    console.log(`Broadcast sent: ${broadcast.data?.id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
