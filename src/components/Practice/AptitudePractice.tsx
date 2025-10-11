// src/components/Practice/AptitudePractice.tsx

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Calculator, 
  MessageSquare, 
  BarChart3, 
  Puzzle,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Home
} from 'lucide-react';
import { 
  aptitudeQuestions, 
  aptitudeCategories, 
  AptitudeQuestion,
  getQuestionsByCategory,
  getRandomQuestions 
} from 'src/data/questions/aptitudeQuestions.ts';

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  score: number;
  isComplete: boolean;
  timeElapsed: number;
  startTime: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Logical Reasoning': <Brain className="w-5 h-5" />,
  'Quantitative Aptitude': <Calculator className="w-5 h-5" />,
  'Verbal Reasoning': <MessageSquare className="w-5 h-5" />,
  'Data Interpretation': <BarChart3 className="w-5 h-5" />,
  'Puzzles': <Puzzle className="w-5 h-5" />
};

const AptitudePractice: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: [],
    score: 0,
    isComplete: false,
    timeElapsed: 0,
    startTime: Date.now()
  });
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer effect
  useEffect(() => {
    if (questions.length > 0 && !quizState.isComplete) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - prev.startTime) / 1000)
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [questions, quizState.isComplete]);

  const handleCategorySelect = (category: string) => {
    const categoryQuestions = getQuestionsByCategory(category);
    setSelectedCategory(category);
    setQuestions(categoryQuestions);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: new Array(categoryQuestions.length).fill(null),
      score: 0,
      isComplete: false,
      timeElapsed: 0,
      startTime: Date.now()
    });
    setShowExplanation(false);
  };

  const handleRandomPractice = () => {
    const randomQs = getRandomQuestions(20);
    const total = randomQs.length;
    setSelectedCategory('Mixed Practice');
    setQuestions(randomQs);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: new Array(20).fill(null),
      score: 0,
      isComplete: false,
      timeElapsed: 0,
      startTime: Date.now()
    });
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.isComplete) return;

    const newAnswers = [...quizState.selectedAnswers];
    newAnswers[quizState.currentQuestionIndex] = answerIndex;
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newAnswers
    }));
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (quizState.selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    setQuizState(prev => ({
      ...prev,
      score: correct,
      isComplete: true
    }));
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: [],
      score: 0,
      isComplete: false,
      timeElapsed: 0,
      startTime: Date.now()
    });
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Category Selection Screen
  if (!selectedCategory) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aptitude Practice</h1>
          <p className="text-gray-600">Select a category to start practicing or try random questions</p>
        </div>

        {/* Random Practice Card */}
        <div className="mb-8">
          <button
            onClick={handleRandomPractice}
            className="w-full p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">Random Practice</h3>
                  <p className="text-blue-100">20 mixed questions from all categories</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aptitudeCategories.map((category) => {
            const categoryQs = getQuestionsByCategory(category);
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-500 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                    {categoryIcons[category]}
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {categoryQs.length} questions
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category}</h3>
                <p className="text-sm text-gray-600">
                  Practice {category.toLowerCase()} questions with detailed explanations
                </p>
              </button>
            );
          })}
        </div>

        {/* Stats Card */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-4">
            <Award className="w-10 h-10 text-green-600" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Total Questions Available</h3>
              <p className="text-gray-600">{aptitudeQuestions.length}+ aptitude questions across all categories</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];

  // Results Screen
  if (quizState.isComplete) {
    const percentage = Math.round((quizState.score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Great Job!' : 'Keep Practicing!'}
            </h2>
            <p className="text-gray-600">You've completed the {selectedCategory} practice</p>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-600 mt-1">Score</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{quizState.score}/{questions.length}</div>
              <div className="text-sm text-gray-600 mt-1">Correct Answers</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">{formatTime(quizState.timeElapsed)}</div>
              <div className="text-sm text-gray-600 mt-1">Time Taken</div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const isCorrect = quizState.selectedAnswers[idx] === q.correctAnswer;
                return (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-700">Question {idx + 1} - {q.subcategory}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Categories
            </button>
            <button
              onClick={() => {
                setQuizState({
                  currentQuestionIndex: 0,
                  selectedAnswers: new Array(questions.length).fill(null),
                  score: 0,
                  isComplete: false,
                  timeElapsed: 0,
                  startTime: Date.now()
                });
                setShowExplanation(false);
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retry Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedCategory}</h2>
              <p className="text-sm text-gray-600">Question {quizState.currentQuestionIndex + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{formatTime(quizState.timeElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((quizState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {currentQuestion.subcategory}
          </span>
          <div className="flex gap-2">
            <span className={`px-3 py-1 text-sm rounded-full ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentQuestion.difficulty}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {currentQuestion.timeLimit}s
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = quizState.selectedAnswers[quizState.currentQuestionIndex] === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const showAnswer = showExplanation;

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  showAnswer
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isSelected
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        showAnswer
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                          : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                  {showAnswer && isCorrect && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {showAnswer && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Show Explanation Button */}
        {quizState.selectedAnswers[quizState.currentQuestionIndex] !== null && !showExplanation && (
          <button
            onClick={() => setShowExplanation(true)}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium mb-4"
          >
            Show Explanation
          </button>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                {currentQuestion.companies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-xs text-blue-700 font-medium mb-2">Asked by:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.companies.map((company) => (
                        <span key={company} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={quizState.currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuizState(prev => ({ ...prev, currentQuestionIndex: idx }));
                  setShowExplanation(false);
                }}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  idx === quizState.currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : quizState.selectedAnswers[idx] !== null
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {quizState.currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              Submit
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Question Status</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">
              Answered ({quizState.selectedAnswers.filter(a => a !== null).length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <span className="text-gray-600">
              Not Answered ({quizState.selectedAnswers.filter(a => a === null).length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudePractice;