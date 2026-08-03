/**
 * Personnel records for The World.
 *
 * Sourced from "Explorer 233 — Character & Visual Bible v2.0" (Drive, 19 July
 * 2026) and Dispatch SE1-01. Portraits are the approved visual locks.
 *
 * Bediako deliberately has NO portrait. He is a serving police officer moving
 * inside Day Zero — a file with no photograph is truer to the story than a
 * generated face, and the redacted state is the point.
 */

export type Record = {
  id: string;
  name: string;
  designation: string;
  portrait: string | null;
  pos?: string;
  meta: [string, string][];
  bio: string[];
  clearance: 'open' | 'restricted' | 'redacted';
};

export const AGENCY: Record[] = [
  {
    id: 'laura',
    name: 'Laura Osei Baako',
    designation: 'Founder & Chief Executive',
    portrait: '/images/char-laura-full.jpg',
    pos: '50% 16%',
    clearance: 'open',
    meta: [
      ['Age', '35'],
      ['Origin', 'Ghana'],
      ['Prior', 'Founder, MellaniumORBIT'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    bio: [
      'Naturally white braided hair from the root, a plain fitted white shirt, tailored black trousers, refined red shoes, and a single glove — red, most days. She reads as a non-conformist founder, never a corporate stock chief executive.',
      'Brilliant, disciplined, eccentric, stubborn, emotionally guarded, and impossible to categorise quickly. She founded MellaniumORBIT before she was thirty, sold it for a figure no news channel could agree on, and spent much of it building the Baobab.',
      'She is the strategic anchor of the agency rather than its field hero: she identifies the threat, recruits the people who can meet it, and makes the decisions that shape everything downstream. Also the private keeper of a deeper mystery than she has admitted to anyone.',
    ],
  },
  {
    id: 'maximus',
    name: 'Maximus Boateng',
    designation: 'Mission Director · Second-in-command',
    portrait: '/images/char-maximus.jpg',
    pos: '50% 18%',
    clearance: 'open',
    meta: [
      ['Origin', 'Ghana'],
      ['Function', 'Mission operations'],
      ['Reports to', 'L. Osei Baako'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    bio: [
      'Bald, bearded, broad-shouldered. Dark glasses, a single earring, and one cowrie pendant on a black cord. Executive mission-ops rather than security detail — blazer, earth tones, nothing invented and nothing worn for show.',
      'Controlled, exacting, loyal, dry, strategic, and not easily impressed. He is the counterweight to Laura: where everyone else offers her belief, he offers measurements.',
      'He is the person who tells her the thing she does not want to hear on the morning she least wants to hear it, and the one who does not flinch when she decides to go ahead anyway. He notices who leaves a room, and when.',
    ],
  },
  {
    id: 'mam',
    name: 'Menaye Ama Mensah',
    designation: 'Physics student · Host, Member Signal',
    portrait: '/images/char-mam.jpg',
    pos: '50% 20%',
    clearance: 'open',
    meta: [
      ['Age', '18'],
      ['Origin', 'Accra, Ghana'],
      ['Studying', 'Physics, second year'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    bio: [
      'Short natural hair with compact volume, thin round glasses, a mustard headband. Smart-casual, never costume. She goes by Mam.',
      'Sharp, curious, slightly dramatic, scientifically literate, socially confident, and unwilling to let anyone repeat a rumour sloppily in her presence. She has read every public paper Laura has written and argued online with strangers who insist a computer scientist has no business building an interstellar programme.',
      'She is the public lens on Explorer 233 and the reason it matters — a student in Accra doing her own arithmetic on everything the sky owes her, and deciding to go and collect it.',
    ],
  },
];

export const OPPOSITION: Record[] = [
  {
    id: 'day-zero',
    name: 'Day Zero',
    designation: 'Movement · Threat assessment ongoing',
    portrait: '/images/dayzero-0.jpg',
    clearance: 'restricted',
    meta: [
      ['Structure', 'Cells, branch-organised'],
      ['Identifier', 'White zero, black cloth'],
      ['Slogan', 'Reset. Return. Rebuild.'],
      ['Status', 'Active'],
    ],
    bio: [
      'Black cloth face covering with one large white zero running from the forehead toward the mouth. Grounded dark clothing. No armour, no robes, nothing theatrical — which is precisely what makes them difficult to find.',
      'They hold that humanity crossed a boundary through artificial intelligence, technological dependence and expansion beyond Earth, and that civilisation must be reset before it carries its violence into the wider universe.',
      'They were dismissed as noise for years. Noise becomes useful when enough people are frightened enough to hear music inside it.',
    ],
  },
  {
    id: 'bediako',
    name: 'Constantine Bediako',
    designation: 'Ghana Police Service · Day Zero initiate',
    portrait: null,
    clearance: 'redacted',
    meta: [
      ['Origin', 'Ghana'],
      ['Cover', 'Serving police officer'],
      ['Recruited', 'By personal contact'],
      ['Imagery', 'None on file'],
    ],
    bio: [
      'Disciplined, forceful, spiritually committed, order-driven and ambitious. He is not a reluctant recruit and should not be mistaken for a hesitant one.',
      'He keeps a shrine at home and accepts spiritual realities modern institutions dismiss. He reads the Signal Age as both technological arrogance and spiritual danger.',
      'He is handpicked rather than publicly recruited, and proves more aggressive than the people who recruited him. No photograph of him in connection with Day Zero exists.',
    ],
  },
];
