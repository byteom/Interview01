// src/components/StudyPlan/AptitudeStudyPlan.tsx

import React from 'react';
import { Clock, Star, Target, TrendingUp, Brain, Calculator } from 'lucide-react';

interface StudyPlanProps {
  type: 'accelerated' | 'intensive' | 'comprehensive';
}

interface DaySchedule {
  day: number;
  topics: string[];
  practice: number;
  focus: string;
}

interface StudyPlanData {
  title: string;
  duration: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  schedule: DaySchedule[];
  totalQuestions: number;
  tags: string[];
}

const aptitudeStudyPlans: Record<string, StudyPlanData> = {
  accelerated: {
    title: 'Aptitude Accelerated',
    duration: '1 Week',
    description: 'Fast-track aptitude preparation covering essential topics with intensive practice.',
    difficulty: 'beginner',
    schedule: [
      {
        day: 1,
        topics: ['Logical Reasoning Basics', 'Number Series', 'Coding-Decoding'],
        practice: 20,
        focus: 'Pattern recognition and basic logic'
      },
      {
        day: 2,
        topics: ['Quantitative Aptitude', 'Percentage', 'Profit & Loss', 'Simple Interest'],
        practice: 25,
        focus: 'Mathematical calculations and formulas'
      },
      {
        day: 3,
        topics: ['Verbal Reasoning', 'Synonyms', 'Antonyms', 'Sentence Completion'],
        practice: 20,
        focus: 'Vocabulary and language skills'
      },
      {
        day: 4,
        topics: ['Data Interpretation', 'Tables', 'Bar Graphs', 'Pie Charts'],
        practice: 25,
        focus: 'Chart reading and analysis'
      },
      {
        day: 5,
        topics: ['Time & Work', 'Speed & Distance', 'Ratio & Proportion'],
        practice: 30,
        focus: 'Application problems'
      },
      {
        day: 6,
        topics: ['Puzzles', 'Brain Teasers', 'Logic Problems'],
        practice: 25,
        focus: 'Critical thinking and problem-solving'
      },
      {
        day: 7,
        topics: ['Mock Test', 'All Topics Review'],
        practice: 50,
        focus: 'Full-length timed practice test'
      }
    ],
    totalQuestions: 195,
    tags: ['accelerated', 'beginner', '1-week']
  },
  intensive: {
    title: 'Aptitude Intensive',
    duration: '2 Weeks',
    description: 'Comprehensive aptitude preparation with detailed topic coverage and extensive practice.',
    difficulty: 'intermediate',
    schedule: [
      {
        day: 1,
        topics: ['Number Series', 'Pattern Recognition'],
        practice: 15,
        focus: 'Series completion and patterns'
      },
      {
        day: 2,
        topics: ['Coding-Decoding', 'Blood Relations'],
        practice: 20,
        focus: 'Logical reasoning fundamentals'
      },
      {
        day: 3,
        topics: ['Direction Sense', 'Syllogism'],
        practice: 20,
        focus: 'Spatial and deductive reasoning'
      },
      {
        day: 4,
        topics: ['Percentage', 'Profit & Loss'],
        practice: 25,
        focus: 'Commercial mathematics'
      },
      {
        day: 5,
        topics: ['Simple Interest', 'Compound Interest'],
        practice: 20,
        focus: 'Banking and finance calculations'
      },
      {
        day: 6,
        topics: ['Time & Work', 'Pipes & Cisterns'],
        practice: 25,
        focus: 'Efficiency and rate problems'
      },
      {
        day: 7,
        topics: ['Speed, Time & Distance', 'Trains'],
        practice: 25,
        focus: 'Motion and relative speed'
      },
      {
        day: 8,
        topics: ['Ratio & Proportion', 'Mixtures & Allegations'],
        practice: 20,
        focus: 'Proportional relationships'
      },
      {
        day: 9,
        topics: ['Synonyms', 'Antonyms', 'Analogies'],
        practice: 25,
        focus: 'Vocabulary building'
      },
      {
        day: 10,
        topics: ['Sentence Completion', 'Reading Comprehension'],
        practice: 20,
        focus: 'Language comprehension'
      },
      {
        day: 11,
        topics: ['Data Interpretation - Tables & Graphs'],
        practice: 30,
        focus: 'Chart analysis and calculations'
      },
      {
        day: 12,
        topics: ['Data Interpretation - Pie Charts & Mixed'],
        practice: 30,
        focus: 'Complex data analysis'
      },
      {
        day: 13,
        topics: ['Puzzles', 'Logic Problems', 'Brain Teasers'],
        practice: 25,
        focus: 'Advanced problem-solving'
      },
      {
        day: 14,
        topics: ['Full Mock Test', 'Comprehensive Review'],
        practice: 60,
        focus: 'Complete aptitude assessment'
      }
    ],
    totalQuestions: 360,
    tags: ['intensive', 'intermediate', '2-weeks']
  },
  comprehensive: {
    title: 'Aptitude Comprehensive',
    duration: '4 Weeks',
    description: 'Complete aptitude mastery program with in-depth coverage, practice, and mock tests.',
    difficulty: 'advanced',
    schedule: [
      { day: 1, topics: ['Number Series', 'Letter Series'], practice: 15, focus: 'Series patterns' },
      { day: 2, topics: ['Coding-Decoding', 'Letter & Number Coding'], practice: 20, focus: 'Code patterns' },
      { day: 3, topics: ['Blood Relations', 'Seating Arrangements'], practice: 20, focus: 'Relationships' },
      { day: 4, topics: ['Direction Sense', 'Distance & Direction'], practice: 15, focus: 'Spatial reasoning' },
      { day: 5, topics: ['Syllogism', 'Statements & Conclusions'], practice: 25, focus: 'Deductive logic' },
      { day: 6, topics: ['Data Sufficiency', 'Statement Analysis'], practice: 20, focus: 'Information adequacy' },
      { day: 7, topics: ['Mock Test - Logical Reasoning'], practice: 40, focus: 'Week 1 assessment' },
      { day: 8, topics: ['Percentage', 'Percentage Applications'], practice: 20, focus: 'Percentage calculations' },
      { day: 9, topics: ['Profit & Loss', 'Discount'], practice: 25, focus: 'Commercial math' },
      { day: 10, topics: ['Simple Interest', 'Compound Interest'], practice: 25, focus: 'Interest calculations' },
      { day: 11, topics: ['Time & Work', 'Work & Wages'], practice: 25, focus: 'Efficiency problems' },
      { day: 12, topics: ['Pipes & Cisterns', 'Work Rate Problems'], practice: 20, focus: 'Rate of work' },
      { day: 13, topics: ['Speed, Time & Distance', 'Relative Speed'], practice: 25, focus: 'Motion problems' },
      { day: 14, topics: ['Mock Test - Quant Part 1'], practice: 50, focus: 'Week 2 assessment' },
      { day: 15, topics: ['Ratio & Proportion', 'Partnership'], practice: 20, focus: 'Proportions' },
      { day: 16, topics: ['Mixtures & Allegations', 'Alligation Method'], practice: 20, focus: 'Mixture problems' },
      { day: 17, topics: ['Probability', 'Basic Probability'], practice: 25, focus: 'Probability concepts' },
      { day: 18, topics: ['Permutation & Combination', 'Counting Principles'], practice: 25, focus: 'Arrangements' },
      { day: 19, topics: ['Synonyms', 'Antonyms', 'Word Meanings'], practice: 20, focus: 'Vocabulary' },
      { day: 20, topics: ['Analogies', 'Classification', 'Odd One Out'], practice: 20, focus: 'Word relationships' },
      { day: 21, topics: ['Mock Test - Mixed Topics'], practice: 50, focus: 'Week 3 assessment' },
      { day: 22, topics: ['Sentence Completion', 'Para Jumbles'], practice: 20, focus: 'Sentence structure' },
      { day: 23, topics: ['Reading Comprehension', 'Passage Analysis'], practice: 25, focus: 'Comprehension' },
      { day: 24, topics: ['Tables', 'Bar Graphs', 'Line Graphs'], practice: 30, focus: 'Basic DI' },
      { day: 25, topics: ['Pie Charts', 'Mixed Charts'], practice: 30, focus: 'Advanced DI' },
      { day: 26, topics: ['Venn Diagrams', 'Set Theory'], practice: 20, focus: 'Sets and logic' },
      { day: 27, topics: ['Puzzles', 'Logic Puzzles', 'Math Puzzles'], practice: 30, focus: 'Problem-solving' },
      { day: 28, topics: ['Full Mock Test 1'], practice: 75, focus: 'Complete assessment' },
      { day: 29, topics: ['Review & Weak Areas'], practice: 40, focus: 'Gap analysis' },
      { day: 30, topics: ['Full Mock Test 2'], practice: 75, focus: 'Final assessment' }
    ],
    totalQuestions: 850,
    tags: ['comprehensive', 'advanced', '4-weeks']
  }
};

const AptitudeStudyPlan: React.FC<StudyPlanProps> = ({ type }) => {
  const plan = aptitudeStudyPlans[type];
    
  if (!plan) {
    return <div>Invalid plan type</div>;
  }

  const difficultyColor: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">Popular</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{plan.duration}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
          {type}
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyColor[plan.difficulty]}`}>
          {plan.difficulty}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Topics Covered:
        </h4>
        <div className="flex flex-wrap gap-2">
          {plan.schedule.slice(0, 4).map((day, idx) => (
            <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {day.topics[0]}
            </span>
          ))}
          {plan.schedule.length > 4 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {plan.schedule.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Key Features:
        </h4>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-sm text-gray-600">
            <Calculator className="w-3 h-3" />
            Daily practice sessions
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-3 h-3" />
            Progressive difficulty
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-3 h-3" />
            Timed mock tests
          </li>
        </ul>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            {plan.totalQuestions} practice questions
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Start Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeStudyPlan;