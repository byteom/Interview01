// src/pages/AptitudePage.tsx

import React, { useState } from 'react';
import { Brain, BookOpen, Trophy, Target, TrendingUp, BarChart } from 'lucide-react';
import AptitudePractice from '../components/Practice/AptitudePractice';
import AptitudeStudyPlan from '../components/StudyPlan/AptitudeStudyPlan';

type ViewMode = 'overview' | 'practice' | 'studyPlan';

const AptitudePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');

  if (currentView === 'practice') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AptitudePractice />
      </div>
    );
  }

  if (currentView === 'studyPlan') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <button
              onClick={() => setCurrentView('overview')}
              className="text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              ← Back to Overview
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Aptitude Study Plans</h1>
            <p className="text-gray-600">
              Choose a structured learning path based on your preparation time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AptitudeStudyPlan type="accelerated" />
            <AptitudeStudyPlan type="intensive" />
            <AptitudeStudyPlan type="comprehensive" />
          </div>
        </div>
      </div>
    );
  }

  // Overview Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-xl">
              <Brain className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Aptitude Preparation</h1>
              <p className="text-xl text-blue-100">
                Master quantitative, logical, and verbal reasoning skills
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-blue-100">Questions</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">5</div>
              <div className="text-blue-100">Categories</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">3</div>
              <div className="text-blue-100">Study Plans</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-100">Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setCurrentView('practice')}
            className="group p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Start Practice</h3>
                <p className="text-gray-600">Practice questions by category or take random tests</p>
              </div>
            </div>
            <div className="flex items-center text-blue-600 font-medium">
              Begin Practice
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('studyPlan')}
            className="group p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Study Plans</h3>
                <p className="text-gray-600">Structured learning paths for systematic preparation</p>
              </div>
            </div>
            <div className="flex items-center text-purple-600 font-medium">
              View Plans
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Master</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Logical Reasoning</h3>
              <p className="text-gray-600 text-sm">
                Master patterns, series, coding-decoding, blood relations, and syllogisms
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quantitative Aptitude</h3>
              <p className="text-gray-600 text-sm">
                Perfect your math skills with percentage, profit/loss, time & work, and more
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verbal Reasoning</h3>
              <p className="text-gray-600 text-sm">
                Enhance vocabulary, comprehension, analogies, and sentence completion
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-yellow-100 rounded-lg w-fit mb-4">
                <BarChart className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data Interpretation</h3>
              <p className="text-gray-600 text-sm">
                Analyze tables, graphs, pie charts, and complex datasets efficiently
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-red-100 rounded-lg w-fit mb-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Puzzles & Logic</h3>
              <p className="text-gray-600 text-sm">
                Solve challenging puzzles, brain teasers, and complex logic problems
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 bg-indigo-100 rounded-lg w-fit mb-4">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Company-Specific</h3>
              <p className="text-gray-600 text-sm">
                Practice questions asked by top companies like Google, Amazon, Microsoft
              </p>
            </div>
          </div>
        </div>

        {/* Study Plan Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Study Plans</h2>
            <button
              onClick={() => setCurrentView('studyPlan')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Plans →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AptitudeStudyPlan type="accelerated" />
            <AptitudeStudyPlan type="intensive" />
            <AptitudeStudyPlan type="comprehensive" />
          </div>
        </div>

        {/* Practice Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preparation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Practice Regularly</h3>
                <p className="text-gray-600 text-sm">
                  Dedicate at least 1-2 hours daily for consistent improvement
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Time Management</h3>
                <p className="text-gray-600 text-sm">
                  Practice with timers to improve speed and accuracy under pressure
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Learn from Mistakes</h3>
                <p className="text-gray-600 text-sm">
                  Review explanations thoroughly to understand concepts better
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Take Mock Tests</h3>
                <p className="text-gray-600 text-sm">
                  Regular mock tests help identify weak areas and track progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudePage;