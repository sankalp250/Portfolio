"""
GitHub Statistics Dashboard Component
"""
import streamlit as st
import plotly.graph_objects as go
import plotly.express as px
from utils.github_api import GitHubAPI
import pandas as pd
from datetime import datetime, timedelta

def create_contribution_heatmap(contributions):
    """Create a contribution heatmap"""
    if not contributions:
        return None
    
    df = pd.DataFrame(contributions)
    df['date'] = pd.to_datetime(df['date'])
    df['week'] = df['date'].dt.isocalendar().week
    df['day'] = df['date'].dt.dayofweek
    
    # Create pivot table
    pivot = df.pivot_table(values='count', index='day', columns='week', fill_value=0)
    
    fig = go.Figure(data=go.Heatmap(
        z=pivot.values,
        x=pivot.columns,
        y=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        colorscale=[
            [0, '#0F172A'],
            [0.2, '#1E293B'],
            [0.4, '#3B82F6'],
            [0.6, '#8B5CF6'],
            [1, '#EC4899']
        ],
        showscale=True,
        colorbar=dict(
            title="Contributions",
            titlefont=dict(color='#F1F5F9'),
            tickfont=dict(color='#F1F5F9')
        )
    ))
    
    fig.update_layout(
        title="Contribution Activity",
        title_font=dict(color='#F1F5F9', size=20),
        xaxis=dict(
            title="Week",
            gridcolor='rgba(139, 92, 246, 0.1)',
            color='#94A3B8'
        ),
        yaxis=dict(
            gridcolor='rgba(139, 92, 246, 0.1)',
            color='#94A3B8'
        ),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(30, 41, 59, 0.5)',
        font=dict(family='Space Grotesk'),
        height=300
    )
    
    return fig

def create_language_chart(languages):
    """Create a language distribution chart"""
    if not languages:
        return None
    
    # Sort and get top 8 languages
    sorted_langs = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:8]
    langs, bytes_count = zip(*sorted_langs)
    
    colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6']
    
    fig = go.Figure(data=[go.Pie(
        labels=langs,
        values=bytes_count,
        hole=0.4,
        marker=dict(colors=colors, line=dict(color='#0F172A', width=2)),
        textfont=dict(color='#F1F5F9', size=14),
        hovertemplate='<b>%{label}</b><br>%{percent}<extra></extra>'
    )])
    
    fig.update_layout(
        title="Language Distribution",
        title_font=dict(color='#F1F5F9', size=20),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(family='Space Grotesk', color='#F1F5F9'),
        showlegend=True,
        legend=dict(
            font=dict(color='#F1F5F9'),
            bgcolor='rgba(30, 41, 59, 0.5)'
        ),
        height=400
    )
    
    return fig

def render_stat_card(icon, number, label, color):
    """Render an animated stat card"""
    return f"""
    <div class="stat-counter fade-in hover-glow">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">{icon}</div>
        <div class="stat-number" style="color: {color};">{number}</div>
        <div class="stat-label">{label}</div>
    </div>
    """

def render_github_stats():
    """Render the GitHub statistics dashboard"""
    
    st.markdown("""
        <div class="fade-in">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">
                <span class="neon-text">GitHub Statistics</span>
            </h2>
            <div style="text-align: center; color: #94A3B8; margin-bottom: 3rem;">
                Real-time metrics and activity overview
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Initialize GitHub API
    github = GitHubAPI()
    
    # Fetch statistics
    with st.spinner("Fetching GitHub statistics..."):
        stats = github.get_total_stats()
        user_info = github.get_user_info()
        contributions = github.get_contribution_data()
    
    # Display stat cards
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown(
            render_stat_card("📦", stats.get('total_repos', 0), "Repositories", "#8B5CF6"),
            unsafe_allow_html=True
        )
    
    with col2:
        st.markdown(
            render_stat_card("⭐", stats.get('total_stars', 0), "Total Stars", "#3B82F6"),
            unsafe_allow_html=True
        )
    
    with col3:
        st.markdown(
            render_stat_card("🔀", stats.get('total_forks', 0), "Total Forks", "#EC4899"),
            unsafe_allow_html=True
        )
    
    with col4:
        followers = user_info.get('followers', 0)
        st.markdown(
            render_stat_card("👥", followers, "Followers", "#10B981"),
            unsafe_allow_html=True
        )
    
    st.markdown("<br><br>", unsafe_allow_html=True)
    
    # Charts section
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown('<div class="glass-card fade-in">', unsafe_allow_html=True)
        
        # Language distribution
        lang_fig = create_language_chart(stats.get('languages', {}))
        if lang_fig:
            st.plotly_chart(lang_fig, use_container_width=True)
        else:
            st.info("No language data available")
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="glass-card fade-in">', unsafe_allow_html=True)
        
        # Additional stats
        st.markdown("""
            <h3 style="color: #8B5CF6; margin-bottom: 1.5rem; text-align: center;">
                Profile Overview
            </h3>
        """, unsafe_allow_html=True)
        
        profile_stats = f"""
        <div style="color: #CBD5E1; font-size: 1rem; line-height: 2;">
            <p><strong style="color: #8B5CF6;">👤 Username:</strong> {user_info.get('login', 'N/A')}</p>
            <p><strong style="color: #8B5CF6;">📍 Location:</strong> {user_info.get('location', 'N/A')}</p>
            <p><strong style="color: #8B5CF6;">🏢 Company:</strong> {user_info.get('company', 'N/A')}</p>
            <p><strong style="color: #8B5CF6;">📧 Email:</strong> {user_info.get('email', 'N/A')}</p>
            <p><strong style="color: #8B5CF6;">🔗 Public Repos:</strong> {user_info.get('public_repos', 0)}</p>
            <p><strong style="color: #8B5CF6;">📅 Joined:</strong> {user_info.get('created_at', '')[:10]}</p>
        </div>
        """
        st.markdown(profile_stats, unsafe_allow_html=True)
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Contribution heatmap
    st.markdown('<div class="glass-card fade-in">', unsafe_allow_html=True)
    
    heatmap_fig = create_contribution_heatmap(contributions)
    if heatmap_fig:
        st.plotly_chart(heatmap_fig, use_container_width=True)
    else:
        st.info("No recent contribution data available")
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    st.markdown("<br><br>", unsafe_allow_html=True)
