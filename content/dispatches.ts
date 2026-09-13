import { dispatchSE101, type Dispatch } from './dispatch-se1-01';
import { dispatchSE102 } from './dispatch-se1-02';

export type PublishedDispatch = {
  slug: string;
  dispatch: Dispatch;
  synopsis: string;
  cover: string;
  coverAlt: string;
  imageWidth: number;
  imageHeight: number;
  publishedTime: string;
  endTitle: [string, string];
  endTeaser: string;
};

export const publishedDispatches: PublishedDispatch[] = [
  {
    slug: 'dispatch-two',
    dispatch: dispatchSE102,
    synopsis:
      'A midnight traffic stop pulls Constable Constantine Bediako into Day Zero—and toward a choice that will place the movement inside the Baobab.',
    cover: '/images/dispatch-two-poster.jpg',
    coverAlt: 'A masked Day Zero figure stands against a red signal-filled sky',
    imageWidth: 1600,
    imageHeight: 892,
    publishedTime: '2026-09-13',
    endTitle: ['Day Zero is inside.', 'The doors are open.'],
    endTeaser:
      'Constantine has entered the Baobab wearing a police badge. Explorer 233 does not yet know what walked in with him.',
  },
  {
    slug: 'dispatch-one',
    dispatch: dispatchSE101,
    synopsis:
      'Explorer 233 unveils its first interstellar ship in Accra. Before the night is over, someone promises to kill one of its scientists.',
    cover: '/images/dispatch-one-wide.png',
    coverAlt: 'Explorer 233 characters, spacecraft and the Baobab beneath a signal-filled sky',
    imageWidth: 1672,
    imageHeight: 941,
    publishedTime: '2026-08-03',
    endTitle: ['The opening is over.', 'The threat has begun.'],
    endTeaser:
      'The Baobab is sealed. Somewhere in Accra, a twenty-four-hour countdown has already started.',
  },
];

export const dispatchTwoRecap = [
  'The year is 2047. Humanity has established permanent settlements beyond Earth. At a research settlement on Mars, Dr. Amara Nkrumah detects a transmission from beyond the Solar System. Then another. Over the next six months, observatories on Earth, Mars and the Moon confirm signals from dozens of star systems, all carrying the same message: WE ARE HERE. It is the beginning of what the world will come to call the Signal Age.',
  "In Ghana, entrepreneur Laura Osei Baako founds Explorer 233—the country’s first space exploration agency. Her belief: Ghana won’t be a passenger in the Signal Age. It will help build the ships that carry humanity out to trace those signals back to their source.",
  'But before Explorer 233 ever reaches the stars, a movement already active in Ghana and beyond—calling itself Day Zero—believes the opposite: humanity’s place is on Earth, not among the stars. As Explorer 233 prepares to launch, Day Zero grows bolder, willing to stop it by any means necessary.',
];

export function getDispatch(slug: string) {
  return publishedDispatches.find((entry) => entry.slug === slug);
}
