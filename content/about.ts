/**
 * ⚠️ DRAFT CONTENT — written by Claude as a stand-in, NOT approved copy.
 *
 * The brief says the Creator bio and Journal are already drafted elsewhere;
 * those files were not in the repo, on this machine, or in Drive, so this is a
 * best-effort scaffold so the pages are real and reviewable. Everything here is
 * deliberately free of specific biographical claims — dates, institutions,
 * credits, awards — because inventing those about a real person is worse than
 * leaving them out. Swap this file wholesale when the real drafts land.
 *
 * House rule from the brief: the Journal is REAL VOICE ONLY. Never write
 * in-universe fiction here — that belongs in the Dispatches.
 */

export const creator = {
  name: 'August Osei',
  role: 'Creator, Explorer 233',
  portrait: null as string | null, // no approved portrait yet
  intro:
    'Explorer 233 is built by a small team out of one stubborn question: what does the future look like when Africa is holding the pen?',
  paragraphs: [
    'I did not set out to build a space agency. I set out to build a world where a girl on a rooftop in Accra looks up and does not have to imagine herself into someone else’s story to belong in it.',
    'Explorer 233 is that world — a private Ghanaian space agency, a cast of people carrying it, and a growing body of dispatches, games, and objects that let you stand inside it rather than watch it from outside.',
    'The number is Ghana’s calling code. It is on the front of the building for the same reason it is in the name: this comes from somewhere specific, and it is not apologising for that.',
    'If any of this reaches you, the thing I would most like you to do is not applaud. It is to join, and then to build something of your own.',
  ],
};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  standfirst: string;
  paragraphs: string[];
};

export const journal: JournalEntry[] = [
  {
    slug: 'why-233',
    title: 'Why 233',
    date: '2026-08-03',
    dateLabel: 'August 2026',
    standfirst: 'On naming a space agency after a phone code.',
    paragraphs: [
      'People keep asking whether 233 means something technical. It does not. It is the code you dial to reach Ghana, and that is the entire point.',
      'Most science fiction set in space quietly assumes the future is furnished by somewhere else. You can usually tell within a minute of the opening shot whose future it is. I wanted a world where you can tell within a minute too — and the answer is here.',
      'Naming it after the calling code was the cheapest, plainest way to say that. No mythology required. Just a number people already dial when they want to reach home.',
    ],
  },
  {
    slug: 'building-in-public',
    title: 'Building this in public',
    date: '2026-08-03',
    dateLabel: 'August 2026',
    standfirst: 'What this journal is for, and what it is not.',
    paragraphs: [
      'This journal is the one place on the site that is not fiction. Everything else — the dispatches, the people, the building in Accra — is a world. This is me, in my own voice, talking about making it.',
      'That separation matters to me. If everything is in-universe, nothing is trustworthy. So: dispatches are the story, and this is the workbench. Wrong turns, costs, things that did not work, things that did.',
      'If you want the story, start with the dispatches. If you want to know how it is actually being made, stay here.',
    ],
  },
];
