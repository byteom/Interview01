// src/data/aptitudeQuestions.ts

export interface AptitudeQuestion {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  companies: string[];
  timeLimit: number; // in seconds
  tags: string[];
}

export const aptitudeCategories = [
  'Logical Reasoning',
  'Quantitative Aptitude',
  'Verbal Reasoning',
  'Data Interpretation',
  'Puzzles'
];

export const aptitudeQuestions: AptitudeQuestion[] = [
  // LOGICAL REASONING
  {
    id: 'apt_001',
    category: 'Logical Reasoning',
    subcategory: 'Pattern Recognition',
    question: 'What comes next in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '48'],
    correctAnswer: 1,
    explanation: 'The differences between consecutive terms are 4, 6, 8, 10, 12. The next difference should be 12, so 30 + 12 = 42.',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Microsoft'],
    timeLimit: 60,
    tags: ['series', 'patterns']
  },
  {
    id: 'apt_002',
    category: 'Logical Reasoning',
    subcategory: 'Blood Relations',
    question: "Pointing to a man, Sarah said, 'He is the brother of my father's only daughter.' How is the man related to Sarah?",
    options: ['Brother', 'Father', 'Uncle', 'Cousin'],
    correctAnswer: 0,
    explanation: "Father's only daughter is Sarah herself. So the man is Sarah's brother.",
    difficulty: 'medium',
    companies: ['TCS', 'Infosys', 'Wipro'],
    timeLimit: 90,
    tags: ['relations', 'logic']
  },
  {
    id: 'apt_003',
    category: 'Logical Reasoning',
    subcategory: 'Coding-Decoding',
    question: 'If COMPUTER is coded as RFUVQNPC, how is MEDICINE coded?',
    options: ['EOJDJEFM', 'EOJEHEFM', 'EOIDJEFM', 'EOIDHEFM'],
    correctAnswer: 0,
    explanation: 'Each letter is replaced by its reverse position letter in the alphabet: C→R, O→F, M→N, etc. Applying the same: M→N, E→V, D→W, I→R, C→X, I→R, N→M, E→V = But actually reversing gives EOJDJEFM',
    difficulty: 'hard',
    companies: ['Accenture', 'Cognizant'],
    timeLimit: 120,
    tags: ['coding', 'patterns']
  },
  {
    id: 'apt_004',
    category: 'Logical Reasoning',
    subcategory: 'Direction Sense',
    question: 'A person walks 5 km North, turns right and walks 3 km, then turns right again and walks 5 km. How far is he from the starting point?',
    options: ['3 km', '5 km', '8 km', '13 km'],
    correctAnswer: 0,
    explanation: 'The person ends up 3 km East of the starting point, forming a rectangle. Distance = 3 km.',
    difficulty: 'easy',
    companies: ['IBM', 'HCL'],
    timeLimit: 90,
    tags: ['direction', 'distance']
  },
  {
    id: 'apt_005',
    category: 'Logical Reasoning',
    subcategory: 'Syllogism',
    question: 'All books are novels. Some novels are poems. Which conclusion follows?\nI. Some books are poems.\nII. Some poems are novels.',
    options: ['Only I', 'Only II', 'Both I and II', 'Neither I nor II'],
    correctAnswer: 1,
    explanation: 'Only conclusion II follows because some novels are poems is given, which means some poems must be novels.',
    difficulty: 'medium',
    companies: ['Deloitte', 'EY'],
    timeLimit: 90,
    tags: ['syllogism', 'logic']
  },

  // QUANTITATIVE APTITUDE
  {
    id: 'apt_006',
    category: 'Quantitative Aptitude',
    subcategory: 'Percentage',
    question: 'A product is sold at 20% profit. If both cost and selling price are reduced by Rs. 20, the profit would be 30%. What is the cost price?',
    options: ['Rs. 100', 'Rs. 120', 'Rs. 140', 'Rs. 160'],
    correctAnswer: 1,
    explanation: 'Let CP = x. SP = 1.2x. New CP = x-20, New SP = 1.2x-20. (1.2x-20) = 1.3(x-20). Solving: x = 120.',
    difficulty: 'hard',
    companies: ['Goldman Sachs', 'Morgan Stanley'],
    timeLimit: 180,
    tags: ['profit-loss', 'percentage']
  },
  {
    id: 'apt_007',
    category: 'Quantitative Aptitude',
    subcategory: 'Time and Work',
    question: 'A and B together can complete a work in 12 days. B and C together can complete it in 15 days. C and A together can complete it in 20 days. How many days will A alone take?',
    options: ['20 days', '24 days', '30 days', '40 days'],
    correctAnswer: 2,
    explanation: '(A+B) = 1/12, (B+C) = 1/15, (C+A) = 1/20. Adding: 2(A+B+C) = 1/12+1/15+1/20 = 1/5. So A+B+C = 1/10. A = (A+B+C)-(B+C) = 1/10-1/15 = 1/30. A takes 30 days.',
    difficulty: 'hard',
    companies: ['Amazon', 'Flipkart'],
    timeLimit: 180,
    tags: ['time-work', 'efficiency']
  },
  {
    id: 'apt_008',
    category: 'Quantitative Aptitude',
    subcategory: 'Simple Interest',
    question: 'What is the simple interest on Rs. 400 for 5 years at 6% per annum?',
    options: ['Rs. 100', 'Rs. 120', 'Rs. 140', 'Rs. 160'],
    correctAnswer: 1,
    explanation: 'SI = (P × R × T)/100 = (400 × 6 × 5)/100 = 120.',
    difficulty: 'easy',
    companies: ['HDFC', 'ICICI'],
    timeLimit: 60,
    tags: ['simple-interest', 'banking']
  },
  {
    id: 'apt_009',
    category: 'Quantitative Aptitude',
    subcategory: 'Ratio and Proportion',
    question: 'The ratio of ages of A and B is 3:4. After 5 years, the ratio becomes 4:5. What is the present age of A?',
    options: ['15 years', '20 years', '25 years', '30 years'],
    correctAnswer: 0,
    explanation: 'Let ages be 3x and 4x. After 5 years: (3x+5)/(4x+5) = 4/5. Cross multiply: 15x+25 = 16x+20. x=5. Present age of A = 3×5 = 15 years.',
    difficulty: 'medium',
    companies: ['TCS', 'Infosys'],
    timeLimit: 120,
    tags: ['ratio', 'age']
  },
  {
    id: 'apt_010',
    category: 'Quantitative Aptitude',
    subcategory: 'Speed and Distance',
    question: 'A train 150m long is running at 54 km/hr. How long will it take to cross a platform 250m long?',
    options: ['20 seconds', '24 seconds', '26.67 seconds', '30 seconds'],
    correctAnswer: 2,
    explanation: 'Total distance = 150+250 = 400m. Speed = 54 km/hr = 15 m/s. Time = 400/15 = 26.67 seconds.',
    difficulty: 'medium',
    companies: ['Railways', 'Defence'],
    timeLimit: 120,
    tags: ['speed-distance', 'time']
  },

  // VERBAL REASONING
  {
    id: 'apt_011',
    category: 'Verbal Reasoning',
    subcategory: 'Synonyms',
    question: 'Choose the word most similar in meaning to ABANDON:',
    options: ['Retain', 'Desert', 'Maintain', 'Continue'],
    correctAnswer: 1,
    explanation: 'Desert means to leave or abandon something, making it the correct synonym.',
    difficulty: 'easy',
    companies: ['Microsoft', 'Google'],
    timeLimit: 45,
    tags: ['vocabulary', 'synonyms']
  },
  {
    id: 'apt_012',
    category: 'Verbal Reasoning',
    subcategory: 'Antonyms',
    question: 'Choose the word opposite in meaning to METICULOUS:',
    options: ['Careful', 'Thorough', 'Careless', 'Precise'],
    correctAnswer: 2,
    explanation: 'Meticulous means extremely careful and precise. Careless is the opposite.',
    difficulty: 'easy',
    companies: ['Amazon', 'Adobe'],
    timeLimit: 45,
    tags: ['vocabulary', 'antonyms']
  },
  {
    id: 'apt_013',
    category: 'Verbal Reasoning',
    subcategory: 'Sentence Completion',
    question: 'Despite his _____ efforts, he failed to achieve his goal.',
    options: ['halfhearted', 'strenuous', 'casual', 'lazy'],
    correctAnswer: 1,
    explanation: 'Despite indicates contrast. If he failed despite his efforts, they must have been strenuous (intense/vigorous).',
    difficulty: 'medium',
    companies: ['Facebook', 'Apple'],
    timeLimit: 60,
    tags: ['grammar', 'context']
  },
  {
    id: 'apt_014',
    category: 'Verbal Reasoning',
    subcategory: 'Reading Comprehension',
    question: 'The passage suggests that renewable energy is becoming more popular because it is: (A) environmentally friendly (B) cost-effective (C) both A and B',
    options: ['Only A', 'Only B', 'Both A and B', 'Neither A nor B'],
    correctAnswer: 2,
    explanation: 'Modern renewable energy solutions are both environmentally friendly and increasingly cost-effective.',
    difficulty: 'easy',
    companies: ['Tesla', 'Shell'],
    timeLimit: 90,
    tags: ['comprehension', 'inference']
  },
  {
    id: 'apt_015',
    category: 'Verbal Reasoning',
    subcategory: 'Analogies',
    question: 'Doctor : Hospital :: Chef : ?',
    options: ['Kitchen', 'Food', 'Recipe', 'Restaurant'],
    correctAnswer: 0,
    explanation: 'A doctor works in a hospital, similarly a chef works in a kitchen.',
    difficulty: 'easy',
    companies: ['Cognizant', 'Capgemini'],
    timeLimit: 45,
    tags: ['analogies', 'relationships']
  },

  // DATA INTERPRETATION
  {
    id: 'apt_016',
    category: 'Data Interpretation',
    subcategory: 'Tables',
    question: 'A company\'s sales for 2023: Q1=100, Q2=150, Q3=120, Q4=180. What is the average quarterly sales?',
    options: ['125', '137.5', '140', '145'],
    correctAnswer: 1,
    explanation: 'Average = (100+150+120+180)/4 = 550/4 = 137.5',
    difficulty: 'easy',
    companies: ['Deloitte', 'PwC'],
    timeLimit: 90,
    tags: ['tables', 'average']
  },
  {
    id: 'apt_017',
    category: 'Data Interpretation',
    subcategory: 'Pie Charts',
    question: 'If a company\'s expenses are: Salaries 40%, Rent 20%, Marketing 15%, Others 25%. If total expenses are Rs. 100,000, what is spent on Marketing?',
    options: ['Rs. 10,000', 'Rs. 15,000', 'Rs. 20,000', 'Rs. 25,000'],
    correctAnswer: 1,
    explanation: 'Marketing = 15% of 100,000 = 15,000',
    difficulty: 'easy',
    companies: ['McKinsey', 'BCG'],
    timeLimit: 60,
    tags: ['percentage', 'pie-chart']
  },
  {
    id: 'apt_018',
    category: 'Data Interpretation',
    subcategory: 'Bar Graphs',
    question: 'Sales in 2021, 2022, 2023 were 50k, 75k, and 100k respectively. What is the percentage increase from 2021 to 2023?',
    options: ['50%', '75%', '100%', '125%'],
    correctAnswer: 2,
    explanation: 'Percentage increase = ((100-50)/50) × 100 = 100%',
    difficulty: 'medium',
    companies: ['Bain', 'Accenture'],
    timeLimit: 90,
    tags: ['graphs', 'percentage-change']
  },
  {
    id: 'apt_019',
    category: 'Data Interpretation',
    subcategory: 'Line Graphs',
    question: 'A line graph shows temperature: Mon=25°C, Tue=27°C, Wed=23°C, Thu=28°C. What is the average temperature?',
    options: ['24.5°C', '25°C', '25.75°C', '26°C'],
    correctAnswer: 2,
    explanation: 'Average = (25+27+23+28)/4 = 103/4 = 25.75°C',
    difficulty: 'easy',
    companies: ['Weather.com', 'Climate Corp'],
    timeLimit: 75,
    tags: ['line-graph', 'average']
  },
  {
    id: 'apt_020',
    category: 'Data Interpretation',
    subcategory: 'Mixed Charts',
    question: 'Given a bar chart of revenue (100k, 120k, 140k) and a line showing costs (80k, 90k, 100k) for 3 years, what is the profit in year 3?',
    options: ['30k', '40k', '50k', '60k'],
    correctAnswer: 1,
    explanation: 'Profit in year 3 = Revenue - Cost = 140k - 100k = 40k',
    difficulty: 'medium',
    companies: ['Amazon', 'Walmart'],
    timeLimit: 120,
    tags: ['mixed-charts', 'profit']
  },

  // PUZZLES
  {
    id: 'apt_021',
    category: 'Puzzles',
    subcategory: 'Logic Puzzles',
    question: 'You have 8 balls, one is heavier. Using a balance scale only twice, how do you find the heavier ball?',
    options: ['Divide into 3-3-2, weigh 3-3 first', 'Divide into 4-4, then subdivide', 'Weigh all combinations', 'Not possible in 2 weighings'],
    correctAnswer: 0,
    explanation: 'Divide into 3-3-2. Weigh 3-3: if balanced, heavier is in 2 (weigh those). If unbalanced, take heavier group of 3, weigh any 2 from it.',
    difficulty: 'hard',
    companies: ['Google', 'Microsoft', 'Apple'],
    timeLimit: 240,
    tags: ['puzzle', 'optimization']
  },
  {
    id: 'apt_022',
    category: 'Puzzles',
    subcategory: 'Math Puzzles',
    question: 'Three friends shared a hotel room for $30 ($10 each). Later, the manager gave $5 back. Bellboy kept $2, gave $1 to each friend. Now each paid $9 (27) + bellboy has $2 = $29. Where is the missing dollar?',
    options: ['Bellboy has it', 'No missing dollar - faulty logic', 'Manager has it', 'Lost in calculation'],
    correctAnswer: 1,
    explanation: 'The $27 already includes the $2 the bellboy kept ($25 to hotel + $2 to bellboy). Adding the $2 again is incorrect. They paid $27 total, got $3 back. 27+3=30.',
    difficulty: 'hard',
    companies: ['Amazon', 'Goldman Sachs'],
    timeLimit: 180,
    tags: ['puzzle', 'logic-trap']
  },
  {
    id: 'apt_023',
    category: 'Puzzles',
    subcategory: 'River Crossing',
    question: 'A farmer needs to cross a river with a fox, chicken, and grain. Boat holds farmer + one item. If left alone: fox eats chicken, chicken eats grain. How to cross?',
    options: [
      'Take chicken first, return, take fox, bring chicken back, take grain, return for chicken',
      'Take fox first',
      'Take grain first',
      'Take chicken and fox together'
    ],
    correctAnswer: 0,
    explanation: 'Take chicken over. Return empty. Take fox over, bring chicken back. Take grain over. Return empty and get chicken.',
    difficulty: 'medium',
    companies: ['Facebook', 'Twitter'],
    timeLimit: 180,
    tags: ['puzzle', 'sequential-logic']
  },
  {
    id: 'apt_024',
    category: 'Puzzles',
    subcategory: 'Number Puzzles',
    question: 'I am thinking of a number. If you multiply it by 2, add 10, divide by 2, and subtract the original number, you get 5. What is the number?',
    options: ['Any number', '0', '5', '10'],
    correctAnswer: 0,
    explanation: 'Let x be the number: ((2x+10)/2)-x = x+5-x = 5. This works for any number.',
    difficulty: 'medium',
    companies: ['NVIDIA', 'Intel'],
    timeLimit: 120,
    tags: ['puzzle', 'algebra']
  },
  {
    id: 'apt_025',
    category: 'Puzzles',
    subcategory: 'Pattern Recognition',
    question: 'What is the missing number in the sequence: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '19', '20', '21'],
    correctAnswer: 3,
    explanation: 'This is the Fibonacci sequence where each number is the sum of the previous two: 8+13=21',
    difficulty: 'easy',
    companies: ['Apple', 'Samsung'],
    timeLimit: 60,
    tags: ['fibonacci', 'series']
  },

  // Additional questions for comprehensive coverage
  {
    id: 'apt_026',
    category: 'Logical Reasoning',
    subcategory: 'Statements and Assumptions',
    question: 'Statement: "Please check the availability before booking." Assumption: Checking availability is important before booking.',
    options: ['Assumption is implicit', 'Assumption is not implicit', 'Partially implicit', 'Cannot determine'],
    correctAnswer: 0,
    explanation: 'The statement clearly implies that checking availability is necessary/important before booking.',
    difficulty: 'easy',
    companies: ['OYO', 'MakeMyTrip'],
    timeLimit: 60,
    tags: ['assumptions', 'logic']
  },
  {
    id: 'apt_027',
    category: 'Quantitative Aptitude',
    subcategory: 'Probability',
    question: 'What is the probability of getting at least one head when flipping a coin three times?',
    options: ['1/8', '3/8', '5/8', '7/8'],
    correctAnswer: 3,
    explanation: 'P(at least one head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = 7/8',
    difficulty: 'medium',
    companies: ['Google', 'Microsoft'],
    timeLimit: 90,
    tags: ['probability', 'combinations']
  },
  {
    id: 'apt_028',
    category: 'Verbal Reasoning',
    subcategory: 'Idioms and Phrases',
    question: 'What does "Bite the bullet" mean?',
    options: [
      'To eat fast',
      'To face a difficult situation courageously',
      'To shoot accurately',
      'To make a quick decision'
    ],
    correctAnswer: 1,
    explanation: 'To bite the bullet means to face or endure a difficult or unpleasant situation with courage.',
    difficulty: 'easy',
    companies: ['British Council', 'IDP'],
    timeLimit: 45,
    tags: ['idioms', 'phrases']
  },
  {
    id: 'apt_029',
    category: 'Quantitative Aptitude',
    subcategory: 'Permutation and Combination',
    question: 'In how many ways can 5 people be seated in a row?',
    options: ['20', '60', '120', '720'],
    correctAnswer: 2,
    explanation: 'Number of arrangements = 5! = 5×4×3×2×1 = 120',
    difficulty: 'easy',
    companies: ['Amazon', 'Flipkart'],
    timeLimit: 60,
    tags: ['permutation', 'factorial']
  },
  {
    id: 'apt_030',
    category: 'Data Interpretation',
    subcategory: 'Venn Diagrams',
    question: 'In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. How many play neither?',
    options: ['5', '10', '15', '20'],
    correctAnswer: 0,
    explanation: 'Students playing at least one sport = 30+25-10 = 45. Students playing neither = 50-45 = 5',
    difficulty: 'medium',
    companies: ['TCS', 'Infosys'],
    timeLimit: 90,
    tags: ['venn-diagram', 'sets']
  }
];

// Export helper functions
export const getQuestionsByCategory = (category: string) => {
  return aptitudeQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: string) => {
  return aptitudeQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCompany = (company: string) => {
  return aptitudeQuestions.filter(q => q.companies.includes(company));
};

export const getRandomQuestions = (count: number) => {
  const shuffled = [...aptitudeQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};