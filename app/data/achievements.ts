interface ProgressSnapshot {
  questionsAsked: number;
  level: number;
  completedQuizzes: string[];
}

export interface Achievement {
  name: string;
  desc: string;
  quizUniverseId?: string;
  unlock: (p: ProgressSnapshot) => boolean;
}

export const achievements: Achievement[] = [
  {
    name: 'First Summons',
    desc: 'Ask the Oracle your very first question.',
    unlock: (p) => p.questionsAsked >= 1,
  },
  {
    name: 'Hogwarts Scholar',
    desc: 'Complete the Harry Potter lore quiz.',
    quizUniverseId: 'harry-potter',
    unlock: (p) => p.completedQuizzes.includes('harry-potter'),
  },
  {
    name: 'Ring Bearer',
    desc: 'Explore the depths of Middle-earth.',
    quizUniverseId: 'lord-of-the-rings',
    unlock: (p) => p.completedQuizzes.includes('lord-of-the-rings'),
  },
  {
    name: 'Path of the Wolf',
    desc: "Survive the Witcher's trials.",
    quizUniverseId: 'witcher',
    unlock: (p) => p.completedQuizzes.includes('witcher'),
  },
  {
    name: 'Master Diviner',
    desc: 'Reach Level 10.',
    unlock: (p) => p.level >= 10,
  },
  {
    name: 'Keeper of Secrets',
    desc: 'Ask 250 questions.',
    unlock: (p) => p.questionsAsked >= 250,
  },
];
