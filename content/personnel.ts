/**
 * Personnel records for The World.
 *
 * Sourced from "Explorer 233 — Character & Visual Bible v2.0" (Drive, 19 July
 * 2026) and Dispatch SE1-01. Every frame in `gallery` is an approved visual
 * lock: the studio references are the CHAR_*_VisualLock / TurnaroundSheet /
 * ExpressionSheet masters sliced into single frames, and the `still` frames are
 * shots from the Trailer 01 library.
 *
 * The prose is unchanged from the bible — it is only *labelled* now. A reader
 * who wants the one-line answer stops at `lead`; a reader who wants the file
 * opens it and gets named sections instead of four undifferentiated paragraphs.
 *
 * Bediako deliberately has NO imagery. He is a serving police officer moving
 * inside Day Zero — a file with no photograph is truer to the story than a
 * generated face, and the redacted state is the point.
 */

/** One image in a record's gallery.
 *  `reference` = art-department studio plate. `still` = a frame from the story. */
export type Frame = {
  src: string;
  label: string;
  kind: 'reference' | 'still';
  /** object-position for the 4:5 stage crop; defaults to centre-upper. */
  pos?: string;
};

export type Record = {
  id: string;
  name: string;
  designation: string;
  clearance: 'open' | 'restricted' | 'redacted';
  /** The one sentence that has to land if the reader reads nothing else. */
  lead: string;
  meta: [string, string][];
  /** Named sections of the open file. */
  file: [string, string][];
  gallery: Frame[];
};

export const AGENCY: Record[] = [
  {
    id: 'laura',
    name: 'Laura Osei Baako',
    designation: 'Founder & Chief Executive',
    clearance: 'open',
    lead: 'Laura built Explorer 233 to answer the signals reaching Earth. On the night her headquarters opens, an anonymous enemy gives her twenty-four hours to save one of her scientists.',
    meta: [
      ['Age', '35'],
      ['Origin', 'Ghana'],
      ['Prior', 'Founder, MellaniumORBIT'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    file: [
      [
        'Appearance',
        'Naturally white braided hair from the root, a plain fitted white shirt, tailored black trousers, refined red shoes, and a single glove — red, most days. She reads as a non-conformist founder, never a corporate stock chief executive.',
      ],
      [
        'Temperament',
        'Brilliant, disciplined, eccentric, stubborn, emotionally guarded, and impossible to categorise quickly. She founded MellaniumORBIT before she was thirty, sold it for a figure no news channel could agree on, and spent much of it building the Baobab.',
      ],
      [
        'Role in the story',
        'She is the strategic anchor of the agency rather than its field hero: she identifies the threat, recruits the people who can meet it, and makes the decisions that shape everything downstream. Also the private keeper of a deeper mystery than she has admitted to anyone.',
      ],
    ],
    gallery: [
      { src: '/images/cast/laura-01-bust.jpg', label: 'Visual lock · bust', kind: 'reference', pos: '50% 22%' },
      { src: '/images/cast/laura-02-full.jpg', label: 'Full-body reference', kind: 'reference', pos: '50% 30%' },
      { src: '/images/cast/laura-03-focused.jpg', label: 'Expression · focused', kind: 'reference', pos: '50% 24%' },
      { src: '/images/cast/laura-04-thoughtful.jpg', label: 'Expression · thoughtful', kind: 'reference', pos: '50% 24%' },
      { src: '/images/cast/laura-05-side.jpg', label: 'Turnaround · profile', kind: 'reference', pos: '50% 24%' },
      { src: '/images/cast/laura-06-field.jpg', label: 'The Baobab, opening night', kind: 'still', pos: '38% 50%' },
    ],
  },
  {
    id: 'maximus',
    name: 'Maximus Boateng',
    designation: 'Mission Director · Second-in-command',
    clearance: 'open',
    lead: 'Maximus turns Laura’s ambitions into missions people can survive. He is responsible for the crews, the risks they take, and the difficult truth that someone may not come home.',
    meta: [
      ['Origin', 'Ghana'],
      ['Function', 'Mission operations'],
      ['Reports to', 'L. Osei Baako'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    file: [
      [
        'Appearance',
        'Bald, bearded, broad-shouldered. Dark glasses, a single earring, and one cowrie pendant on a black cord. Executive mission-ops rather than security detail — blazer, earth tones, nothing invented and nothing worn for show.',
      ],
      [
        'Temperament',
        'Controlled, exacting, loyal, dry, strategic, and not easily impressed. He is the counterweight to Laura: where everyone else offers her belief, he offers measurements.',
      ],
      [
        'Role in the story',
        'He is the person who tells her the thing she does not want to hear on the morning she least wants to hear it, and the one who does not flinch when she decides to go ahead anyway. He notices who leaves a room, and when.',
      ],
    ],
    gallery: [
      { src: '/images/cast/maximus-01-bust.jpg', label: 'Visual lock · bust', kind: 'reference', pos: '50% 26%' },
      { src: '/images/cast/maximus-02-profile.jpg', label: 'Turnaround · profile', kind: 'reference', pos: '50% 26%' },
      { src: '/images/cast/maximus-03-full.jpg', label: 'Full-body reference', kind: 'reference', pos: '50% 32%' },
      { src: '/images/cast/maximus-04-field.jpg', label: 'The Baobab, opening night', kind: 'still', pos: '62% 50%' },
    ],
  },
  {
    id: 'mam',
    name: 'Menaye Ama Mensah',
    designation: 'Physics student · Host, Member Signal',
    clearance: 'open',
    lead: 'Mam is an eighteen-year-old physics student in Accra when Explorer 233 opens its doors. Her fascination with the company pulls her toward a conflict far larger than the public celebration outside it.',
    meta: [
      ['Age', '18'],
      ['Origin', 'Accra, Ghana'],
      ['Studying', 'Physics, second year'],
      ['First seen', 'Dispatch SE1-01'],
    ],
    file: [
      [
        'Appearance',
        'Short natural hair with compact volume, thin round glasses, a mustard headband. Smart-casual, never costume. She goes by Mam.',
      ],
      [
        'Temperament',
        'Sharp, curious, slightly dramatic, scientifically literate, socially confident, and unwilling to let anyone repeat a rumour sloppily in her presence. She has read every public paper Laura has written and argued online with strangers who insist a computer scientist has no business building an interstellar programme.',
      ],
      [
        'Role in the story',
        'She is the public lens on Explorer 233 and the reason it matters — a student in Accra doing her own arithmetic on everything the sky owes her, and deciding to go and collect it.',
      ],
    ],
    gallery: [
      { src: '/images/cast/mam-01-portrait.jpg', label: 'Visual lock · portrait', kind: 'reference', pos: '50% 18%' },
      { src: '/images/cast/mam-02-desk.jpg', label: 'Member Signal, broadcast desk', kind: 'still', pos: '45% 30%' },
      { src: '/images/cast/mam-03-accra.jpg', label: 'Accra, the night of the opening', kind: 'still', pos: '62% 45%' },
    ],
  },
];

export const OPPOSITION: Record[] = [
  {
    id: 'day-zero',
    name: 'Day Zero',
    designation: 'Movement · Threat assessment ongoing',
    clearance: 'restricted',
    lead: 'Day Zero believes contact with other worlds will carry humanity’s worst instincts beyond Earth. Its members intend to stop Explorer 233 before the first mission can answer the stars.',
    meta: [
      ['Structure', 'Cells, branch-organised'],
      ['Identifier', 'White zero, black cloth'],
      ['Slogan', 'Reset. Return. Rebuild.'],
      ['Status', 'Active'],
    ],
    file: [
      [
        'Identifiers',
        'Black cloth face covering with one large white zero running from the forehead toward the mouth. Grounded dark clothing. No armour, no robes, nothing theatrical — which is precisely what makes them difficult to find.',
      ],
      [
        'Doctrine',
        'They hold that humanity crossed a boundary through artificial intelligence, technological dependence and expansion beyond Earth, and that civilisation must be reset before it carries its violence into the wider universe.',
      ],
      [
        'History',
        'They were dismissed as noise for years. Noise becomes useful when enough people are frightened enough to hear music inside it.',
      ],
    ],
    gallery: [
      { src: '/images/cast/dayzero-01-front.jpg', label: 'Mask reference · front', kind: 'reference', pos: '50% 30%' },
      { src: '/images/cast/dayzero-03-eyes.jpg', label: 'Mask reference · close', kind: 'reference', pos: '50% 34%' },
      { src: '/images/cast/dayzero-04-masks.jpg', label: 'Mask sheet · three angles', kind: 'reference', pos: '50% 45%' },
      { src: '/images/cast/dayzero-05-inside.jpg', label: 'Inside the building', kind: 'still', pos: '55% 50%' },
    ],
  },
  {
    id: 'bediako',
    name: 'Constantine Bediako',
    designation: 'Ghana Police Service · Day Zero initiate',
    clearance: 'redacted',
    lead: 'Bediako is a serving police officer recruited into Day Zero. His access to the systems meant to protect Accra makes him more dangerous than a protester outside the gates.',
    meta: [
      ['Origin', 'Ghana'],
      ['Cover', 'Serving police officer'],
      ['Recruited', 'By personal contact'],
      ['Imagery', 'None on file'],
    ],
    file: [
      [
        'Temperament',
        'Disciplined, forceful, spiritually committed, order-driven and ambitious. He is not a reluctant recruit and should not be mistaken for a hesitant one.',
      ],
      [
        'Belief',
        'He keeps a shrine at home and accepts spiritual realities modern institutions dismiss. He reads the Signal Age as both technological arrogance and spiritual danger.',
      ],
      [
        'Role in the story',
        'He is handpicked rather than publicly recruited, and proves more aggressive than the people who recruited him. No photograph of him in connection with Day Zero exists.',
      ],
    ],
    gallery: [],
  },
];
