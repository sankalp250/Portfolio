"""
Projects Section Component with 3D Flip Cards
"""
import streamlit as st
from utils.github_api import GitHubAPI
from utils.data_processor import (
    categorize_project, calculate_complexity_score, 
    filter_repositories, sort_repositories, get_featured_repos,
    extract_tech_stack
)
import config

def create_project_card(repo, languages=None):
    """Create a 3D flip card for a project"""
    category = categorize_project(repo)
    complexity = calculate_complexity_score(repo)
    tech_stack = extract_tech_stack(repo, languages or {})
    
    # Card front
    card_html = f"""
    <div class="project-card">
        <div class="project-card-inner">
            <div class="project-card-front">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <h3 style="color: #F1F5F9; margin: 0; font-size: 1.3rem;">
                        {repo.get('name', 'Unknown')}
                    </h3>
                    <span style="background: rgba(139, 92, 246, 0.3); padding: 0.3rem 0.8rem; 
                                 border-radius: 15px; font-size: 0.8rem; color: #F1F5F9;">
                        {category}
                    </span>
                </div>
                <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                    {repo.get('description', 'No description available')[:150]}...
                </p>
                <div style="margin-bottom: 1rem;">
                    <div style="color: #64748B; font-size: 0.85rem; margin-bottom: 0.5rem;">Tech Stack:</div>
                    <div>
                        {''.join([f'<span style="background: rgba(59, 130, 246, 0.2); padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem; color: #3B82F6; margin-right: 0.5rem; display: inline-block; margin-bottom: 0.5rem;">{tech}</span>' for tech in tech_stack[:4]])}
                    </div>
                </div>
                <div style="display: flex; justify-content: space-around; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(139, 92, 246, 0.2);">
                    <div style="text-align: center;">
                        <div style="color: #8B5CF6; font-size: 1.5rem; font-weight: 700;">⭐ {repo.get('stargazers_count', 0)}</div>
                        <div style="color: #64748B; font-size: 0.8rem;">Stars</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #3B82F6; font-size: 1.5rem; font-weight: 700;">🔀 {repo.get('forks_count', 0)}</div>
                        <div style="color: #64748B; font-size: 0.8rem;">Forks</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #EC4899; font-size: 1.5rem; font-weight: 700;">📊 {complexity}/10</div>
                        <div style="color: #64748B; font-size: 0.8rem;">Complexity</div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1rem; color: #64748B; font-size: 0.85rem;">
                    Hover to see more details →
                </div>
            </div>
            <div class="project-card-back">
                <h3 style="color: #F1F5F9; margin-bottom: 1rem;">Project Details</h3>
                <div style="text-align: left; color: #CBD5E1; font-size: 0.9rem; line-height: 1.8;">
                    <p><strong style="color: #8B5CF6;">Language:</strong> {repo.get('language', 'N/A')}</p>
                    <p><strong style="color: #8B5CF6;">Created:</strong> {repo.get('created_at', '')[:10]}</p>
                    <p><strong style="color: #8B5CF6;">Updated:</strong> {repo.get('updated_at', '')[:10]}</p>
                    <p><strong style="color: #8B5CF6;">Size:</strong> {repo.get('size', 0)} KB</p>
                    <p><strong style="color: #8B5CF6;">License:</strong> {repo.get('license', {}).get('name', 'None') if repo.get('license') else 'None'}</p>
                </div>
                <a href="{repo.get('html_url', '#')}" target="_blank" style="text-decoration: none;">
                    <button style="width: 100%; margin-top: 1.5rem; padding: 0.75rem; 
                                   background: linear-gradient(135deg, #8B5CF6, #3B82F6); 
                                   border: none; border-radius: 10px; color: white; 
                                   font-weight: 600; cursor: pointer; font-size: 1rem;">
                        View on GitHub →
                    </button>
                </a>
            </div>
        </div>
    </div>
    """
    return card_html

def render_projects():
    """Render the projects section"""
    
    st.markdown("""
        <div class="fade-in">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">
                <span class="neon-text">Featured Projects</span>
            </h2>
            <div style="text-align: center; color: #94A3B8; margin-bottom: 3rem;">
                Explore my latest work and contributions
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Initialize GitHub API
    github = GitHubAPI()
    
    # Fetch repositories
    with st.spinner("Loading projects from GitHub..."):
        repos = github.get_repositories()
    
    if not repos:
        st.error("Unable to fetch repositories. Please check your GitHub token.")
        return
    
    # Filter and Search Controls
    st.markdown('<div class="glass-card fade-in">', unsafe_allow_html=True)
    
    col1, col2, col3, col4 = st.columns([2, 2, 2, 1])
    
    with col1:
        search_term = st.text_input("🔍 Search projects", "", key="project_search")
    
    with col2:
        categories = ["All"] + list(config.PROJECT_CATEGORIES.keys())
        selected_category = st.selectbox("📁 Category", categories, key="category_filter")
    
    with col3:
        sort_options = ["Updated", "Stars", "Forks", "Name"]
        sort_by = st.selectbox("🔄 Sort by", sort_options, key="sort_filter")
    
    with col4:
        min_stars = st.number_input("⭐ Min Stars", min_value=0, value=0, key="stars_filter")
    
    st.markdown('</div>', unsafe_allow_html=True)
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Filter repositories
    filtered_repos = filter_repositories(
        repos, 
        category=selected_category,
        search_term=search_term,
        min_stars=min_stars
    )
    
    # Sort repositories
    sort_map = {"Updated": "updated", "Stars": "stars", "Forks": "forks", "Name": "name"}
    filtered_repos = sort_repositories(filtered_repos, sort_map[sort_by])
    
    # Show featured projects first
    featured_repos = get_featured_repos(repos)
    
    if featured_repos and not search_term and selected_category == "All":
        st.markdown("""
            <div class="fade-in">
                <h3 style="color: #8B5CF6; margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <span style="font-size: 1.5rem; margin-right: 0.5rem;">⭐</span>
                    Featured Projects
                </h3>
            </div>
        """, unsafe_allow_html=True)
        
        # Display featured projects in a grid
        for i in range(0, len(featured_repos), 3):
            cols = st.columns(3)
            for j, col in enumerate(cols):
                if i + j < len(featured_repos):
                    repo = featured_repos[i + j]
                    languages = github.get_repo_languages(repo['name'])
                    with col:
                        st.markdown(create_project_card(repo, languages), unsafe_allow_html=True)
        
        st.markdown("<br><br>", unsafe_allow_html=True)
    
    # All Projects
    st.markdown(f"""
        <div class="fade-in">
            <h3 style="color: #8B5CF6; margin-bottom: 1.5rem;">
                All Projects ({len(filtered_repos)})
            </h3>
        </div>
    """, unsafe_allow_html=True)
    
    if not filtered_repos:
        st.info("No projects found matching your criteria.")
        return
    
    # Display all projects in a grid
    for i in range(0, len(filtered_repos), 3):
        cols = st.columns(3)
        for j, col in enumerate(cols):
            if i + j < len(filtered_repos):
                repo = filtered_repos[i + j]
                languages = github.get_repo_languages(repo['name'])
                with col:
                    st.markdown(create_project_card(repo, languages), unsafe_allow_html=True)
    
    st.markdown("<br><br>", unsafe_allow_html=True)
