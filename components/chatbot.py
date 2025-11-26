"""
AI Chatbot Component
"""
import streamlit as st
from ai.rag_engine import RAGEngine
from utils.github_api import GitHubAPI

def initialize_chatbot():
    """Initialize the chatbot and knowledge base"""
    if 'rag_engine' not in st.session_state:
        st.session_state.rag_engine = RAGEngine(use_groq=True)
        
        # Load repositories for knowledge base
        github = GitHubAPI()
        repos = github.get_repositories()
        
        if repos:
            st.session_state.rag_engine.initialize_knowledge_base(repos)
    
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

def render_chatbot():
    """Render the AI chatbot interface"""
    
    st.markdown("""
        <div class="fade-in">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">
                <span class="neon-text">AI Assistant</span>
            </h2>
            <div style="text-align: center; color: #94A3B8; margin-bottom: 3rem;">
                Ask me anything about Sankalp's projects and skills!
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Initialize chatbot
    initialize_chatbot()
    
    # Chat container
    st.markdown('<div class="glass-card fade-in">', unsafe_allow_html=True)
    
    # Display chat history
    chat_container = st.container()
    
    with chat_container:
        if not st.session_state.chat_history:
            st.markdown("""
                <div style="text-align: center; padding: 2rem; color: #94A3B8;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <p>Hi! I'm your AI assistant. I can help you learn about Sankalp's projects, skills, and experience.</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">Try asking:</p>
                    <ul style="list-style: none; padding: 0; margin-top: 0.5rem;">
                        <li>• "What are Sankalp's main skills?"</li>
                        <li>• "Tell me about the agentic-qa-app project"</li>
                        <li>• "What NLP projects has Sankalp worked on?"</li>
                    </ul>
                </div>
            """, unsafe_allow_html=True)
        else:
            for message in st.session_state.chat_history:
                if message['role'] == 'user':
                    st.markdown(f"""
                        <div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; 
                                    border-radius: 15px; margin-bottom: 1rem; border-left: 3px solid #8B5CF6;">
                            <div style="color: #8B5CF6; font-weight: 600; margin-bottom: 0.5rem;">You</div>
                            <div style="color: #F1F5F9;">{message['content']}</div>
                        </div>
                    """, unsafe_allow_html=True)
                else:
                    st.markdown(f"""
                        <div style="background: rgba(59, 130, 246, 0.2); padding: 1rem; 
                                    border-radius: 15px; margin-bottom: 1rem; border-left: 3px solid #3B82F6;">
                            <div style="color: #3B82F6; font-weight: 600; margin-bottom: 0.5rem;">AI Assistant</div>
                            <div style="color: #F1F5F9; line-height: 1.6;">{message['content']}</div>
                        </div>
                    """, unsafe_allow_html=True)
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Input area
    st.markdown("<br>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([5, 1])
    
    with col1:
        user_input = st.text_input(
            "Ask a question...",
            key="chat_input",
            placeholder="Type your question here...",
            label_visibility="collapsed"
        )
    
    with col2:
        send_button = st.button("Send 🚀", use_container_width=True)
    
    # Handle user input
    if send_button and user_input:
        # Add user message to history
        st.session_state.chat_history.append({
            'role': 'user',
            'content': user_input
        })
        
        # Get AI response
        with st.spinner("Thinking..."):
            response = st.session_state.rag_engine.get_response(user_input)
        
        # Add AI response to history
        st.session_state.chat_history.append({
            'role': 'assistant',
            'content': response
        })
        
        # Rerun to update chat display
        st.rerun()
    
    # Clear chat button
    if st.session_state.chat_history:
        if st.button("🗑️ Clear Chat", use_container_width=False):
            st.session_state.chat_history = []
            st.rerun()
    
    # Suggested questions
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("""
        <div class="glass-card fade-in">
            <h4 style="color: #8B5CF6; margin-bottom: 1rem;">💡 Suggested Questions</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    """, unsafe_allow_html=True)
    
    suggestions = [
        "What are your main technical skills?",
        "Tell me about your AI projects",
        "What's your experience with NLP?",
        "Show me your most starred projects"
    ]
    
    cols = st.columns(2)
    for idx, suggestion in enumerate(suggestions):
        with cols[idx % 2]:
            if st.button(suggestion, key=f"suggestion_{idx}", use_container_width=True):
                st.session_state.chat_history.append({
                    'role': 'user',
                    'content': suggestion
                })
                response = st.session_state.rag_engine.get_response(suggestion)
                st.session_state.chat_history.append({
                    'role': 'assistant',
                    'content': response
                })
                st.rerun()
    
    st.markdown("</div></div>", unsafe_allow_html=True)
    st.markdown("<br><br>", unsafe_allow_html=True)
