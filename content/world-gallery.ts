export type Category = 'characters' | 'assets' | 'promotional';

export type Artwork = {
  src: string;
  label: string;
  position?: string;
  fit?: 'cover' | 'contain';
};

export type TradingCard = {
  id: string;
  title: string;
  role: string;
  category: Category;
  image: string;
  alt: string;
  position?: string;
  crop?: 'francis' | 'efua';
  bio: string;
  gallery: Artwork[];
  tone?: 'warning';
};

export const WORLD_CARDS: TradingCard[] = [
  {
    id: 'laura',
    title: 'Laura Osei Baako',
    role: 'Founder & Chief Executive',
    category: 'characters',
    image: '/images/cast/laura-01-bust.jpg',
    alt: 'Laura Osei Baako, founder of Explorer 233',
    position: '50% 22%',
    bio: 'Laura built Explorer 233 to answer the signals reaching Earth. Visionary, disciplined and impossible to categorise, she is both the institution’s public symbol and the keeper of a deeper mystery.',
    gallery: [
      { src: '/images/cast/laura-01-bust.jpg', label: 'Portrait', position: '50% 22%' },
      { src: '/images/cast/laura-02-full.jpg', label: 'Full figure', position: '50% 28%' },
      { src: '/images/cast/laura-03-focused.jpg', label: 'Focused', position: '50% 24%' },
      { src: '/images/cast/laura-04-thoughtful.jpg', label: 'Thoughtful', position: '50% 24%' },
      { src: '/images/cast/laura-05-side.jpg', label: 'Profile', position: '50% 24%' },
      { src: '/images/cast/laura-06-field.jpg', label: 'At the Baobab', position: '38% 50%' },
    ],
  },
  {
    id: 'maximus',
    title: 'Maximus Boateng',
    role: 'Mission Director',
    category: 'characters',
    image: '/images/cast/maximus-01-bust.jpg',
    alt: 'Maximus Boateng, mission director of Explorer 233',
    position: '50% 24%',
    bio: 'Maximus turns Laura’s ambitions into missions people can survive. Exacting and quietly loyal, he carries responsibility for every crew, every risk and every person who may not come home.',
    gallery: [
      { src: '/images/cast/maximus-01-bust.jpg', label: 'Portrait', position: '50% 25%' },
      { src: '/images/cast/maximus-02-profile.jpg', label: 'Profile', position: '50% 25%' },
      { src: '/images/cast/maximus-03-full.jpg', label: 'Full figure', position: '50% 32%' },
      { src: '/images/cast/maximus-04-field.jpg', label: 'At the Baobab', position: '62% 50%' },
    ],
  },
  {
    id: 'mam',
    title: 'Menaye Ama Mensah',
    role: 'Physics student · Member Signal',
    category: 'characters',
    image: '/images/cast/mam-01-portrait.jpg',
    alt: 'Menaye Ama Mensah, known as Mam',
    position: '50% 18%',
    bio: 'Mam is an eighteen-year-old physics student in Accra. Her fascination with Explorer 233 draws her from the public celebration outside its gates into a conflict far larger than she imagined.',
    gallery: [
      { src: '/images/cast/mam-01-portrait.jpg', label: 'Portrait', position: '50% 18%' },
      { src: '/images/cast/mam-02-desk.jpg', label: 'Member Signal', position: '45% 30%' },
      { src: '/images/cast/mam-03-accra.jpg', label: 'Opening night', position: '62% 45%' },
    ],
  },
  {
    id: 'francis',
    title: 'Francis Kwesi Mensah',
    role: 'Father of Mam and Kojo',
    category: 'characters',
    image: '/images/mensah-parents.png',
    alt: 'Francis Kwesi Mensah',
    crop: 'francis',
    bio: 'Francis is Mam and Kojo’s father. His family experiences the Signal Age not as distant history, but as something entering their home and reshaping what their children believe is possible.',
    gallery: [{ src: '/images/mensah-parents.png', label: 'Character reference', fit: 'contain' }],
  },
  {
    id: 'efua',
    title: 'Efua Mensah',
    role: 'Mother of Mam and Kojo',
    category: 'characters',
    image: '/images/mensah-parents.png',
    alt: 'Efua Mensah',
    crop: 'efua',
    bio: 'Efua is Mam and Kojo’s mother. She watches her children embrace the promises of the Signal Age while understanding more clearly what exploration may demand from a family.',
    gallery: [{ src: '/images/mensah-parents.png', label: 'Character reference', fit: 'contain' }],
  },
  {
    id: 'day-zero',
    title: 'Day Zero',
    role: 'The masked opposition',
    category: 'characters',
    image: '/images/cast/dayzero-01-front.jpg',
    alt: 'A masked figure associated with Day Zero',
    position: '50% 28%',
    tone: 'warning',
    bio: 'They believe humanity crossed a boundary through technology and expansion beyond Earth. The white zero on black cloth belongs to those determined to stop Explorer 233 before it reaches the stars.',
    gallery: [
      { src: '/images/cast/dayzero-01-front.jpg', label: 'The mask', position: '50% 28%' },
      { src: '/images/cast/dayzero-03-eyes.jpg', label: 'Behind the mask', position: '50% 34%' },
      { src: '/images/cast/dayzero-04-masks.jpg', label: 'Three faces', position: '50% 45%' },
      { src: '/images/cast/dayzero-05-inside.jpg', label: 'Inside the building', position: '55% 50%' },
    ],
  },
  {
    id: 'baobab',
    title: 'The Baobab',
    role: 'Explorer 233 headquarters',
    category: 'assets',
    image: '/images/baobab-hq.jpg',
    alt: 'The Baobab, Explorer 233 headquarters in Accra',
    position: '50% 55%',
    bio: 'Explorer 233’s headquarters in Accra: part workplace, part public landmark and the ground from which Ghana prepares to answer the stars.',
    gallery: [
      { src: '/images/baobab-hq.jpg', label: 'The Baobab', position: '50% 55%' },
      { src: '/images/baobab-lockdown.jpg', label: 'Lockdown', position: '50% 50%' },
    ],
  },
  {
    id: 'nipa-nsa',
    title: 'Nipa Nsa',
    role: 'Interstellar vessel',
    category: 'assets',
    image: '/images/nipa-nsa.jpg',
    alt: 'Nipa Nsa, Explorer 233 interstellar spacecraft',
    position: '50% 45%',
    bio: 'Explorer 233’s first interstellar vessel. Assembled in orbit, its reinforced spine and rotating habitats were designed for a journey far beyond Earth.',
    gallery: [{ src: '/images/nipa-nsa.jpg', label: 'Nipa Nsa', position: '50% 45%' }],
  },
  {
    id: 'grand-opening',
    title: 'The Grand Opening',
    role: 'Dispatch One',
    category: 'promotional',
    image: '/images/dispatch-one-wide.png',
    alt: 'Promotional artwork for The Grand Opening',
    position: '50% 48%',
    bio: 'Explorer 233 opens the Baobab to the world. Before the celebration is over, a warning turns humanity’s newest promise into a countdown.',
    gallery: [{ src: '/images/dispatch-one-wide.png', label: 'The Grand Opening', position: '50% 48%' }],
  },
  {
    id: 'mars',
    title: 'The Silence Ends',
    role: 'Mars · 2047',
    category: 'promotional',
    image: '/images/scene-mars.jpg',
    alt: 'A scientist at the Mars settlement as a signal is detected',
    position: '50% 50%',
    bio: 'At the Mars settlement, an ordinary night shift becomes the moment humanity discovers that the silence between the stars has ended.',
    gallery: [{ src: '/images/scene-mars.jpg', label: 'Mars settlement', position: '50% 50%' }],
  },
  {
    id: 'warning',
    title: 'The Warning',
    role: 'Opening night',
    category: 'promotional',
    image: '/images/return-begins.jpg',
    alt: 'Laura and Maximus facing a masked warning',
    position: '50% 50%',
    tone: 'warning',
    bio: 'A private transmission interrupts the opening of the Baobab. Laura and Maximus are told that one of five scientists will be dead within twenty-four hours.',
    gallery: [{ src: '/images/return-begins.jpg', label: 'The warning', position: '50% 50%' }],
  },
];

export function categoryLabel(category: Category) {
  if (category === 'characters') return 'Character';
  if (category === 'assets') return 'Asset';
  return 'Promo art';
}
