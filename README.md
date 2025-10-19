# InterviewAce 🚀

**Your AI-Powered Interview Preparation Platform**

A comprehensive interview preparation platform that combines advanced AI evaluation, real-time face monitoring, and structured learning paths to help you ace your technical and behavioral interviews.

![InterviewAce Platform](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.38.4-green?logo=supabase)

## ✨ Features

### 🧠 AI-Powered Evaluation
- **Multi-Model AI Support**: Integration with Groq, Gemini, and OpenAI for comprehensive feedback
- **Detailed Scoring**: Get scores on communication, technical accuracy, and problem-solving approach
- **Personalized Feedback**: Receive specific suggestions for improvement based on your responses
- **Real-time Analysis**: Instant evaluation with detailed breakdowns


### 🎯 Custom Question Generator
- **Job Description Analysis**: Generate questions from specific job postings
- **Resume-Based Questions**: Create personalized questions from your resume content
- **Topic-Specific Generation**: Generate questions for any technical domain
- **Difficulty Customization**: Adjust question complexity based on your level

### 📚 Structured Study Plans
- **8 Comprehensive Plans**: Covering Frontend, Backend, Full Stack, DSA, Cybersecurity, DevOps, Cloud Computing, and Machine Learning
- **Three Learning Paths**: Accelerated (1 week), Intensive (2 weeks), and Comprehensive (4 weeks)
- **Daily Schedules**: Structured daily practice sessions with specific goals
- **Progress Tracking**: Monitor your advancement through each study plan

### 🏢 Company-Specific Questions
- **50+ Top Companies**: Questions from Google, Amazon, Microsoft, Apple, Meta, Netflix, and more
- **Smart Tagging**: Automatic company assignment based on question content
- **Role-Specific Practice**: Questions tailored for different engineering roles
- **Industry Focus**: Specialized questions for various tech domains

### 📊 Comprehensive Analytics
- **Performance Dashboard**: Track your progress across all practice sessions
- **Detailed Reports**: Get insights into your strengths and areas for improvement
- **Face Monitoring Analytics**: Review your behavioral performance over time
- **Study Plan Progress**: Monitor completion rates and time spent

### 🛠️ Job Tools Suite
- **Cover Letter Generator**: AI-powered cover letter creation from job descriptions
- **Resume Review**: Get detailed feedback on your resume with improvement suggestions
- **Resume Chat**: Interactive AI assistant for resume optimization
- **Document Analysis**: Support for PDF, DOCX, and text file uploads
---
## 🌟GSSoc 

![GSSoC Logo](https://github.com/dimpal-yadav/Foodie/blob/main/images/GSSoC.png)

🌟 **Exciting News...**

🚀 This project is now an official part of GirlScript Summer of Code – GSSoC! 💻 We're thrilled to welcome contributors from all over India and beyond to collaborate, build, and grow *Interview01!* Let’s make learning and career development smarter – together! 🌟

GSSoC is one of India’s **largest 3-month-long open-source programs** that encourages developers of all levels to contribute to real-world projects while learning, collaborating, and growing together.

🌈 With **mentorship, community support**, and **collaborative coding**, it's the perfect platform for developers to:

- ✨ Improve their skills
- 🤝 Contribute to impactful projects
- 🏆 Get recognized for their work
- 📜 Receive certificates and swag!

🎉 **I can’t wait to welcome new contributors** from GSSoC 2025 to this Interview01 project family! Let's build, learn, and grow together — one commit at a time. 
---
## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser with camera access (for face monitoring features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Interview01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AITools/         # AI-powered tools
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # Main dashboard
│   ├── Evaluation/      # Evaluation results
│   ├── History/         # Practice history
│   ├── Home/            # Landing page
│   ├── JobTools/        # Job preparation tools
│   ├── Layout/          # Layout components
│   ├── Practice/        # Interview practice
│   ├── Profile/         # User profile
│   ├── Settings/        # App settings
│   └── StudyPlan/       # Study plan components
├── contexts/            # React contexts
├── data/               # Static data and questions
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── services/           # API services
└── types/              # TypeScript type definitions
```

## 🎯 Key Features Breakdown

### AI Evaluation Service
- **Multi-provider support**: OpenAI, Gemini, and Groq
- **Comprehensive scoring**: Communication, technical accuracy, problem-solving
- **Detailed feedback**: Specific improvement suggestions
- **Response parsing**: Intelligent analysis of interview responses

### Face Monitoring System
- **Face-API.js integration**: Professional face detection
- **Real-time analysis**: Live behavioral feedback
- **Eye contact tracking**: Monitor interview presence
- **Posture analysis**: Professional appearance feedback

### Question Management
- **500+ Questions**: Covering all major tech domains
- **Smart categorization**: Automatic tagging and organization
- **Company mapping**: Questions linked to specific companies
- **Difficulty levels**: Easy, medium, and hard questions

### Study Plans
- **8 Specialized Plans**: Frontend, Backend, Full Stack, DSA, Cybersecurity, DevOps, Cloud Computing, Machine Learning
- **Structured Learning**: Daily schedules with specific goals
- **Progress Tracking**: Monitor completion and performance
- **Flexible Duration**: 1-week, 2-week, and 4-week options

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.2**: Fast build tool and development server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **React Router 6.20.1**: Client-side routing
- **React Hook Form 7.48.2**: Form management
- **Lucide React 0.344.0**: Beautiful icons

### AI & Computer Vision
- **Face-API.js 0.22.2**: Face detection and analysis
- **MediaPipe**: Advanced computer vision capabilities
- **OpenAI API**: GPT models for evaluation
- **Google Gemini API**: Alternative AI evaluation
- **Groq API**: Fast AI inference

### Backend & Database
- **Supabase 2.38.4**: Backend-as-a-Service with PostgreSQL
- **Real-time subscriptions**: Live data updates
- **Authentication**: Secure user management
- **File storage**: Document upload and management

### Data Processing
- **PDF.js 4.0.379**: PDF parsing and analysis
- **Mammoth 1.6.0**: DOCX file processing
- **PDF-parse 1.1.1**: PDF text extraction

### UI/UX
- **React Hot Toast 2.4.1**: Beautiful notifications
- **Chart.js 4.4.0**: Data visualization
- **React Chart.js 2 5.2.0**: React wrapper for Chart.js
- **Date-fns 2.30.0**: Date manipulation utilities

## 🎨 Features in Detail

### 1. AI-Powered Evaluation
The platform uses multiple AI models to provide comprehensive feedback:
- **Communication Score**: Clarity, confidence, and articulation
- **Technical Accuracy**: Correctness of technical responses
- **Problem-Solving Approach**: Methodology and logical thinking
- **Improvement Suggestions**: Specific actionable feedback

### 2. Face Monitoring
Advanced computer vision for behavioral analysis:
- **Eye Contact Detection**: Track gaze patterns during interviews
- **Facial Expression Analysis**: Monitor confidence and engagement
- **Posture Assessment**: Professional appearance feedback
- **Real-time Alerts**: Immediate behavioral improvement suggestions

### 3. Custom Question Generation
Intelligent question creation from various sources:
- **Job Description Parsing**: Extract relevant questions from job postings
- **Resume Analysis**: Generate questions based on your experience
- **Topic Customization**: Create questions for specific technical domains
- **Difficulty Adjustment**: Scale questions to your skill level

### 4. Study Plans
Comprehensive learning paths for different roles:
- **Frontend Development**: React, Vue, Angular, CSS, JavaScript
- **Backend Development**: Node.js, Python, Java, databases, APIs
- **Full Stack**: Complete web development stack
- **Data Structures & Algorithms**: DSA fundamentals and advanced topics
- **Cybersecurity**: Security principles, threats, and defenses
- **DevOps**: CI/CD, containers, cloud infrastructure
- **Cloud Computing**: AWS, Azure, GCP, serverless
- **Machine Learning**: AI/ML fundamentals and applications

### 5. Job Tools
Professional tools for job preparation:
- **Cover Letter Generator**: AI-powered cover letter creation
- **Resume Review**: Detailed feedback and optimization suggestions
- **Resume Chat**: Interactive AI assistant for resume improvement
- **Document Analysis**: Support for multiple file formats

## 🔧 Configuration

### Environment Variables
Set up the following environment variables for full functionality:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Provider API Keys
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GROQ_API_KEY=your_groq_api_key
```

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication (Google, GitHub, or email)
3. Create necessary database tables
4. Configure storage buckets for file uploads
5. Set up Row Level Security (RLS) policies

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Face-API.js**: For advanced face detection capabilities
- **MediaPipe**: For computer vision features
- **Supabase**: For backend infrastructure
- **OpenAI, Google, Groq**: For AI evaluation services
- **React Community**: For the amazing ecosystem

## 📞 Support

For support, email support@interviewace.com or join our Slack channel.

---

**Built with [Om Singh❤️] for the developer community**

*Transform your interview preparation with AI-powered coaching and real-time feedback.* 
