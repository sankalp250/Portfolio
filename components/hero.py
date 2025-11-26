"""
Hero Section Component
"""
import streamlit as st
import config

def render_hero():
    """Render the hero section with animated introduction"""
    
    # Hero container with custom styling
    st.markdown("""
        <div class="fade-in" style="text-align: center; padding: 4rem 2rem;">
            <div class="neon-text" style="font-size: 1.2rem; margin-bottom: 1rem; letter-spacing: 3px;">
                👋 HELLO, I'M
            </div>
            <h1 style="font-size: 4rem; font-weight: 700; margin: 1rem 0; 
                       background: linear-gradient(135deg, #8B5CF6, #3B82F6, #EC4899);
                       -webkit-background-clip: text;
                       -webkit-text-fill-color: transparent;
                       background-clip: text;">
                SANKALP SINGH
            </h1>
            <div style="font-size: 1.5rem; color: #94A3B8; margin-bottom: 2rem;">
                <span class="typing-text">AI Engineer | Machine Learning Enthusiast</span>
            </div>
            <p style="font-size: 1.1rem; color: #CBD5E1; max-width: 700px; margin: 0 auto 2rem; line-height: 1.8;">
                Passionate about building intelligent systems that solve real-world problems. 
                Specializing in <span style="color: #8B5CF6; font-weight: 600;">NLP</span>, 
                <span style="color: #3B82F6; font-weight: 600;">Computer Vision</span>, and 
                <span style="color: #EC4899; font-weight: 600;">Deep Learning</span>.
            </p>
        </div>
    """, unsafe_allow_html=True)
    
    # Social links with icons
    col1, col2, col3, col4, col5 = st.columns([1, 1, 1, 1, 1])
    
    with col2:
        st.markdown(f"""
            <a href="{config.PERSONAL_INFO['github']}" target="_blank" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="padding: 1rem; text-align: center; cursor: pointer;">
                    <div style="font-size: 2rem;">💻</div>
                    <div style="color: #F1F5F9; margin-top: 0.5rem;">GitHub</div>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"""
            <a href="{config.PERSONAL_INFO['linkedin']}" target="_blank" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="padding: 1rem; text-align: center; cursor: pointer;">
                    <div style="font-size: 2rem;">💼</div>
                    <div style="color: #F1F5F9; margin-top: 0.5rem;">LinkedIn</div>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown(f"""
            <a href="mailto:{config.PERSONAL_INFO['email']}" style="text-decoration: none;">
                <div class="glass-card hover-glow" style="padding: 1rem; text-align: center; cursor: pointer;">
                    <div style="font-size: 2rem;">📧</div>
                    <div style="color: #F1F5F9; margin-top: 0.5rem;">Email</div>
                </div>
            </a>
        """, unsafe_allow_html=True)
    
    # Animated scroll indicator
    st.markdown("""
        <div style="text-align: center; margin-top: 4rem; animation: bounce 2s infinite;">
            <div style="font-size: 2rem; color: #8B5CF6;">↓</div>
            <div style="color: #94A3B8; font-size: 0.9rem;">Scroll to explore</div>
        </div>
        <style>
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .typing-text {
                display: inline-block;
                border-right: 3px solid #8B5CF6;
                animation: blink 0.7s step-end infinite;
            }
            @keyframes blink {
                50% { border-color: transparent; }
            }
        </style>
    """, unsafe_allow_html=True)
    
    # Add spacing
    st.markdown("<br><br>", unsafe_allow_html=True)
