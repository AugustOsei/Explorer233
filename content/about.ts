export const creator = {
  name: 'August Peekay',
  role: 'Creator of Explorer 233',
  intro:
    'Explorer 233 is an African science-fiction franchise created in Ghana and built to move across fiction, art, games, merchandise and shared experiences.',
  paragraphs: [
    'August Peekay is the pen name of the creator behind Explorer 233. The project began with a question: what might the future look like when Africa is not the background, but one of the places shaping it?',
    'Explorer 233 is being developed as a connected story IP—one that can move between serialized fiction, visual art, games, products and live experiences without losing its Ghanaian point of origin.',
  ],
};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  author: string;
  standfirst: string;
  paragraphs: string[];
};

export const journal: JournalEntry[] = [
  {
    slug: 'why-233',
    title: 'Why 233',
    date: '2026-08-03',
    dateLabel: 'August 2026',
    author: 'August Peekay',
    standfirst: 'On naming a story universe after Ghana’s international calling code.',
    paragraphs: [
      'People keep asking whether 233 means something technical. It does not. It is the code you dial to reach Ghana, and that is the entire point.',
      'Most science fiction set in space quietly assumes the future is furnished by somewhere else. You can usually tell within a minute of the opening shot whose future it is. I wanted a world where you can tell within a minute too—and the answer is here.',
      'Naming it after the calling code was the clearest way to say that. No mythology required. Just a number people already dial when they want to reach home.',
    ],
  },
  {
    slug: 'building-in-public',
    title: 'Building this in public',
    date: '2026-08-03',
    dateLabel: 'August 2026',
    author: 'August Peekay',
    standfirst: 'What the Explorer 233 journal is for—and what it is not.',
    paragraphs: [
      'This journal is the one place on the site that is not fiction. The dispatches are the story; this is the workbench. It is where I can talk plainly about the decisions, wrong turns and discoveries involved in building Explorer 233.',
      'That separation matters. A fictional universe should feel immersive, but visitors should also have a clear place to hear from the person making it. The journal is that place.',
      'If you want the story, start with the dispatches. If you want to know how it is actually being made, stay here.',
    ],
  },
];

export function getJournalEntry(slug: string) {
  return journal.find((entry) => entry.slug === slug);
}

export function getReadingTime(entry: JournalEntry) {
  const words = [entry.standfirst, ...entry.paragraphs].join(' ').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}
