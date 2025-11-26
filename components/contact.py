"""
Contact Section Component
"""
import streamlit as st
import config

def render_contact():
    """Render the contact section"""
    
    st.markdown("""
        <div class="fade-in">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">
                <span class="neon-text">Get In Touch</span>
            </h2>
            <div style="text-align: center; color: #94A3B8; margin-bottom: 3rem;">
                Let's connect and build something amazing together!
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Contact cards
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown(f"""
            <a href="mailto:{config.PERSONAL_INFO['email']}" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="text-align: center; cursor: pointer; height: 200px; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📧</div>
                    <h3 style="color: #8B5CF6; margin-bottom: 0.5rem;">Email</h3>
                    <p style="color: #94A3B8; font-size: 0.9rem;">Drop me a line</p>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
            <a href="{config.PERSONAL_INFO['linkedin']}" target="_blank" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="text-align: center; cursor: pointer; height: 200px; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">💼</div>
                    <h3 style="color: #3B82F6; margin-bottom: 0.5rem;">LinkedIn</h3>
                    <p style="color: #94A3B8; font-size: 0.9rem;">Let's connect</p>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"""
            <a href="{config.PERSONAL_INFO['github']}" target="_blank" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="text-align: center; cursor: pointer; height: 200px; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">💻</div>
                    <h3 style="color: #EC4899; margin-bottom: 0.5rem;">GitHub</h3>
                    <p style="color: #94A3B8; font-size: 0.9rem;">Check my code</p>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    st.markdown("<br><br>", unsafe_allow_html=True)
    
    # Footer
    st.markdown("""
        <div style="text-align: center; padding: 2rem; border-top: 1px solid rgba(139, 92, 246, 0.2); margin-top: 3rem;">
            <p style="color: #94A3B8; font-size: 0.9rem;">
                Built with ❤️ using Streamlit, LangChain, and Plotly
            </p>
            <p style="color: #64748B; font-size: 0.85rem; margin-top: 0.5rem;">
                © 2024 Sankalp Singh. All rights reserved.
            </p>
            <div style="margin-top: 1rem;">
                <span style="color: #8B5CF6;">⚡</span>
                <span style="color: #94A3B8; font-size: 0.85rem; margin: 0 0.5rem;">Powered by AI</span>
                <span style="color: #3B82F6;">🚀</span>
            </div>
        </div>
    """, unsafe_allow_html=True)
