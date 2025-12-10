"""
FastAPI Backend for AI Chatbot
Exposes the RAG engine via REST API endpoints
"""
import sys
import os

# Add parent directory to path to import from ai and utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from ai.rag_engine import RAGEngine
from utils.github_api import GitHubAPI

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio AI Chatbot API",
    description="REST API for RAG-based AI chatbot",
    version="1.0.0"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances
rag_engine: Optional[RAGEngine] = None
is_initialized = False

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    
class ChatResponse(BaseModel):
    response: str
    success: bool
    error: Optional[str] = None

class StatusResponse(BaseModel):
    initialized: bool
    message: str

# Initialize RAG engine on startup
@app.on_event("startup")
async def startup_event():
    """Initialize the RAG engine with knowledge base"""
    global rag_engine, is_initialized
    
    try:
        print("🚀 Initializing RAG Engine...")
        rag_engine = RAGEngine(use_groq=True)
        
        # Try to load GitHub repositories for knowledge base
        try:
            print("📚 Loading GitHub repositories...")
            github = GitHubAPI()
            repos = github.get_repositories()
            
            if repos:
                rag_engine.initialize_knowledge_base(repos)
                print(f"✅ Knowledge base initialized with {len(repos)} repositories")
            else:
                print("⚠️ No repositories found, initializing with personal info only...")
                rag_engine.initialize_knowledge_base()
        except Exception as github_error:
            print(f"⚠️ GitHub loading failed: {github_error}")
            print("Initializing with personal info only...")
            rag_engine.initialize_knowledge_base()
        
        is_initialized = True
        print("✅ RAG Engine ready!")
            
    except Exception as e:
        print(f"❌ Error initializing RAG engine: {e}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        # Don't fail startup, but mark as not initialized
        is_initialized = False

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Portfolio AI Chatbot API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/api/chat/status", response_model=StatusResponse)
async def get_status():
    """Check if the chatbot is initialized and ready"""
    return StatusResponse(
        initialized=is_initialized,
        message="Chatbot is ready" if is_initialized else "Chatbot is initializing..."
    )

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message to the AI chatbot and get a response
    """
    if not is_initialized or rag_engine is None:
        raise HTTPException(
            status_code=503,
            detail="Chatbot is still initializing. Please try again in a moment."
        )
    
    try:
        # Get response from RAG engine
        response = rag_engine.get_response(request.message)
        
        return ChatResponse(
            response=response,
            success=True
        )
        
    except Exception as e:
        print(f"❌ Error generating response: {e}")
        return ChatResponse(
            response="",
            success=False,
            error=f"Failed to generate response: {str(e)}"
        )

@app.post("/api/chat/initialize")
async def initialize():
    """
    Manually trigger knowledge base initialization
    """
    global rag_engine, is_initialized
    
    try:
        if not rag_engine:
            rag_engine = RAGEngine(use_groq=True)
        
        github = GitHubAPI()
        repos = github.get_repositories()
        
        if repos:
            rag_engine.initialize_knowledge_base(repos)
            is_initialized = True
            return {"message": f"Initialized with {len(repos)} repositories", "success": True}
        else:
            return {"message": "No repositories found", "success": False}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("🌟 Starting Portfolio AI Chatbot API...")
    print("📍 API will be available at: http://localhost:8000")
    print("📖 API Documentation: http://localhost:8000/docs")
    
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
