import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = {
        'Programming': ['C', 'Python', 'JavaScript'],
        'Cloud & Deployment': ['AWS', 'Render', 'Docker', 'Git', 'Power BI'],
        'Backend & APIs': ['FastAPI', 'Anaconda'],
        'Data Science & ML': ['NumPy', 'Pandas', 'Plotly', 'Seaborn', 'Tableau', 'mlflow'],
        'Deep Learning': ['PyTorch', 'Scikit-learn', 'Keras', 'AutoGen'],
        'Databases': ['PostgreSQL', 'MySQL', 'SQLite'],
        'NLP & LLM': ['LangChain', 'LangSmith', 'LangGraph', 'MCP (Model Context Protocol)'],
        'Computer Vision': ['OpenCV', 'Streamlit'],
        'Version Control': ['GitHub', 'Postman']
    };

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
        <div className="about" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">About Me</h2>
                    <p className="section-subtitle">Building the future with AI</p>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-bio glass-card"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Sankalp Singh</h3>
                        <p className="bio-title">
                            AI/ML Engineer | GenAI Explorer
                        </p>
                        <p className="bio-subtitle">
                            Engineering the Future of Intelligent Systems
                        </p>
                        <p>
                            I engineer data-driven solutions with a specialized focus on machine learning pipelines,
                            scalable system design, and the practical application of generative AI. My work bridges
                            the gap between software engineering and applied ML—translating complex algorithms into
                            production-ready architectures that solve real-world problems.
                        </p>

                        <div className="focus-areas">
                            <h4>Expertise</h4>
                            <div className="expertise-item">
                                <strong>Generative AI & LLMs:</strong>
                                <p>Building intelligent systems powered by cutting-edge language models and GenAI workflows</p>
                            </div>
                            <div className="expertise-item">
                                <strong>MLOps & Automation:</strong>
                                <p>End-to-end ML pipelines, model optimization, and scalable deployment frameworks</p>
                            </div>
                            <div className="expertise-item">
                                <strong>Data Engineering:</strong>
                                <p>Robust data pipelines, analysis, and visualization for data-driven decision making</p>
                            </div>
                        </div>

                        <div className="open-to">
                            <h4>Collaboration</h4>
                            <p>
                                I am currently open to freelance projects, open-source collaborations, and research-driven
                                opportunities where engineering meets innovation.
                            </p>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-number">31</span>
                                <span className="stat-label">GitHub Repositories</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">4</span>
                                <span className="stat-label">Total GitHub Stars</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="skills-section"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <h3 className="skills-title">Technical Skills</h3>
                        <div className="skills-grid">
                            {Object.entries(skills).map(([category, items], index) => (
                                <motion.div
                                    key={category}
                                    className="skill-category glass-card"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <h4>{category}</h4>
                                    <div className="skill-tags">
                                        {items.map(skill => (
                                            <span key={skill} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
