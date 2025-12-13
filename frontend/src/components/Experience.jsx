import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const experiences = [
        {
            company: 'Prodigy Infotech',
            role: 'Machine Learning Intern',
            duration: 'Jul 2024 – Aug 2024',
            location: 'Remote',
            achievements: [
                'Developed and optimized machine learning models for regression, classification, and clustering using Python and Scikit-learn, improving accuracy by 15% through feature engineering and hyperparameter tuning.',
                'Engineered features from raw datasets to enhance model performance and deployed predictive models to address real business problems.',
                'Implemented NLP techniques for text classification, achieving 92% accuracy on a dataset of 10,000+ entries and presenting insights to stakeholders.'
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        <div className="experience" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">Experience</h2>
                    <p className="section-subtitle">Professional journey and achievements</p>
                </motion.div>

                <motion.div
                    className="experience-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-card glass-card"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <div className="experience-header">
                                <div className="experience-title-section">
                                    <h3>{exp.role}</h3>
                                    <h4 className="company-name">{exp.company}</h4>
                                </div>
                                <div className="experience-meta">
                                    <span className="duration">{exp.duration}</span>
                                    <span className="location">📍 {exp.location}</span>
                                </div>
                            </div>

                            <ul className="achievements-list">
                                {exp.achievements.map((achievement, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                    >
                                        {achievement}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Experience;
