"""
RAG Engine for AI Chatbot
"""
import os
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
import config

class RAGEngine:
    """RAG-based chatbot engine"""
    
    def __init__(self, use_groq=True):
        """Initialize the RAG engine"""
        self.use_groq = use_groq
        
        # Initialize LLM
        if use_groq and config.GROQ_API_KEY:
            self.llm = ChatGroq(
                groq_api_key=config.GROQ_API_KEY,
                model_name="mixtral-8x7b-32768",
                temperature=0.7
            )
        elif config.GOOGLE_API_KEY:
            self.llm = ChatGoogleGenerativeAI(
                google_api_key=config.GOOGLE_API_KEY,
                model="gemini-pro",
                temperature=0.7
            )
        else:
            raise ValueError("No API key found for LLM")
        
        # Initialize embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # Vector store
        self.vector_store = None
        self.is_initialized = False
    
    def initialize_knowledge_base(self, repos=None):
        """Initialize vector store with repository data"""
        if self.is_initialized:
            return
        
        documents = []
        
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
                Created: {repo.get('created_at', '')[:10]}
                Updated: {repo.get('updated_at', '')[:10]}
                URL: {repo.get('html_url', '')}
                """
                
                doc = Document(
                    page_content=content,
                    metadata={
                        "name": repo.get('name', ''),
                        "url": repo.get('html_url', ''),
                        "language": repo.get('language', '')
                    }
                )
                documents.append(doc)
        
        # Add personal information
        personal_doc = Document(
            page_content=f"""
            Name: {config.PERSONAL_INFO['name']}
            Title: {config.PERSONAL_INFO['title']}
            Bio: {config.PERSONAL_INFO['bio']}
            Skills: {', '.join([skill for skills in config.SKILLS.values() for skill in skills])}
            
            I am an AI Engineer specializing in Machine Learning, Deep Learning, Gen AI, and Agentic AI.
            I have experience with Python, TensorFlow, PyTorch, LangChain, FastAPI, and React.
            I build intelligent systems and transform complex problems into elegant solutions.
            """,
            metadata={"type": "personal_info"}
        )
        documents.append(personal_doc)
        
        # If we have documents, create vector store
        if documents:
            # Split documents
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50
            )
            splits = text_splitter.split_documents(documents)
            
            # Create vector store
            self.vector_store = Chroma.from_documents(
                documents=splits,
                embedding=self.embeddings,
                persist_directory="./chroma_db"
            )
        
        self.is_initialized = True
    
    def get_response(self, question, chat_history=None):
        """Get response from the chatbot"""
        if not self.is_initialized:
            return "Please wait while I initialize my knowledge base..."
        
        # Retrieve relevant documents
        docs = self.vector_store.similarity_search(question, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])
        
        # Create prompt
        system_message = """You are an AI assistant for Sankalp Singh's portfolio. 
        You help visitors learn about Sankalp's projects, skills, and experience.
        Be friendly, professional, and informative. Use the provided context to answer questions.
        If you don't know something, be honest about it.
        
        Context:
        {context}
        """
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", "{question}")
        ])
        
        # Generate response
        chain = prompt | self.llm
        response = chain.invoke({
            "context": context,
            "question": question
        })
        
        return response.content
    
    def stream_response(self, question):
        """Stream response from the chatbot"""
        if not self.is_initialized:
            yield "Please wait while I initialize my knowledge base..."
            return
        
        # Retrieve relevant documents
        docs = self.vector_store.similarity_search(question, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])
        
        # Create prompt
        system_message = f"""You are an AI assistant for Sankalp Singh's portfolio. 
        You help visitors learn about Sankalp's projects, skills, and experience.
        Be friendly, professional, and informative. Use the provided context to answer questions.
        
        Context:
        {context}
        """
        
        messages = [
            SystemMessage(content=system_message),
            HumanMessage(content=question)
        ]
        
        # Stream response
        for chunk in self.llm.stream(messages):
            yield chunk.content
