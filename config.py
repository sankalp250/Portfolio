"""
Configuration file for the AI Engineer Portfolio
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# GitHub Configuration
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "sankalp250")

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Application Settings
APP_TITLE = os.getenv("APP_TITLE", "Sankalp Singh | AI Engineer Portfolio")
APP_ICON = os.getenv("APP_ICON", "🤖")

# Theme Colors (Cyberpunk Aesthetic)
COLORS = {
    "primary": "#8B5CF6",      # Purple
    "secondary": "#3B82F6",    # Blue
    "accent": "#EC4899",       # Pink
    "neon_green": "#10B981",   # Neon Green
    "neon_blue": "#06B6D4",    # Neon Cyan
    "dark_bg": "#0F172A",      # Dark Background
    "card_bg": "#1E293B",      # Card Background
    "text": "#F1F5F9",         # Light Text
    "text_muted": "#94A3B8",   # Muted Text
}

# Personal Information
PERSONAL_INFO = {
    "name": "Sankalp Singh",
    "title": "AI Engineer | Machine Learning Enthusiast",
    "bio": """Passionate AI Engineer specializing in NLP, Computer Vision, and Deep Learning. 
    Building intelligent systems that solve real-world problems using cutting-edge ML technologies.""",
    "email": "sankalp@example.com",  # Update with your email
    "linkedin": "https://linkedin.com/in/sankalp250",
    "github": "https://github.com/sankalp250",
    "twitter": "https://twitter.com/sankalp250",
}

# Skills Configuration
SKILLS = {
    "Programming": ["Python", "JavaScript", "SQL", "C++"],
    "ML/DL Frameworks": ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
    "NLP": ["Transformers", "LangChain", "LangGraph", "Hugging Face"],
    "Computer Vision": ["OpenCV", "YOLO", "Detectron2"],
    "Tools & Platforms": ["Docker", "Git", "AWS", "Streamlit", "FastAPI"],
    "Databases": ["PostgreSQL", "MongoDB", "ChromaDB", "Pinecone"],
}

# Project Categories
PROJECT_CATEGORIES = {
    "NLP": ["nlp", "language", "text", "chatbot", "transformer", "gpt", "bert"],
    "Computer Vision": ["cv", "vision", "image", "detection", "yolo", "opencv"],
    "Machine Learning": ["ml", "machine learning", "classification", "regression", "clustering"],
    "Deep Learning": ["deep learning", "neural", "cnn", "rnn", "lstm", "gan"],
    "Data Science": ["data", "analysis", "visualization", "pandas", "numpy"],
    "Web Development": ["web", "streamlit", "flask", "fastapi", "django"],
    "Other": []
}

# Cache Settings
CACHE_TTL = 3600  # 1 hour in seconds

# Featured Projects (will be shown first)
FEATURED_REPOS = [
    "agentic-qa-app",
    "promptboost",
    "studybuddy",
    "Reliable_RAG_v2",
    "health-insight-dashboard"
]
