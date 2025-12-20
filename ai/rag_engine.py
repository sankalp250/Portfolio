"""
Lightweight RAG Engine for AI Chatbot - Optimized for low memory environments
Uses simple keyword matching instead of heavy embedding models
"""
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.documents import Document
import config

# Try to import optional dependencies
try:
    import PyPDF2
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False


class RAGEngine:
    """Lightweight RAG-based chatbot engine optimized for low memory"""
    
    def __init__(self, use_groq=True):
        """Initialize the RAG engine"""
        self.use_groq = use_groq
        self.documents = []
        self.is_initialized = False
        
        # Initialize LLM - only when needed
        self.llm = None
        self._init_llm()
    
    def _init_llm(self):
        """Lazy initialize LLM"""
        if self.llm is not None:
            return
            
        if self.use_groq and config.GROQ_API_KEY:
            self.llm = ChatGroq(
                groq_api_key=config.GROQ_API_KEY,
                model_name="llama-3.3-70b-versatile",
                temperature=0.7
            )
        else:
            raise ValueError("GROQ_API_KEY is required")
    
    def initialize_knowledge_base(self, repos=None, github_api=None):
        """Initialize with repository data - lightweight version"""
        if self.is_initialized:
            return
        
        # Create documents from repositories if provided
        if repos:
            for repo in repos:
                content = f"""
                Project: {repo.get('name', '')}
                Description: {repo.get('description', 'No description')}
                Language: {repo.get('language', 'N/A')}
                Stars: {repo.get('stargazers_count', 0)}
                Forks: {repo.get('forks_count', 0)}
                Topics: {', '.join(repo.get('topics', []))}
                URL: {repo.get('html_url', '')}
                """
                self.documents.append({
                    "content": content,
                    "type": "repo",
                    "name": repo.get('name', '')
                })
                
                # Fetch README if available
                if github_api:
                    readme = github_api.get_readme(repo.get('name', ''))
                    if readme:
                        self.documents.append({
                            "content": f"README for {repo.get('name', '')}: {readme[:2000]}",
                            "type": "readme",
                            "name": repo.get('name', '')
                        })
                        print(f"  ✅ Added README for {repo.get('name', '')}")
        
        # Add personal information
        self.documents.append({
            "content": f"""
            Name: {config.PERSONAL_INFO['name']}
            Title: {config.PERSONAL_INFO['title']}
            Bio: {config.PERSONAL_INFO['bio']}
            Skills: {', '.join([skill for skills in config.SKILLS.values() for skill in skills])}
            
            I am an AI Engineer specializing in Machine Learning, Deep Learning, Gen AI, and Agentic AI.
            I have experience with Python, TensorFlow, PyTorch, LangChain, FastAPI, and React.
            """,
            "type": "personal"
        })
        
        # Add resume content if available
        if HAS_PYPDF:
            try:
                resume_path = "Sankalp_Singh_resume.pdf"
                if os.path.exists(resume_path):
                    with open(resume_path, 'rb') as file:
                        pdf_reader = PyPDF2.PdfReader(file)
                        resume_text = ""
                        for page in pdf_reader.pages:
                            resume_text += page.extract_text() + "\n"
                        
                        self.documents.append({
                            "content": f"RESUME: {resume_text[:3000]}",
                            "type": "resume"
                        })
                        print("✅ Added resume to knowledge base")
            except Exception as e:
                print(f"⚠️ Could not load resume: {e}")
        
        self.is_initialized = True
        print(f"✅ Knowledge base initialized with {len(self.documents)} documents")
    
    def _simple_search(self, query, k=3):
        """Simple keyword-based search instead of vector similarity"""
        query_words = set(query.lower().split())
        scored_docs = []
        
        for doc in self.documents:
            content_lower = doc["content"].lower()
            # Count matching words
            score = sum(1 for word in query_words if word in content_lower)
            if score > 0:
                scored_docs.append((score, doc))
        
        # Sort by score and return top k
        scored_docs.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored_docs[:k]]
    
    def get_response(self, question, chat_history=None):
        """Get response from RAG engine"""
        if not self.is_initialized:
            return "Please wait while I initialize my knowledge base..."
        
        # Simple keyword search
        relevant_docs = self._simple_search(question, k=5)
        
        # Create context
        context_parts = []
        for i, doc in enumerate(relevant_docs):
            context_parts.append(f"[{doc.get('type', 'info')}]: {doc['content']}")
        
        # If no relevant docs found, use all personal info
        if not context_parts:
            for doc in self.documents:
                if doc.get("type") in ["personal", "resume"]:
                    context_parts.append(doc["content"])
        
        context = "\n\n---\n\n".join(context_parts)
        
        # Create prompt
        system_message = f"""You are an AI assistant representing Sankalp Singh, an AI Engineer.
        Use the following context to answer questions about Sankalp's projects, skills, and experience.
        Be conversational and helpful. If information isn't available, say so politely.
        
        Context:
        {context}
        """
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", "{question}")
        ])
        
        # Generate response
        chain = prompt | self.llm
        response = chain.invoke({"question": question})
        
        return response.content
    
    def stream_response(self, question):
        """Stream response from the chatbot"""
        if not self.is_initialized:
            yield "Please wait while I initialize my knowledge base..."
            return
        
        relevant_docs = self._simple_search(question, k=3)
        context = "\n\n".join([doc["content"] for doc in relevant_docs])
        
        system_message = f"""You are an AI assistant for Sankalp Singh's portfolio.
        Be friendly, professional, and informative.
        
        Context:
        {context}
        """
        
        messages = [
            SystemMessage(content=system_message),
            HumanMessage(content=question)
        ]
        
        for chunk in self.llm.stream(messages):
            yield chunk.content
