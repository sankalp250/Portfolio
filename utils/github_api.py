"""
GitHub API Client for fetching repository data and statistics
"""
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from functools import lru_cache
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
        
        # Simple cache storage
        self._cache = {}
    
    def _cached(self, key: str, func, *args, **kwargs):
        """Simple caching mechanism"""
        if key not in self._cache:
            self._cache[key] = func(*args, **kwargs)
        return self._cache[key]
    
    def get_user_info(self) -> Dict:
        """Fetch user profile information"""
        try:
            response = requests.get(
                f"{self.base_url}/users/{self.username}",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching user info: {e}")
            return {}
    
    def get_repositories(self) -> List[Dict]:
        """Fetch all public repositories"""
        cache_key = f"repos_{self.username}"
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        try:
            repos = []
            page = 1
            while True:
                response = requests.get(
                    f"{self.base_url}/users/{self.username}/repos",
                    headers=self.headers,
                    params={"per_page": 100, "page": page, "sort": "updated"},
                    timeout=10
                )
                response.raise_for_status()
                data = response.json()
                if not data:
                    break
                repos.extend(data)
                page += 1
            self._cache[cache_key] = repos
            return repos
        except Exception as e:
            print(f"Error fetching repositories: {e}")
            return []
    
    def get_repo_languages(self, repo_name: str) -> Dict:
        """Fetch languages used in a repository"""
        try:
            response = requests.get(
                f"{self.base_url}/repos/{self.username}/{repo_name}/languages",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {}
    
    def get_repo_stats(self, repo_name: str) -> Dict:
        """Fetch detailed statistics for a repository"""
        try:
            # Get commits
            commits_response = requests.get(
                f"{self.base_url}/repos/{self.username}/{repo_name}/commits",
                headers=self.headers,
                params={"per_page": 100},
                timeout=10
            )
            commits_count = len(commits_response.json()) if commits_response.ok else 0
            
            # Get contributors
            contributors_response = requests.get(
                f"{self.base_url}/repos/{self.username}/{repo_name}/contributors",
                headers=self.headers,
                timeout=10
            )
            contributors_count = len(contributors_response.json()) if contributors_response.ok else 0
            
            return {
                "commits": commits_count,
                "contributors": contributors_count
            }
        except Exception as e:
            return {"commits": 0, "contributors": 0}
    
    def get_contribution_data(self) -> List[Dict]:
        """Fetch contribution activity for heatmap"""
        try:
            response = requests.get(
                f"{self.base_url}/users/{self.username}/events/public",
                headers=self.headers,
                params={"per_page": 100},
                timeout=10
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
            print(f"Error fetching contributions: {e}")
            return []
    
    def get_total_stats(self) -> Dict:
        """Calculate total statistics across all repositories"""
        repos = self.get_repositories()
        
        total_stars = sum(repo.get("stargazers_count", 0) for repo in repos)
        total_forks = sum(repo.get("forks_count", 0) for repo in repos)
        total_repos = len(repos)
        
        # Get all languages
        all_languages = {}
        for repo in repos[:20]:  # Limit to avoid rate limiting
            languages = self.get_repo_languages(repo["name"])
            for lang, bytes_count in languages.items():
                all_languages[lang] = all_languages.get(lang, 0) + bytes_count
        
        return {
            "total_repos": total_repos,
            "total_stars": total_stars,
            "total_forks": total_forks,
            "languages": all_languages,
            "public_repos": total_repos
        }
    
    def get_readme(self, repo_name: str) -> Optional[str]:
        """Get README content for a specific repository"""
        try:
            # Try different README filenames
            readme_names = ['README.md', 'readme.md', 'README', 'readme']
            
            for readme_name in readme_names:
                url = f"{self.base_url}/repos/{self.username}/{repo_name}/contents/{readme_name}"
                response = requests.get(url, headers=self.headers, timeout=10)
                
                if response.status_code == 200:
                    content = response.json()
                    # README content is base64 encoded
                    import base64
                    readme_content = base64.b64decode(content['content']).decode('utf-8')
                    return readme_content
            
            return None  # No README found
            
        except Exception as e:
            print(f"Error getting README for {repo_name}: {e}")
            return None
