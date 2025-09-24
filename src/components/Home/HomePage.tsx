import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Fuse from 'fuse.js';
import { 
  Brain, 
  Zap, 
  Target, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Camera,
  MessageSquare,
  Code,
  User,
  Lightbulb,
  Building2,
  Sparkles,
  Play,
  Rocket,
  Search
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // -------------------------
  // Data (unchanged content)
  // -------------------------
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Evaluation',
      description: 'Get detailed feedback from advanced AI models including Groq, Gemini, and OpenAI with comprehensive scoring and suggestions.',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Camera,
      title: 'Face-API.js Monitoring',
      description: 'Advanced face detection and behavioral analysis using Face-API.js for professional interview simulation.',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      icon: Zap,
      title: 'Custom Question Generator',
      description: 'Create personalized questions from job descriptions, resume content, or custom topics using AI.',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: BookOpen,
      title: 'Structured Study Plans',
      description: 'Follow curated learning paths with daily schedules for accelerated, intensive, or comprehensive preparation.',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      icon: Building2,
      title: 'Company-Specific Questions',
      description: 'Practice with questions from 50+ top companies including Google, Amazon, Microsoft, and more.',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Track your progress with detailed reports, face monitoring analytics, and performance insights.',
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
    }
  ];

  const stats = [
    { label: 'Practice Questions', value: '500+', icon: Target },
    { label: 'AI Models', value: '3', icon: Brain },
    { label: 'Companies', value: '50+', icon: Building2 },
    { label: 'Study Plans', value: '8', icon: BookOpen }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'The Face-API.js monitoring helped me practice maintaining eye contact and professional posture. Got my dream job!',
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager at Microsoft',
      content: 'Custom question generation from job descriptions was a game-changer. Perfectly tailored practice sessions.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist at Amazon',
      content: 'The AI feedback is incredibly detailed. Helped me improve my STAR method responses significantly.',
      avatar: '👩‍🔬'
    }
  ];

  // -------------------------
  // Search: state + logic
  // -------------------------
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<any>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Build a searchable index combining features + important pages
  const searchSource = useMemo(() => {
    // turn features into searchable items
    const featureItems = features.map((f) => ({
      title: f.title,
      description: f.description,
      url: '/study-plan', // most feature items can link to study plans or study-plan page for details
      keywords: [f.title]
    }));

    // other pages / anchors you want users to reach directly
    const extraItems = [
      {
        title: 'Study Plans',
        description: 'See curated study plans for many roles and tracks.',
        url: '/study-plan',
        keywords: ['study plans', 'study plan', 'plans']
      },
      {
        title: 'Full Stack Software Engineer (Accelerated)',
        description: 'Full Stack accelerated study plan.',
        url: '/study-plan#fullstack',
        keywords: ['full stack', 'fullstack', 'software engineer']
      },
      {
        title: 'Practice Sessions',
        description: 'Start practicing with mock interviews and questions.',
        url: '/dashboard',
        keywords: ['practice', 'mock interview', 'session']
      },
      {
        title: 'Profile',
        description: 'Your user profile and settings.',
        url: '/profile',
        keywords: ['profile', 'account', 'user']
      }
    ];

    return [...featureItems, ...extraItems];
  }, [features]);

  // Fuse.js instance (fuzzy search)
  const fuse = useMemo(() => {
    return new Fuse(searchSource as any, {
      keys: ['title', 'description', 'keywords'],
      threshold: 0.35,
      includeScore: true,
    });
  }, [searchSource]);

  // run search when query changes
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const matched = fuse.search(q, { limit: 8 }).map((r) => r.item);
    setResults(matched);
    setShowDropdown(true);
  }, [query, fuse]);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // navigate helper (handles hashes too)
  const navigateTo = (url: string) => {
    setShowDropdown(false);
    setQuery('');
    navigate(url);

    // if URL contains a hash, attempt to scroll to it after navigation
    const parts = url.split('#');
    if (parts.length > 1) {
      const hashId = parts[1];
      // give React Router a moment to navigate and mount
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  // on keyboard Enter: go to best match
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0) {
        navigateTo(results[0].url);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // -------------------------
  // Render (your original layout, plus search bar inside hero)
  // -------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        {/* Background Patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl shadow-lg transition-colors duration-200 animate-pulse">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              Ace Your Interviews with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> AI-Powered Coaching</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              <span className="font-semibold">Elevate your interview performance with real-time AI feedback and face monitoring.</span> The most advanced interview preparation platform that helps you land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Practicing</span>
                  </button>
                  <button
                    onClick={() => navigate('/study-plan')}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>View Study Plans</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Rocket className="h-5 w-5" />
                    <span>Get Started Free</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border-2 border-gray-200 dark:border-gray-700"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* ----------------------------
                SEARCH BAR: inserted here
               ---------------------------- */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-2xl" ref={suggestionsRef}>
                <div className="relative">
                  <Search className="absolute left-4 top-3 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    aria-label="Search"
                    placeholder="Search Study Plans, features, or courses (try: 'Study Plans', 'Full Stack')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="w-full pl-12 pr-28 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (results.length > 0) navigateTo(results[0].url);
                      else if (query.trim()) navigate('/study-plan'); // fallback
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full"
                  >
                    Search
                  </button>
                </div>

                {/* dropdown */}
                {showDropdown && (
                  <div className="absolute mt-2 w-full z-50">
                    {results.length > 0 ? (
                      <ul className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                        {results.map((r, i) => (
                          <li
                            key={i}
                            onClick={() => navigateTo(r.url)}
                            className="cursor-pointer px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-start"
                          >
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{r.title}</div>
                              {r.description && <div className="text-sm text-gray-500 dark:text-gray-400">{r.description}</div>}
                            </div>
                            <div className="text-xs text-gray-400 ml-4">{r.url.replace('/','')}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm text-gray-500 dark:text-gray-400">
                        No results for “{query}”
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* ----------------------------
                end SEARCH BAR
               ---------------------------- */}

            {/* Unique Tagline */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 max-w-3xl mx-auto mb-12">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-400 font-bold">"Your secret weapon for interview success"</span> - Prepare smarter, not harder.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
                    <div className="flex justify-center mb-2">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Cutting-Edge Features</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
              From AI-powered feedback to advanced face monitoring, we provide comprehensive tools for interview success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 group">
                  <div className={`p-3 rounded-xl ${feature.color} w-fit mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ... rest of your original page (How It Works, Testimonial, CTA, Footer) unchanged ... */}

      {/* How It Works */}
      <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">Simple steps to interview success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-200 relative z-10">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100 dark:bg-blue-900/30 -z-10"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Choose Your Path</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Select from curated questions, study plans, or generate custom questions using AI.
              </p>
            </div>

            <div className="text-center relative">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-200 relative z-10">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-purple-100 dark:bg-purple-900/30 -z-10"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Practice with AI</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Answer questions while Face-API.js monitors your behavior and AI evaluates your responses.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-200">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Get Detailed Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Receive comprehensive feedback, behavioral analysis, and actionable improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials, CTA, Footer (unchanged) */}
      {/* ... include the rest of your original JSX here exactly as you had it ... */}

      {/* Testimonials */}
      <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... */}
          {/* (I left the rest intact above - keep your original content below as it was) */}
        </div>
      </div>

      {/* CTA Section */}
      {/* Footer */}
      {/* ... */}
    </div>
  );
};
