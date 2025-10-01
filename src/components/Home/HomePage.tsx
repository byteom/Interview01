import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
    Rocket
} from 'lucide-react';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

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

    // --- UPDATED: Added more testimonials for scrolling effect ---
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
        },
        {
            name: 'David Lee',
            role: 'UX Designer at Adobe',
            content: 'A fantastic platform. The structured study plans kept me on track and fully prepared for my interviews.',
            avatar: '🎨'
        },
        {
            name: 'Jessica Williams',
            role: 'DevOps Engineer at Netflix',
            content: 'The company-specific questions were spot on. I felt so confident walking into my technical rounds.',
            avatar: '🔧'
        },
        {
            name: 'Chris Green',
            role: 'Marketing Lead at HubSpot',
            content: 'Even for a non-technical role, the behavioral analysis was key. It helped me refine my communication style.',
            avatar: '📈'
        }
    ];
    // Duplicate testimonials for a seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <div className="min-h-screen bg-[#AFDDE5] dark:bg-[#003135] transition-colors duration-200">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[#AFDDE5] dark:bg-[#003135] transition-colors duration-200">
                {/* Background Patterns */}
                <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0FA4AF] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 -right-24 w-96 h-96 bg-[#024950] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#964734] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-[#0FA4AF] dark:bg-[#024950] rounded-2xl shadow-lg transition-colors duration-200 animate-pulse">
                                <Brain className="h-12 w-12 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-[#003135] dark:text-[#AFDDE5] mb-6 transition-colors duration-200">
                            Ace Your Interviews with
                            <span className="text-[#0FA4AF]"> AI-Powered Coaching</span>
                        </h1>

                        <p className="text-xl text-[#024950] dark:text-[#AFDDE5]/90 mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
                            <span className="font-semibold">Elevate your interview performance with AI-powered feedback.</span> The most advanced interview preparation platform that helps you land your dream job.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="bg-[#0FA4AF] dark:bg-[#024950] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#024950] dark:hover:bg-[#0FA4AF] transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <Play className="h-5 w-5" />
                                        <span>Start Practicing</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/study-plan')}
                                        className="bg-white dark:bg-[#003135] text-[#003135] dark:text-[#AFDDE5] px-8 py-4 rounded-xl font-semibold hover:bg-[#AFDDE5]/20 dark:hover:bg-[#024950] transition-all duration-200 border-2 border-[#0FA4AF] dark:border-[#024950] flex items-center justify-center space-x-2"
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
                            {/* Connecting line */}
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
                            {/* Connecting line */}
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

            {/* Question Categories */}
            <div className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Target className="h-4 w-4" />
                            <span>Comprehensive Coverage</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Practice All Question Types</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">Comprehensive coverage for every interview scenario</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl w-fit mb-6 transition-colors duration-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Behavioral Questions</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                                Master the STAR method with questions about your experience, leadership, and problem-solving skills.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">STAR Method</span>
                                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Leadership</span>
                                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Teamwork</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl w-fit mb-6 transition-colors duration-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Technical Questions</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                                Frontend, backend, system design, and coding challenges from top tech companies.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">System Design</span>
                                <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Algorithms</span>
                                <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Architecture</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl w-fit mb-6 transition-colors duration-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <Lightbulb className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Situational Questions</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
                                Handle hypothetical scenarios, crisis management, and decision-making challenges.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Crisis Management</span>
                                <span className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Decision Making</span>
                                <span className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm transition-colors duration-200">Problem Solving</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- UPDATED: Testimonials Section with Infinite Scroll --- */}
            <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Star className="h-4 w-4" />
                            <span>Success Stories</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Success Stories</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">Join thousands who landed their dream jobs</p>
                    </div>

                    <div
                        className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                    >
                        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
                            {duplicatedTestimonials.map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-full max-w-sm mx-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-full relative transition-colors duration-200">
                                        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                                            <div className="text-6xl opacity-10">"</div>
                                        </div>
                                        <div className="flex items-center mb-6">
                                            <div className="text-3xl mr-4">{testimonial.avatar}</div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">{testimonial.name}</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 italic transition-colors duration-200">"{testimonial.content}"</p>
                                        <div className="flex text-yellow-400 mt-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 transition-colors duration-200">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 transition-colors duration-200">
                        Join thousands of successful candidates who used our AI-powered platform to land their dream jobs.
                    </p>

                    {user ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                            >
                                <Target className="h-5 w-5" />
                                <span>Start Practicing Now</span>
                            </button>
                            <button
                                onClick={() => navigate('/ai-tools/create-question')}
                                className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200 border-2 border-white flex items-center justify-center space-x-2"
                            >
                                <Zap className="h-5 w-5" />
                                <span>Create Custom Questions</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/auth')}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
                        >
                            <span>Get Started Free</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                                    <Brain className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">InterviewAce</span>
                            </div>
                            <p className="text-gray-400 dark:text-gray-500 mb-4 max-w-md transition-colors duration-200">
                                Your secret weapon for interview success. The most advanced AI-powered interview preparation platform with comprehensive feedback and behavioral analysis.
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-gray-800 dark:bg-gray-900 p-2 rounded-lg transition-colors duration-200">
                                    <Brain className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="bg-gray-800 dark:bg-gray-900 p-2 rounded-lg transition-colors duration-200">
                                    <Camera className="h-5 w-5 text-purple-400" />
                                </div>
                                <div className="bg-gray-800 dark:bg-gray-900 p-2 rounded-lg transition-colors duration-200">
                                    <Zap className="h-5 w-5 text-yellow-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-500 transition-colors duration-200">
                                <li><a href="#" className="footer-link">AI Evaluation</a></li>
                                <li><a href="#" className="footer-link">Face Monitoring</a></li>
                                <li><a href="#" className="footer-link">Custom Questions</a></li>
                                <li><a href="#" className="footer-link">Study Plans</a></li>
                                <li><a href="#" className="footer-link">Progress Tracking</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-500 transition-colors duration-200">
                                <li><a href="#" className="footer-link">About Us</a></li>
                                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                                <li><a href="#" className="footer-link">Terms of Service</a></li>
                                <li><a href="#" className="footer-link">Contact</a></li>
                                <li><a href="#" className="footer-link">Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500 transition-colors duration-200">
                        <p>&copy; 2025 InterviewAce. All rights reserved. Powered by AI for interview success.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
