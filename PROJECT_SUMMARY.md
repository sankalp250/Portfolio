# 🤖 AI Engineer Portfolio - Comprehensive Project Summary

## 📌 Project Overview

This is a **modern, AI-powered portfolio web application** built with Streamlit that showcases your GitHub projects, skills, and experience with a stunning cyberpunk aesthetic. The application features real-time GitHub integration, interactive visualizations, and an intelligent RAG-based chatbot.

**Live URL**: http://localhost:8501  
**GitHub Repository**: https://github.com/sankalp250/Portfolio.git

---

## 🎯 What This Project Does

### Core Functionality

1. **Dynamic Portfolio Showcase**
   - Automatically fetches and displays all your GitHub repositories
   - Real-time statistics and metrics from GitHub API
   - Smart categorization of projects by domain (NLP, Computer Vision, ML, etc.)
   - Featured projects highlighting
   - Interactive project cards with flip animations

2. **AI-Powered Chatbot**
   - RAG (Retrieval Augmented Generation) based assistant
   - Answers questions about your projects, skills, and experience
   - Uses vector embeddings for intelligent context retrieval
   - Supports streaming responses for better UX
   - Powered by Groq (Mixtral) or Google Gemini

3. **GitHub Analytics Dashboard**
   - Total repositories, stars, and forks counters
   - Contribution heatmap visualization
   - Programming language distribution charts
   - Repository statistics and trends
   - Animated stat counters

4. **Interactive UI Components**
   - Hero section with animated introduction
   - Skills radar chart with interactive visualization
   - Project filtering by category, stars, and language
   - Search functionality across all projects
   - Responsive design for all devices

5. **Professional Presentation**
   - About section with bio and skills
   - Contact information with social links
   - Modern cyberpunk dark theme
   - Glassmorphism effects and neon accents
   - Smooth animations and transitions

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **Streamlit** (v1.28.0+)
  - Main web framework
  - Component-based architecture
  - Built-in state management
  - Custom CSS theming

### **AI/ML Stack**
- **LangChain** (v0.1.0+)
  - Framework for LLM applications
  - RAG pipeline orchestration
  - Prompt management
  
- **LangChain Community** (v0.0.38+)
  - Vector store integration
  - HuggingFace embeddings
  
- **LangChain Groq** (v0.0.1+)
  - Groq API integration
  - Mixtral-8x7b model support
  
- **LangChain Google GenAI** (v0.0.5+)
  - Google Gemini integration
  - Gemini-Pro model support

- **ChromaDB** (v0.4.22+)
  - Vector database for embeddings
  - Persistent storage
  - Similarity search

- **HuggingFace Embeddings**
  - sentence-transformers/all-MiniLM-L6-v2
  - Text vectorization for RAG

### **Data & Visualization**
- **Plotly** (v5.17.0+)
  - Interactive charts and graphs
  - Radar charts for skills
  - Language distribution pie charts
  - Contribution heatmaps

- **Pandas** (v2.1.0+)
  - Data processing and manipulation
  - GitHub stats aggregation

### **API Integration**
- **Requests** (v2.31.0+)
  - GitHub REST API client
  - HTTP requests handling

- **GitHub API**
  - Repository data fetching
  - User profile information
  - Contribution statistics
  - Language analytics

### **UI Enhancements**
- **Streamlit Extras** (v0.3.6+)
  - Additional UI components
  - Enhanced widgets

- **Streamlit Lottie** (v0.0.5+)
  - Animated illustrations
  - Loading animations

- **Pillow** (v10.0.0+)
  - Image processing
  - Asset handling

### **Configuration & Environment**
- **Python-dotenv** (v1.0.0+)
  - Environment variable management
  - API key security

- **NumPy** (v1.24.0+)
  - Numerical computations
  - Data processing

### **Styling**
- **Custom CSS**
  - Cyberpunk theme
  - Glassmorphism effects
  - Neon glow animations
  - 3D flip cards
  - Gradient borders

- **Google Fonts**
  - Space Grotesk (main font)
  - JetBrains Mono (code font)

---

## 📁 Project Architecture

### **Component-Based Structure**

```
Portfolio/
├── app.py                    # Main application entry point
├── config.py                 # Configuration & settings
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables (API keys)
│
├── components/               # UI Components
│   ├── hero.py              # Hero section with intro
│   ├── about.py             # About section with skills
│   ├── projects.py          # Projects showcase with filters
│   ├── github_stats.py      # GitHub analytics dashboard
│   ├── chatbot.py           # AI chatbot interface
│   └── contact.py           # Contact section
│
├── utils/                    # Utility Modules
│   ├── github_api.py        # GitHub API client
│   └── data_processor.py    # Data processing utilities
│
├── ai/                       # AI/RAG Modules
│   └── rag_engine.py        # RAG chatbot engine
│
├── styles/                   # Custom Styling
│   └── custom.css           # Cyberpunk theme CSS
│
└── .streamlit/              # Streamlit Configuration
    └── config.toml          # Theme & server settings
```

### **Key Components Breakdown**

#### **1. Main Application (`app.py`)**
- Page configuration and setup
- Navigation rendering
- Tab-based routing
- CSS loading
- Component orchestration

#### **2. Configuration (`config.py`)**
- API keys management
- Personal information
- Skills configuration
- Theme colors (cyberpunk palette)
- Project categories
- Featured repositories list
- Cache settings

#### **3. GitHub API Client (`utils/github_api.py`)**
- User profile fetching
- Repository listing (paginated)
- Language statistics
- Contribution data
- Repository stats (commits, contributors)
- Caching with Streamlit decorators

#### **4. RAG Engine (`ai/rag_engine.py`)**
- LLM initialization (Groq/Gemini)
- HuggingFace embeddings
- ChromaDB vector store
- Knowledge base creation from repos
- Context retrieval
- Response generation
- Streaming support

#### **5. UI Components**

**Hero Component (`components/hero.py`)**
- Animated introduction
- Gradient text effects
- Social media links
- Call-to-action buttons

**About Component (`components/about.py`)**
- Professional bio
- Skills radar chart (Plotly)
- Categorized skill tags
- Interactive visualizations

**Projects Component (`components/projects.py`)**
- GitHub repo cards
- 3D flip animations
- Filter by category/stars/language
- Search functionality
- Tech stack badges
- Complexity scoring

**GitHub Stats Component (`components/github_stats.py`)**
- Animated stat counters
- Contribution heatmap
- Language distribution chart
- Profile overview
- Real-time metrics

**Chatbot Component (`components/chatbot.py`)**
- Chat interface
- RAG-based responses
- Chat history
- Suggested questions
- Streaming responses

**Contact Component (`components/contact.py`)**
- Social media links
- Email contact
- Professional footer

#### **6. Custom Styling (`styles/custom.css`)**
- Cyberpunk color scheme
- Glassmorphism effects
- Neon glow animations
- 3D flip card styles
- Gradient borders
- Custom scrollbar
- Button hover effects
- Input field styling
- Tab styling
- Loading animations

---

## 🎨 Design Features

### **Cyberpunk Aesthetic**
- **Color Palette**:
  - Primary: Purple (#8B5CF6)
  - Secondary: Blue (#3B82F6)
  - Accent: Pink (#EC4899)
  - Neon Green (#10B981)
  - Neon Cyan (#06B6D4)
  - Dark Background (#0F172A)

- **Visual Effects**:
  - Glassmorphism cards
  - Neon glow text
  - Gradient borders
  - 3D flip animations
  - Smooth transitions
  - Hover effects
  - Backdrop blur

### **Animations**
- Fade-in effects
- Neon flicker
- Gradient shift
- Card flip on hover
- Button lift on hover
- Pulse loading
- Smooth scrolling

---

## 🔑 API Integrations

### **1. GitHub API**
- **Purpose**: Fetch repository data and statistics
- **Authentication**: Personal Access Token
- **Rate Limits**: 5000 requests/hour (authenticated)
- **Endpoints Used**:
  - `/users/{username}` - User profile
  - `/users/{username}/repos` - Repository list
  - `/repos/{username}/{repo}/languages` - Language stats
  - `/repos/{username}/{repo}/commits` - Commit history
  - `/users/{username}/events/public` - Contribution data

### **2. Groq API**
- **Purpose**: LLM for chatbot responses
- **Model**: Mixtral-8x7b-32768
- **Features**: Fast inference, large context window
- **Temperature**: 0.7 (balanced creativity)

### **3. Google Gemini API**
- **Purpose**: Alternative LLM for chatbot
- **Model**: Gemini-Pro
- **Features**: Multimodal capabilities
- **Temperature**: 0.7

---

## 🚀 Key Features in Detail

### **1. RAG Chatbot System**
- **Knowledge Base**: Created from GitHub repositories + personal info
- **Embeddings**: sentence-transformers/all-MiniLM-L6-v2
- **Vector Store**: ChromaDB with persistence
- **Retrieval**: Top-3 similar documents
- **Context**: Injected into LLM prompts
- **Response**: Streaming for better UX

### **2. GitHub Integration**
- **Caching**: 1-hour TTL to reduce API calls
- **Pagination**: Handles 100+ repositories
- **Real-time**: Live data on every load
- **Analytics**: Comprehensive statistics
- **Categorization**: Auto-categorize by keywords

### **3. Interactive Visualizations**
- **Plotly Charts**: Responsive and interactive
- **Radar Chart**: Skills proficiency levels
- **Pie Chart**: Language distribution
- **Heatmap**: Contribution calendar
- **Counters**: Animated number displays

### **4. Smart Filtering**
- **Category Filter**: NLP, CV, ML, DL, etc.
- **Star Filter**: Minimum star threshold
- **Language Filter**: By programming language
- **Search**: Full-text search across repos
- **Featured**: Priority display for key projects

---

## 📊 Data Flow

### **Application Startup**
1. Load environment variables (.env)
2. Initialize Streamlit page config
3. Load custom CSS
4. Render navigation
5. Create tab-based routing

### **GitHub Data Flow**
1. GitHubAPI client initialized
2. Fetch user profile (cached)
3. Fetch all repositories (cached)
4. Process and categorize repos
5. Calculate statistics
6. Render visualizations

### **Chatbot Flow**
1. Initialize RAG engine
2. Load LLM (Groq/Gemini)
3. Create embeddings model
4. Build knowledge base from repos
5. Store in ChromaDB vector store
6. User asks question
7. Retrieve relevant context
8. Generate response with LLM
9. Stream response to UI

---

## 🔒 Security & Configuration

### **Environment Variables (.env)**
```
GITHUB_TOKEN=<your_github_personal_access_token>
GITHUB_USERNAME=sankalp250
GROQ_API_KEY=<your_groq_api_key>
GOOGLE_API_KEY=<your_google_api_key>
```

### **Security Features**
- API keys in environment variables
- .gitignore for sensitive files
- No hardcoded credentials
- Token-based GitHub authentication

---

## 🎯 Performance Optimizations

1. **Caching**:
   - GitHub API responses (1-hour TTL)
   - Vector store persistence
   - Component-level caching

2. **Lazy Loading**:
   - Components load on-demand
   - Images optimized
   - Async data fetching

3. **Rate Limiting**:
   - GitHub API caching
   - Limited language fetching (top 20 repos)
   - Batch processing

---

## 📈 Use Cases

1. **Portfolio Showcase**: Display projects professionally
2. **Job Applications**: Impress recruiters with interactive portfolio
3. **Networking**: Share portfolio link on LinkedIn/Twitter
4. **Project Discovery**: Help visitors find relevant projects
5. **AI Demo**: Showcase RAG chatbot capabilities
6. **GitHub Analytics**: Track your coding activity

---

## 🌟 Unique Selling Points

1. ✅ **Fully Automated**: No manual project updates needed
2. ✅ **AI-Powered**: Intelligent chatbot answers questions
3. ✅ **Real-time**: Live GitHub data integration
4. ✅ **Modern Design**: Cyberpunk aesthetic with animations
5. ✅ **Interactive**: Filters, search, and visualizations
6. ✅ **Responsive**: Works on all devices
7. ✅ **Easy to Deploy**: One-click Streamlit Cloud deployment
8. ✅ **Customizable**: Easy to modify colors, skills, and content

---

## 🔧 Customization Points

You can easily customize:
- Personal information in `config.py`
- Skills and categories
- Theme colors
- Featured repositories
- Social media links
- Bio and title
- API providers (Groq vs Gemini)

---

**Built with ❤️ and AI** | © 2024 Sankalp Singh
