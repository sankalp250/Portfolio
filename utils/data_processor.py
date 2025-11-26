"""
Data processing utilities for project categorization and analysis
"""
from typing import List, Dict
import config

def categorize_project(repo: Dict) -> str:
    """Categorize a repository based on description, topics, and language"""
    description = (repo.get("description") or "").lower()
    topics = [t.lower() for t in repo.get("topics", [])]
    language = (repo.get("language") or "").lower()
    
    # Combine all text for analysis
    text = f"{description} {' '.join(topics)} {language}"
    
    # Check each category
    for category, keywords in config.PROJECT_CATEGORIES.items():
        if category == "Other":
            continue
        for keyword in keywords:
            if keyword in text:
                return category
    
    return "Other"

def calculate_complexity_score(repo: Dict) -> int:
    """Calculate a complexity score for a repository (1-10)"""
    score = 5  # Base score
    
    # Size factor
    size_kb = repo.get("size", 0)
    if size_kb > 10000:
        score += 2
    elif size_kb > 1000:
        score += 1
    
    # Stars factor
    stars = repo.get("stargazers_count", 0)
    if stars > 10:
        score += 1
    if stars > 50:
        score += 1
    
    # Forks factor
    forks = repo.get("forks_count", 0)
    if forks > 5:
        score += 1
    
    # Has topics
    if len(repo.get("topics", [])) > 3:
        score += 1
    
    return min(score, 10)

def extract_tech_stack(repo: Dict, languages: Dict) -> List[str]:
    """Extract technology stack from repository"""
    tech_stack = []
    
    # Add primary language
    if repo.get("language"):
        tech_stack.append(repo["language"])
    
    # Add other significant languages (>10% of codebase)
    if languages:
        total_bytes = sum(languages.values())
        for lang, bytes_count in languages.items():
            if bytes_count / total_bytes > 0.1 and lang not in tech_stack:
                tech_stack.append(lang)
    
    # Add from topics
    for topic in repo.get("topics", []):
        if topic.lower() in ["tensorflow", "pytorch", "keras", "streamlit", "fastapi", 
                             "docker", "kubernetes", "react", "vue", "angular"]:
            tech_stack.append(topic.title())
    
    return tech_stack[:6]  # Limit to 6 items

def filter_repositories(repos: List[Dict], 
                        category: str = "All",
                        search_term: str = "",
                        min_stars: int = 0) -> List[Dict]:
    """Filter repositories based on criteria"""
    filtered = repos
    
    # Filter by category
    if category != "All":
        filtered = [r for r in filtered if categorize_project(r) == category]
    
    # Filter by search term
    if search_term:
        search_lower = search_term.lower()
        filtered = [
            r for r in filtered
            if search_lower in (r.get("name") or "").lower() or
               search_lower in (r.get("description") or "").lower()
        ]
    
    # Filter by stars
    if min_stars > 0:
        filtered = [r for r in filtered if r.get("stargazers_count", 0) >= min_stars]
    
    return filtered

def sort_repositories(repos: List[Dict], sort_by: str = "updated") -> List[Dict]:
    """Sort repositories by different criteria"""
    if sort_by == "stars":
        return sorted(repos, key=lambda x: x.get("stargazers_count", 0), reverse=True)
    elif sort_by == "forks":
        return sorted(repos, key=lambda x: x.get("forks_count", 0), reverse=True)
    elif sort_by == "name":
        return sorted(repos, key=lambda x: x.get("name", "").lower())
    else:  # updated
        return sorted(repos, key=lambda x: x.get("updated_at", ""), reverse=True)

def get_featured_repos(repos: List[Dict]) -> List[Dict]:
    """Get featured repositories"""
    featured = []
    for repo_name in config.FEATURED_REPOS:
        for repo in repos:
            if repo.get("name") == repo_name:
                featured.append(repo)
                break
    return featured
