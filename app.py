"""
AI Engineer Portfolio - Main Application
Built with Streamlit, LangChain, and Plotly
"""
import streamlit as st
import config
from components.hero import render_hero
from components.about import render_about
from components.projects import render_projects
from components.github_stats import render_github_stats
from components.chatbot import render_chatbot
from components.contact import render_contact

# Page configuration
st.set_page_config(
    page_title=config.APP_TITLE,
    page_icon=config.APP_ICON,
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Load custom CSS
def load_css():
    """Load custom CSS styling"""
    with open("styles/custom.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

try:
    load_css()
except:
    st.warning("Custom CSS file not found. Using default styling.")

# Navigation
def render_navigation():
    """Render navigation menu"""
    st.markdown("""
        <div style="position: sticky; top: 0; z-index: 1000; background: rgba(15, 23, 42, 0.95); 
                    backdrop-filter: blur(10px); padding: 1rem 0; border-bottom: 1px solid rgba(139, 92, 246, 0.2);">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem;">
                <div style="font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, #8B5CF6, #3B82F6);
                            -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Sankalp Singh
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)

# Main app
def main():
    """Main application"""
    
    # Render navigation
    render_navigation()
    
    # Create tabs for navigation
    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
        "🏠 Home",
        "👨‍💻 About",
        "🚀 Projects",
        "📊 GitHub Stats",
        "🤖 AI Assistant",
        "📧 Contact"
    ])
    
    with tab1:
        render_hero()
    
    with tab2:
        render_about()
    
    with tab3:
        render_projects()
    
    with tab4:
        render_github_stats()
    
    with tab5:
        render_chatbot()
    
    with tab6:
        render_contact()

if __name__ == "__main__":
    main()
