# 🎓 Sahayak - AI Teaching Assistant for Rural Education

<div align="center">

![Sahayak Logo](public/sahayak-icon.svg)

**An AI-powered teaching assistant designed specifically for rural education**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF.svg)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Powered-4285F4.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🚀 Live Demo](https://sahayak-app.web.app) • [📖 Documentation](#features) • [🤝 Contributing](#contributing)

</div>

## 🌟 Overview

**Sahayak** empowers rural teachers with AI-driven educational tools to create engaging content, worksheets, lesson plans, and interactive learning materials with minimal resources. Built with cultural sensitivity and designed for low-resource environments.

## ✨ Features

### 🎨 Content Creation Tools
| Feature | Description | Status |
|---------|-------------|--------|
| **📖 Story Generator** | Create culturally relevant educational stories | ✅ Ready |
| **📄 Worksheet Generator** | Multi-level practice exercises for different grades | ✅ Ready |
| **🧠 Q&A Assistant** | Answer student questions with local examples | ✅ Ready |
| **🎨 Drawing Guide** | Step-by-step blackboard drawing instructions | ✅ Ready |

### 🔬 Advanced AI Tools
| Feature | Description | Status |
|---------|-------------|--------|
| **📷 Visual Analysis** | Upload textbook photos → Generate worksheets | ✅ Ready |
| **🎤 Audio Tools** | Text-to-speech and voice input capabilities | ✅ Ready |
| **📅 Lesson Planner** | Comprehensive lesson planning with curriculum alignment | ✅ Ready |
| **🎮 Interactive Games** | Educational games for math, language, and science | ✅ Ready |

### 🌍 Rural Education Focus
- 🌐 **Offline-Ready**: Works with limited internet connectivity
- 📱 **Mobile-First**: Optimized for smartphones and tablets
- 🏫 **Multi-Grade Support**: Content for different grade levels
- 🇮🇳 **Cultural Context**: Hindi & English with local examples
- 💡 **Resource-Conscious**: Designed for minimal resource environments

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ installed
- **Google Gemini API key** ([Get free key](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sahayak-app.git
cd sahayak-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

# Start development server
npm run dev
```

### 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

## 🎯 Key Capabilities

### 📸 Textbook Photo Analysis
Transform any textbook into interactive content:

1. **Upload** textbook photos via camera or file upload
2. **AI analyzes** the content using Google Gemini Vision
3. **Generates** educational materials:
   - 📝 Comprehension questions
   - 📋 Practice worksheets
   - 📚 Story adaptations
   - 🎯 Lesson plans

### 🤖 AI Model Selection
Choose from **25+ Gemini models** including:

- **🆕 Gemini 2.5 Flash** (FREE - Newest & Fastest)
- **🧠 Gemini 2.5 Pro** (PAID - Most Advanced)
- **⚡ Gemini 2.0 Flash Experimental** (FREE - Latest Features)
- **🔬 Multiple specialized models** for different use cases

## 🛠️ Technology Stack

<div align="center">

| Frontend | AI/ML | Development | Deployment |
|----------|-------|-------------|------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) | ![AI Vision](https://img.shields.io/badge/AI%20Vision-FF6B6B?style=for-the-badge&logo=eye&logoColor=white) | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

</div>

### Core Technologies
- **Frontend**: React 19 + Vite for fast development
- **Styling**: CSS-in-JS with responsive design system
- **Animations**: Framer Motion for smooth interactions
- **AI Integration**: Google Gemini API with vision capabilities
- **Icons**: Lucide React for consistent iconography
- **PDF Generation**: jsPDF for downloadable content

## 📱 Responsive Design

<div align="center">

| Device | Breakpoint | Features |
|--------|------------|----------|
| 📱 **Mobile** | < 480px | Single column, large touch targets |
| 📟 **Tablet** | 481px - 768px | Two-column grid, balanced layout |
| 💻 **Desktop** | > 768px | Multi-column, full feature set |

</div>

## 🏗️ Project Structure

```
sahayak-app/
├── 📁 public/                 # Static assets
│   ├── 🎨 sahayak-icon.svg   # App icon
│   └── 🔗 favicon.ico        # Browser favicon
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── 🎨 CameraTools.jsx      # Image analysis
│   │   ├── 📝 ContentGenerator.jsx # Story creation
│   │   ├── 📄 WorksheetGenerator.jsx # Worksheet tools
│   │   ├── 🧠 KnowledgeBase.jsx    # Q&A assistant
│   │   ├── 🎨 VisualAidGenerator.jsx # Drawing guide
│   │   ├── 🎤 AudioTools.jsx       # Voice features
│   │   ├── 📅 LessonPlanner.jsx    # Lesson planning
│   │   ├── 🎮 InteractiveGames.jsx # Educational games
│   │   └── ⚙️ ApiKeyModal.jsx      # Configuration
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 🔑 useApiKey.js         # API key management
│   │   └── 🤖 useGeminiAI.js       # AI integration
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📄 pdfGenerator.js      # PDF creation
│   │   ├── ⚠️ errorHandler.js      # Error management
│   │   └── ⚡ performance.js       # Optimization
│   ├── 🎨 App.jsx             # Main application
│   ├── 🎨 index.css           # Global styles
│   └── ⚡ main.jsx            # Entry point
├── 🔧 package.json            # Dependencies
├── ⚙️ vite.config.js          # Build configuration
├── 🌍 .env                    # Environment variables
└── 📖 README.md               # This file
```

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project: "sahayak-app"
   - Enable Hosting
   - Upload files from `dist` folder

3. **Your app is live!**
   - URL: `https://sahayak-app.web.app`

### Alternative Deployments

<details>
<summary>🔹 Vercel Deployment</summary>

```bash
npm i -g vercel
vercel
```
</details>

<details>
<summary>🔹 Netlify Deployment</summary>

1. Run `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables
</details>

## 🎯 Usage Examples

### For Teachers

```javascript
// 1. Generate educational story
const story = await generateContent('content', {
  topic: 'Friendship',
  gradeLevel: '5',
  language: 'Hindi'
});

// 2. Create worksheet from textbook photo
const worksheet = await analyzeImage(textbookPhoto, 'questions');

// 3. Plan comprehensive lesson
const lessonPlan = await createLesson({
  subject: 'Mathematics',
  topic: 'Fractions',
  duration: '45 minutes'
});
```

### For Developers

```javascript
// Custom hook usage
const { callGeminiOptimized, loading } = useGeminiAI(genAI, selectedModel);

// Generate content with image
const result = await callGeminiOptimized(prompt, imageData);
```

## 🔧 Configuration

### API Models Available

<details>
<summary>🔹 View All 25+ Models</summary>

| Model | Type | Cost | Best For |
|-------|------|------|----------|
| Gemini 2.5 Flash | Latest | FREE | General use, fastest |
| Gemini 2.5 Pro | Latest | PAID | Advanced reasoning |
| Gemini 2.0 Flash Exp | Experimental | FREE | Latest features |
| Gemini 1.5 Flash | Stable | FREE | Reliable performance |
| Gemini 1.5 Pro | Stable | PAID | Complex tasks |
| ... and 20+ more models | | | |

</details>

### Environment Variables

```env
# Required
VITE_GEMINI_API_KEY=your_api_key_here

# Optional (for advanced configuration)
VITE_APP_NAME=Sahayak
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run dev
   npm run build
   ```
5. **Submit a pull request**

### Contribution Guidelines

- 📝 Follow existing code style
- ✅ Add tests for new features
- 📖 Update documentation
- 🐛 Fix bugs with test cases
- 🎨 Maintain responsive design

## 📊 Performance

- ⚡ **Fast Loading**: Optimized bundle with code splitting
- 📱 **Mobile Optimized**: 90+ Lighthouse score
- 🌐 **Offline Ready**: Service worker for caching
- 🔄 **Real-time**: Instant AI responses

## 🔒 Security

- 🔐 **API Key Protection**: Client-side validation
- 🛡️ **Input Sanitization**: XSS prevention
- 🔒 **HTTPS Only**: Secure connections
- 🚫 **No Data Storage**: Privacy-first approach

## 📈 Roadmap

- [ ] 🌍 **Offline Mode**: Complete offline functionality
- [ ] 🎯 **Assessment Tools**: Student progress tracking
- [ ] 🤝 **Collaboration**: Teacher-to-teacher sharing
- [ ] 📊 **Analytics**: Usage insights and reporting
- [ ] 🎨 **Themes**: Customizable UI themes
- [ ] 🌐 **More Languages**: Regional language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🎓 **Built for rural teachers and students**
- 🤖 **Powered by Google Gemini AI**
- 🌍 **Designed with accessibility and inclusivity**
- ❤️ **Made with love for education**


---

<div align="center">

**⭐ Star this repository if it helped you!**

**Made with ❤️ for rural education in India**

[🔝 Back to Top](#-sahayak---ai-teaching-assistant-for-rural-education)

</div>