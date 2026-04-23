export interface Universe {
  id: string;
  name: string;
  description: string;
  route: string;
  frame: string;
  image?: string;
}

export const universes: Universe[] = [
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    description:
      'Within these hallowed halls of Hogwarts, secrets older than memory await those bold enough to ask.',
    route: '/oracle/harry-potter',
    frame: '/frames/frame-hp.svg',
    image: '/harry-potter.png',
  },
  {
    id: 'lord-of-the-rings',
    name: 'The Lord of the Rings',
    description:
      'From the Shire to the fires of Mordor, the Oracle speaks in the tongue of ancient Middle-earth.',
    route: '/oracle/lord-of-the-rings',
    frame: '/frames/frame-lotr.svg',
    image: '/ring.png',
  },
  {
    id: 'witcher',
    name: 'The Witcher',
    description:
      'In a world crawling with monsters and moral ambiguity, the Oracle knows all paths - even the darkest ones.',
    route: '/oracle/witcher',
    frame: '/frames/frame-witcher.svg',
    image: '/wolf.png',
  },
];
