"""
GitHub API Client for fetching repository data and statistics
"""
import requests
import streamlit as st
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import config

class GitHubAPI:
    """Client for interacting with GitHub API"""
    
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.username = config.GITHUB_USERNAME
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
        }
        if config.GITHUB_TOKEN:
            self.headers["Authorization"] = f"token {config.GITHUB_TOKEN}"
    
    @st.cache_data(ttl=config.CACHE_TTL, show_spinner=False)
    def get_user_info(_self) -> Dict:
        """Fetch user profile information"""
        try:
            response = requests.get(
                f"{_self.base_url}/users/{_self.username}",
                headers=_self.headers
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            st.error(f"Error fetching user info: {e}")
            return {}
    
    @st.cache_data(ttl=config.CACHE_TTL, show_spinner=False)
    def get_repositories(_self) -> List[Dict]:
        """Fetch all public repositories"""
        try:
            repos = []
            page = 1
            while True:
                response = requests.get(
                    f"{_self.base_url}/users/{_self.username}/repos",
                    headers=_self.headers,
                    params={"per_page": 100, "page": page, "sort": "updated"}
                )
                response.raise_for_status()
                data = response.json()
                if not data:
                    break
                repos.extend(data)
                page += 1
            return repos
        except Exception as e:
            st.error(f"Error fetching repositories: {e}")
            return []
    
    @st.cache_data(ttl=config.CACHE_TTL, show_spinner=False)
    def get_repo_languages(_self, repo_name: str) -> Dict:
        """Fetch languages used in a repository"""
        try:
            response = requests.get(
                f"{_self.base_url}/repos/{_self.username}/{repo_name}/languages",
                headers=_self.headers
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {}
    
    @st.cache_data(ttl=config.CACHE_TTL, show_spinner=False)
    def get_repo_stats(_self, repo_name: str) -> Dict:
        """Fetch detailed statistics for a repository"""
        try:
            # Get commits
            commits_response = requests.get(
                f"{_self.base_url}/repos/{_self.username}/{repo_name}/commits",
                headers=_self.headers,
                params={"per_page": 100}
            )
            commits_count = len(commits_response.json()) if commits_response.ok else 0
            
            # Get contributors
            contributors_response = requests.get(
                f"{_self.base_url}/repos/{_self.username}/{repo_name}/contributors",
                headers=_self.headers
            )
            contributors_count = len(contributors_response.json()) if contributors_response.ok else 0
            
            return {
                "commits": commits_count,
                "contributors": contributors_count
            }
        except Exception as e:
            return {"commits": 0, "contributors": 0}
    
    @st.cache_data(ttl=config.CACHE_TTL, show_spinner=False)
    def get_contribution_data(_self) -> List[Dict]:
        """Fetch contribution activity for heatmap"""
        try:
            # Get events from the last year
            response = requests.get(
                f"{_self.base_url}/users/{_self.username}/events/public",
                headers=_self.headers,
                params={"per_page": 100}
            )
            response.raise_for_status()
            events = response.json()
            
            # Process events into daily contributions
            contributions = {}
            for event in events:
                if event.get("type") in ["PushEvent", "PullRequestEvent", "IssuesEvent"]:
                    date = event["created_at"][:10]  # YYYY-MM-DD
                    contributions[date] = contributions.get(date, 0) + 1
            
            return [{"date": k, "count": v} for k, v in contributions.items()]
        except Exception as e:
            st.error(f"Error fetching contributions: {e}")
            return []
    
    def get_total_stats(_self) -> Dict:
        """Calculate total statistics across all repositories"""
        repos = _self.get_repositories()
        
        total_stars = sum(repo.get("stargazers_count", 0) for repo in repos)
        total_forks = sum(repo.get("forks_count", 0) for repo in repos)
        total_repos = len(repos)
        
        # Get all languages
        all_languages = {}
        for repo in repos[:20]:  # Limit to avoid rate limiting
            languages = _self.get_repo_languages(repo["name"])
            for lang, bytes_count in languages.items():
                all_languages[lang] = all_languages.get(lang, 0) + bytes_count
        
        return {
            "total_repos": total_repos,
            "total_stars": total_stars,
            "total_forks": total_forks,
            "languages": all_languages,
            "public_repos": total_repos
        }
