import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import './GitHubStats.css';

const GitHubStats = () => {
    const [stats, setStats] = useState({
        repos: 0,
        stars: 0,
        forks: 0,
        followers: 0
    });
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        fetchGitHubStats();
    }, []);

    const fetchGitHubStats = async () => {
        try {
            const userResponse = await axios.get('https://api.github.com/users/sankalp250');
            const reposResponse = await axios.get('https://api.github.com/users/sankalp250/repos?per_page=100');

            const totalStars = reposResponse.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            const totalForks = reposResponse.data.reduce((acc, repo) => acc + repo.forks_count, 0);

            setStats({
                repos: userResponse.data.public_repos,
                stars: totalStars,
                forks: totalForks,
                followers: userResponse.data.followers
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            setLoading(false);
        }
    };

    const statItems = [
        { label: 'Public Repos', value: stats.repos, icon: '📦' },
        { label: 'Total Stars', value: stats.stars, icon: '⭐' },
        { label: 'Total Forks', value: stats.forks, icon: '🔱' },
        { label: 'Followers', value: stats.followers, icon: '👥' }
    ];

    return (
        <div className="github-stats" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">GitHub Stats</h2>
                    <p className="section-subtitle">My open source contributions</p>
                </motion.div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="stats-container">
                        {statItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                className="stat-card glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                            >
                                <div className="stat-icon">{item.icon}</div>
                                <div className="stat-value gradient-text">{item.value}</div>
                                <div className="stat-label">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    className="github-link-container"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <a
                        href="https://github.com/sankalp250"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        View GitHub Profile →
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default GitHubStats;
