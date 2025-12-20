<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Three.js-0.181-000000?style=for-the-badge&logo=three.js" alt="Three.js"/>
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

<h1 align="center">🚀 Sankalp Singh | AI Engineer Portfolio</h1>

<p align="center">
  <strong>A stunning, modern portfolio featuring 3D animations, an AI-powered chatbot, and cosmic visuals.</strong>
</p>

<p align="center">
  <a href="https://portfolio-pi-lac-11.vercel.app/">🌐 Live Demo</a> •
  <a href="https://portfolio-9wvn.onrender.com/docs">📡 API Docs</a> •
  <a href="https://linkedin.com/in/sankalp250">💼 LinkedIn</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌌 **Cosmic 3D Background** | Immersive space-themed visuals with animated stars and shooting comets |
| 🤖 **AI Chatbot** | RAG-powered assistant that answers questions about my skills and projects |
| ⚡ **Smooth Animations** | Framer Motion powered transitions and micro-interactions |
| 📱 **Fully Responsive** | Pixel-perfect on all devices from mobile to ultrawide |
| 🎨 **Dark Theme** | Elegant dark mode with purple/blue gradient accents |
| 📊 **Live GitHub Stats** | Real-time repository data and contribution metrics |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Three.js** & **React Three Fiber** - 3D graphics and animations
- **Framer Motion** - Smooth animations and transitions
- **Vite** - Lightning-fast build tool

### Backend
- **FastAPI** - High-performance Python API
- **LangChain** - RAG-based AI chatbot
- **Groq** - Ultra-fast LLM inference

### Deployment
- **Vercel** - Frontend hosting with edge network
- **Render** - Backend API hosting

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Groq API Key ([Get one free](https://console.groq.com))

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload
```

### Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend** (`.env`):
```env
GROQ_API_KEY=your_groq_api_key
GITHUB_TOKEN=your_github_token
```

---

## 📁 Project Structure

```
portfolio/
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── assets/         # Images and icons
│   │   └── index.css       # Global styles
│   └── package.json
│
├── backend/                 # FastAPI server
│   ├── api.py              # API endpoints
│   └── requirements.txt
│
├── ai/                      # AI modules
│   └── rag_engine.py       # RAG chatbot engine
│
└── utils/                   # Utilities
    └── github_api.py       # GitHub API client
```

---

## 🌐 Live Deployment

| Service | URL |
|---------|-----|
| 🖥️ Frontend | [portfolio-pi-lac-11.vercel.app](https://portfolio-pi-lac-11.vercel.app/) |
| 🔌 Backend API | [portfolio-9wvn.onrender.com](https://portfolio-9wvn.onrender.com) |
| 📖 API Docs | [portfolio-9wvn.onrender.com/docs](https://portfolio-9wvn.onrender.com/docs) |

---

## 📧 Contact

<p align="center">
  <a href="https://linkedin.com/in/sankalp250"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://github.com/sankalp250"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
</p>

---

<p align="center">
  <strong>Built with ❤️ using React, Three.js & Framer Motion</strong><br>
  © 2024 Sankalp Singh
</p>
