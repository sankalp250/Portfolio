"""
About Section Component with Skills Visualization
"""
import streamlit as st
import plotly.graph_objects as go
import config

def create_skills_radar():
    """Create an animated radar chart for skills"""
    categories = list(config.SKILLS.keys())
    values = [len(skills) * 15 for skills in config.SKILLS.values()]  # Scale for visualization
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
        r=values,
        theta=categories,
        fill='toself',
        fillcolor='rgba(139, 92, 246, 0.3)',
        line=dict(color='#8B5CF6', width=2),
        marker=dict(size=8, color='#EC4899'),
        name='Skills'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 100],
                gridcolor='rgba(139, 92, 246, 0.2)',
                color='#94A3B8'
            ),
            angularaxis=dict(
                gridcolor='rgba(139, 92, 246, 0.2)',
                color='#F1F5F9'
            ),
            bgcolor='rgba(30, 41, 59, 0.5)'
        ),
        showlegend=False,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(color='#F1F5F9', family='Space Grotesk'),
        height=500
    )
    
    return fig

def render_about():
    """Render the about section"""
    
    st.markdown("""
        <div class="fade-in">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">
                <span class="neon-text">About Me</span>
            </h2>
            <div style="text-align: center; color: #94A3B8; margin-bottom: 3rem;">
                Get to know more about my skills and expertise
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Two column layout
    col1, col2 = st.columns([1, 1], gap="large")
    
    with col1:
        # Professional summary
        st.markdown("""
            <div class="glass-card fade-in">
                <h3 style="color: #8B5CF6; margin-bottom: 1rem;">👨‍💻 Professional Summary</h3>
                <p style="color: #CBD5E1; line-height: 1.8; font-size: 1.05rem;">
                    Passionate AI Engineer with expertise in building intelligent systems using 
                    cutting-edge machine learning technologies. Experienced in developing end-to-end 
                    ML pipelines, from data preprocessing to model deployment.
                </p>
                <p style="color: #CBD5E1; line-height: 1.8; font-size: 1.05rem; margin-top: 1rem;">
                    Specialized in Natural Language Processing, Computer Vision, and Deep Learning. 
                    Strong advocate for open-source contributions and continuous learning.
                </p>
            </div>
        """, unsafe_allow_html=True)
        
        st.markdown("<br>", unsafe_allow_html=True)
        
        # Download Resume Button
        st.markdown("""
            <div class="glass-card fade-in" style="text-align: center;">
                <h3 style="color: #8B5CF6; margin-bottom: 1rem;">📄 Resume</h3>
                <p style="color: #94A3B8; margin-bottom: 1.5rem;">
                    Download my resume to learn more about my experience
                </p>
                <button class="custom-button" onclick="alert('Resume download feature - Add your resume link!')">
                    Download Resume
                </button>
            </div>
        """, unsafe_allow_html=True)
    
    with col2:
        # Skills Radar Chart
        st.markdown("""
            <div class="glass-card fade-in">
                <h3 style="color: #8B5CF6; margin-bottom: 1rem; text-align: center;">
                    🎯 Skills Overview
                </h3>
            </div>
        """, unsafe_allow_html=True)
        
        fig = create_skills_radar()
        st.plotly_chart(fig, use_container_width=True)
    
    # Skills Tags
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("""
        <div class="fade-in">
            <h3 style="text-align: center; color: #8B5CF6; margin-bottom: 2rem;">
                🛠️ Technical Skills
            </h3>
        </div>
    """, unsafe_allow_html=True)
    
    for category, skills in config.SKILLS.items():
        st.markdown(f"""
            <div class="glass-card fade-in" style="margin-bottom: 1.5rem;">
                <h4 style="color: #3B82F6; margin-bottom: 1rem;">{category}</h4>
                <div>
        """, unsafe_allow_html=True)
        
        # Create skill tags
        skills_html = ""
        for skill in skills:
            skills_html += f'<span class="skill-tag">{skill}</span>'
        
        st.markdown(skills_html + "</div></div>", unsafe_allow_html=True)
    
    st.markdown("<br><br>", unsafe_allow_html=True)
