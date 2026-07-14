export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correct: string;
}

export interface Quiz {
  universeId: string;
  title: string;
  crest: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    universeId: 'harry-potter',
    title: 'Trial of the Hogwarts Scholar',
    crest: '/crests/quiz-hp.svg',
    questions: [
      {
        id: 'hp-1',
        question: "What is the name of Harry Potter's pet owl?",
        options: ['Hedwig', 'Errol', 'Crookshanks', 'Scabbers'],
        correct: 'Hedwig',
      },
      {
        id: 'hp-2',
        question: 'Which Hogwarts house does Harry belong to?',
        options: ['Slytherin', 'Gryffindor', 'Ravenclaw', 'Hufflepuff'],
        correct: 'Gryffindor',
      },
      {
        id: 'hp-3',
        question: "What form does Harry's Patronus take?",
        options: ['A phoenix', 'A doe', 'A stag', 'An otter'],
        correct: 'A stag',
      },
      {
        id: 'hp-4',
        question: 'Who turns out to be the Half-Blood Prince?',
        options: ['Tom Riddle', 'Sirius Black', 'Regulus Black', 'Severus Snape'],
        correct: 'Severus Snape',
      },
      {
        id: 'hp-5',
        question: 'From which platform does the Hogwarts Express depart?',
        options: ['Nine and 3/4', 'Seven and a Half', 'Ten', 'Nine and a Half'],
        correct: 'Nine and 3/4',
      },
    ],
  },
  {
    universeId: 'lord-of-the-rings',
    title: 'Trial of the Ring-bearer',
    crest: '/crests/quiz-lotr.svg',
    questions: [
      {
        id: 'lotr-1',
        question: "Who is Frodo's loyal gardener and companion?",
        options: ['Peregrin Took', 'Samwise Gamgee', 'Meriadoc Brandybuck', 'Fredegar Bolger'],
        correct: 'Samwise Gamgee',
      },
      {
        id: 'lotr-2',
        question: 'What kind of creature was Gollum before the Ring corrupted him?',
        options: ['An Elf', 'A Hobbit', 'A Dwarf', 'A Man'],
        correct: 'A Hobbit',
      },
      {
        id: 'lotr-3',
        question: 'How many Rings of Power were given to the Dwarf-lords?',
        options: ['Three', 'Nine', 'Seven', 'One'],
        correct: 'Seven',
      },
      {
        id: 'lotr-4',
        question: "What is the name of Gandalf's horse?",
        options: ['Brego', 'Asfaloth', 'Bill', 'Shadowfax'],
        correct: 'Shadowfax',
      },
      {
        id: 'lotr-5',
        question: 'Into what new sword were the shards of Narsil reforged?',
        options: ['Andúril', 'Glamdring', 'Sting', 'Orcrist'],
        correct: 'Andúril',
      },
    ],
  },
  {
    universeId: 'witcher',
    title: 'Trial of the Wolf',
    crest: '/crests/quiz-witcher.svg',
    questions: [
      {
        id: 'witcher-1',
        question: "What is the name of Geralt's horse?",
        options: ['Roach', 'Scorpion', 'Kelpie', 'Pegasus'],
        correct: 'Roach',
      },
      {
        id: 'witcher-2',
        question: 'To which witcher school does Geralt belong?',
        options: [
          'The School of the Cat',
          'The School of the Wolf',
          'The School of the Griffin',
          'The School of the Bear',
        ],
        correct: 'The School of the Wolf',
      },
      {
        id: 'witcher-3',
        question: "Who is Geralt's child of surprise, bound to him by destiny?",
        options: ['Yennefer', 'Triss', 'Ciri', 'Renfri'],
        correct: 'Ciri',
      },
      {
        id: 'witcher-4',
        question: 'Which sorceress is Geralt bound to by a wish made to a djinn?',
        options: ['Triss Merigold', 'Fringilla Vigo', 'Philippa Eilhart', 'Yennefer of Vengerberg'],
        correct: 'Yennefer of Vengerberg',
      },
      {
        id: 'witcher-5',
        question: "What metal is a witcher's sword made of when hunting monsters?",
        options: ['Silver', 'Steel', 'Iron', 'Gold'],
        correct: 'Silver',
      },
    ],
  },
];
