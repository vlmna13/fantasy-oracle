export interface Achievement {
  name: string;
  desc: string;
  quizUniverseId?: string;
}

export const achievements: Achievement[] = [
  { name: 'First Summons', desc: 'Ask the Oracle your very first question.' },
  {
    name: 'Hogwarts Scholar',
    desc: 'Complete the Harry Potter lore quiz.',
    quizUniverseId: 'harry-potter',
  },
  {
    name: 'Ring Bearer',
    desc: 'Explore the depths of Middle-earth.',
    quizUniverseId: 'lord-of-the-rings',
  },
  {
    name: 'Path of the Wolf',
    desc: "Survive the Witcher's trials.",
    quizUniverseId: 'witcher',
  },
  { name: 'Master Diviner', desc: 'Reach Level 10.' },
  { name: 'Keeper of Secrets', desc: 'Ask 250 questions.' },
];
