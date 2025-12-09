import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            // Fetch from GitHub API
            const response = await axios.get('https://api.github.com/users/sankalp250/repos?sort=updated&per_page=100');
            const repos = response.data;

            // Process and categorize projects
            const processedProjects = repos.map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language || 'Other',
                url: repo.html_url,
                topics: repo.topics || [],
                updated: repo.updated_at
            }));

            setProjects(processedProjects);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    const categories = ['All', 'Python', 'JavaScript', 'TypeScript', 'C++', 'Other'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.language === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className="projects" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">Projects</h2>
                    <p className="section-subtitle">Featured work from my GitHub</p>
                </motion.div>

                <motion.div
                    className="filter-tabs"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-tab ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading projects...</p>
                    </div>
                ) : (
                    <motion.div
                        className="projects-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {filteredProjects.slice(0, 12).map(project => (
                            <motion.div
                                key={project.id}
                                className="project-card glass-card"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="project-header">
                                    <h3>{project.name.replace(/-/g, ' ')}</h3>
                                    {project.language && (
                                        <span className="project-language">{project.language}</span>
                                    )}
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="project-topics">
                                    {project.topics.slice(0, 3).map(topic => (
                                        <span key={topic} className="topic-tag">{topic}</span>
                                    ))}
                                </div>

                                <div className="project-footer">
                                    <div className="project-stats">
                                        <span>⭐ {project.stars}</span>
                                        <span>🔱 {project.forks}</span>
                                    </div>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                    >
                                        View →
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Projects;
