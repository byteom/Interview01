import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { NotificationDropdown } from './NotificationDropdown';
import { NotificationService } from '../../services/notificationService';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Menu, 
  X,
  Brain,
  BookOpen,
  Zap,
  ChevronDown,
  MessageSquare,
  Bot,
  Briefcase,
  FileText,
  Upload,
  Home,
  BarChart3,
  Clock,
  Search,
  Bell,
  CheckCircle,
  Calculator
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAIToolsMenu, setShowAIToolsMenu] = useState(false);
  const [showJobToolsMenu, setShowJobToolsMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotificationCount();
    }
  }, [user]);

  const fetchNotificationCount = async () => {
    if (!user) return;
    
    try {
      const { unreadCount } = await NotificationService.getUserNotifications(user.id);
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' 
        : 'bg-white dark:bg-gray-900'
      } border-b border-gray-200 dark:border-gray-700 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg transition-all duration-300 group-hover:scale-110">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-colors duration-200">InterviewAce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to=""
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/https://certifyo.tech/') && !user
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Learning App</span>
            </Link>
            
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Practice</span>
                </Link>
                
                <Link
                  to="/study-plan"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/study-plan')
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Study Plan</span>
                </Link>

                {/*Added Aptitude Link */}
                <Link
                  to="/aptitude"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/aptitude')
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  <span>Aptitude</span>
                </Link>
                
                {/* AI Tools Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowAIToolsMenu(!showAIToolsMenu);
                      setShowJobToolsMenu(false);
                      setShowNotifications(false);
                    }}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/ai-tools')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Zap className="h-4 w-4" />
                    <span>AI Tools</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showAIToolsMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showAIToolsMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowAIToolsMenu(false)}
                      />
                      <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-20 border border-gray-200 dark:border-gray-700 transition-colors duration-200 overflow-hidden">
                        <Link
                          to="/ai-tools/create-question"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/ai-tools/create-question') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowAIToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Create Questions</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Generate custom questions</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="/ai-tools/interview-gpt"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/ai-tools/interview-gpt') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowAIToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Interview GPT</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">AI interview assistant</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="/ai-tools/ask-away"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/ai-tools/ask-away') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowAIToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Ask Away</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Interactive Q&A practice</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                {/* Job Search Tools Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowJobToolsMenu(!showJobToolsMenu);
                      setShowAIToolsMenu(false);
                      setShowNotifications(false);
                    }}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/job-tools')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Job Tools</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showJobToolsMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showJobToolsMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowJobToolsMenu(false)}
                      />
                      <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-20 border border-gray-200 dark:border-gray-700 transition-colors duration-200 overflow-hidden">
                        <Link
                          to="/job-tools/cover-letter"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/job-tools/cover-letter') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowJobToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Cover Letter</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">AI-powered cover letters</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="/job-tools/resume-review"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/job-tools/resume-review') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowJobToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                              <Upload className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Resume Review</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Upload & get AI feedback</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="/job-tools/resume-chat"
                          className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive('/job-tools/resume-chat') ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setShowJobToolsMenu(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Resume Chat</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Chat with your resume</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <Link
                  to="/history"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/history')
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </Link>
              </>
            )}
          </nav>

          {/* Theme Toggle and User Menu */}
          <div className="flex items-center space-x-2">
            {user && (
              <div className="hidden md:flex items-center mr-2">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button 
                    className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full transition-colors"
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowAIToolsMenu(false);
                      setShowJobToolsMenu(false);
                      setShowUserMenu(false);
                    }}
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <NotificationDropdown onClose={() => setShowNotifications(false)} />
                  )}
                </div>
              </div>
            )}
            
            <ThemeToggle />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full flex items-center justify-center transition-colors duration-200">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {profile?.full_name || 'User'}
                  </span>
                  <ChevronDown className="h-3 w-3 hidden sm:block" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-20 border border-gray-200 dark:border-gray-700 transition-colors duration-200 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      
                      {profile?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                      
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200">
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive('/') && !user
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/dashboard')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Practice</span>
                  </Link>
                  
                  <Link
                    to="/study-plan"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/study-plan')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Study Plan</span>
                  </Link>

                  {/* ⭐ APTITUDE LINK ADDED HERE FOR MOBILE */}
                  <Link
                    to="/aptitude"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/aptitude')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Calculator className="h-5 w-5" />
                    <span>Aptitude</span>
                  </Link>
                  
                  <div className="px-3 py-2">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-2">AI Tools</div>
                    <div className="space-y-1 pl-2">
                      <Link
                        to="/ai-tools/create-question"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/ai-tools/create-question')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <Zap className="h-4 w-4" />
                        <span>Create Questions</span>
                      </Link>
                      
                      <Link
                        to="/ai-tools/interview-gpt"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/ai-tools/interview-gpt')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <Bot className="h-4 w-4" />
                        <span>Interview GPT</span>
                      </Link>
                      
                      <Link
                        to="/ai-tools/ask-away"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/ai-tools/ask-away')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Ask Away</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="px-3 py-2">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-2">Job Tools</div>
                    <div className="space-y-1 pl-2">
                      <Link
                        to="/job-tools/cover-letter"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/job-tools/cover-letter')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Cover Letter</span>
                      </Link>
                      
                      <Link
                        to="/job-tools/resume-review"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/job-tools/resume-review')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <Upload className="h-4 w-4" />
                        <span>Resume Review</span>
                      </Link>
                      
                      <Link
                        to="/job-tools/resume-chat"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive('/job-tools/resume-chat')
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Resume Chat</span>
                      </Link>
                    </div>
                  </div>
                  
                  <Link
                    to="/history"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/history')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Clock className="h-5 w-5" />
                    <span>History</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/settings')
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive('/admin')
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
              
              {!user && (
                <Link
                  to="/auth"
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};