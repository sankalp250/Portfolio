# 🤖 AI Engineer Portfolio

A stunning, AI-powered portfolio website built with Streamlit that dynamically showcases GitHub projects with modern UI/UX, RAG-based chatbot, and cyberpunk aesthetic.

![Portfolio Preview](https://img.shields.io/badge/Built%20with-Streamlit-FF4B4B?style=for-the-badge&logo=streamlit)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python)
![LangChain](https://img.shields.io/badge/LangChain-AI-00ADD8?style=for-the-badge)

## ✨ Features

### 🎨 Modern UI/UX
- **Cyberpunk Aesthetic**: Dark theme with neon accents, glassmorphism effects
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **3D Flip Cards**: Interactive project cards with hover animations

### 🤖 AI-Powered Features
- **RAG Chatbot**: Ask questions about projects and skills
- **Smart Search**: Intelligent project filtering and categorization
- **Auto-categorization**: Projects automatically categorized by domain

### 📊 GitHub Integration
- **Real-time Stats**: Live metrics from GitHub API
- **Contribution Heatmap**: Visual representation of coding activity
- **Language Distribution**: Interactive charts showing tech stack
- **Project Analytics**: Stars, forks, and complexity scores

### 🚀 Interactive Components
- **Skills Radar Chart**: Animated visualization of technical skills
- **Project Filters**: Filter by category, stars, language
- **Search Functionality**: Find projects quickly
- **Animated Counters**: Eye-catching stat displays

## 🛠️ Tech Stack

- **Frontend**: Streamlit
- **AI/ML**: LangChain, Groq/Google Gemini, ChromaDB
- **Visualization**: Plotly, Pandas
- **API**: GitHub REST API
- **Styling**: Custom CSS with cyberpunk theme

## 📋 Prerequisites

- Python 3.9 or higher
- GitHub Personal Access Token
- Groq API Key or Google Gemini API Key

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sankalp250/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=sankalp250
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

### 4. Run the Application

```bash
streamlit run app.py
```

The application will open in your browser at `http://localhost:8501`

## 📁 Project Structure

```
portfolio/
├── app.py                  # Main Streamlit application
├── config.py               # Configuration and settings
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (not in git)
├── .gitignore             # Git ignore file
│
├── components/            # UI Components
│   ├── __init__.py
│   ├── hero.py           # Hero section
│   ├── about.py          # About section with skills
│   ├── projects.py       # Projects showcase
│   ├── github_stats.py   # GitHub statistics
│   ├── chatbot.py        # AI chatbot interface
│   └── contact.py        # Contact section
│
├── utils/                # Utility modules
│   ├── __init__.py
│   ├── github_api.py     # GitHub API client
│   └── data_processor.py # Data processing utilities
│
├── ai/                   # AI/RAG modules
│   ├── __init__.py
│   └── rag_engine.py     # RAG chatbot engine
│
├── styles/               # Custom styling
│   └── custom.css        # Cyberpunk theme CSS
│
└── .streamlit/           # Streamlit configuration
    └── config.toml       # Theme and server settings
```

## 🎨 Customization

### Update Personal Information

Edit `config.py` to update your personal information:

```python
PERSONAL_INFO = {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "email": "your.email@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
}
```

### Modify Skills

Update the `SKILLS` dictionary in `config.py`:

```python
SKILLS = {
    "Programming": ["Python", "JavaScript", "..."],
    "ML/DL Frameworks": ["TensorFlow", "PyTorch", "..."],
    # Add more categories...
}
```

### Change Theme Colors

Modify colors in `config.py`:

```python
COLORS = {
    "primary": "#8B5CF6",      # Purple
    "secondary": "#3B82F6",    # Blue
    "accent": "#EC4899",       # Pink
    # Customize more colors...
}
```

## 🔑 API Keys Setup

### GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` and `user` scopes
3. Copy token to `.env` file

### Groq API Key

1. Visit [Groq Console](https://console.groq.com)
2. Create an account and generate API key
3. Add to `.env` file

### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env` file

## 📊 Features Breakdown

### Hero Section
- Animated introduction with typing effect
- Social media links with glassmorphism
- Scroll indicator

### About Section
- Professional summary
- Interactive skills radar chart
- Categorized skill tags
- Resume download button

### Projects Section
- 3D flip cards with hover effects
- Filter by category, stars, language
- Search functionality
- Featured projects showcase
- Tech stack visualization
- Complexity scoring

### GitHub Stats
- Animated stat counters
- Contribution heatmap
- Language distribution chart
- Profile overview

### AI Chatbot
- RAG-based responses
- Context-aware answers
- Chat history
- Suggested questions
- Streaming responses

### Contact Section
- Social media links
- Email contact
- Professional footer

## 🚀 Deployment

### Streamlit Cloud

1. Push your code to GitHub
2. Go to [Streamlit Cloud](https://streamlit.io/cloud)
3. Connect your repository
4. Add secrets in Streamlit Cloud dashboard
5. Deploy!

### Environment Variables in Streamlit Cloud

Add these in Settings → Secrets:

```toml
GITHUB_TOKEN = "your_token"
GITHUB_USERNAME = "your_username"
GROQ_API_KEY = "your_groq_key"
GOOGLE_API_KEY = "your_google_key"
```

## 🎯 Performance Tips

- GitHub API caching reduces API calls
- Vector store persists for faster chatbot initialization
- Lazy loading of components
- Optimized image sizes

## 🐛 Troubleshooting

### GitHub API Rate Limit
- Use a Personal Access Token for higher limits (5000/hour vs 60/hour)
- Caching is enabled by default

### Chatbot Not Responding
- Check API keys are correctly set
- Ensure internet connection for LLM API calls
- Initialize knowledge base may take a few seconds

### CSS Not Loading
- Ensure `styles/custom.css` exists
- Check file path in `app.py`

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Contact

- **Email**: sankalp@example.com
- **LinkedIn**: [linkedin.com/in/sankalp250](https://linkedin.com/in/sankalp250)
- **GitHub**: [github.com/sankalp250](https://github.com/sankalp250)

## 🌟 Acknowledgments

- Built with [Streamlit](https://streamlit.io/)
- AI powered by [LangChain](https://langchain.com/)
- Charts by [Plotly](https://plotly.com/)
- Icons from Unicode Emoji

---

**Made with ❤️ and AI** | © 2024 Sankalp Singh
