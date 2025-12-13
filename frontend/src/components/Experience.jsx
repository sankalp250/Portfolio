import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeTab, setActiveTab] = useState('academic');

    const academic = [
        {
            degree: 'B.Tech in Computer Science and Engineering',
            institution: 'UEM Jaipur, Jaipur, India',
            duration: '2022 – 2026 (Expected)',
            grade: 'CGPA: 8.0 (6th Semester)'
        },
        {
            degree: 'Class XII (CBSE)',
            institution: 'Arcadia Academy, Kota, India',
            duration: '2021',
            grade: 'Percentage: 73.5%'
        },
        {
            degree: 'Class X (ICSE)',
            institution: 'M.C. Kejriwal Vidyapeeth, Kolkata, India',
            duration: '2019',
            grade: 'Percentage: 80%'
        }
    ];

    const professional = [
        {
            company: 'Prodigy Infotech',
            role: 'Machine Learning Intern',
            duration: 'Jul 2024 – Aug 2024',
            location: 'Remote'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
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
                    <p className="section-subtitle">My journey in the academic & professional front</p>
                </motion.div>

                {/* Tab Selector */}
                <motion.div
                    className="experience-tabs"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        className={`tab ${activeTab === 'academic' ? 'active' : ''}`}
                        onClick={() => setActiveTab('academic')}
                    >
                        🎓 Academic
                    </button>
                    <button
                        className={`tab ${activeTab === 'professional' ? 'active' : ''}`}
                        onClick={() => setActiveTab('professional')}
                    >
                        💼 Professional
                    </button>
                </motion.div>

                {/* Academic Content */}
                {activeTab === 'academic' && (
                    <motion.div
                        className="experience-timeline"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key="academic"
                    >
                        {academic.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="experience-card glass-card"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="timeline-dot"></div>
                                <div className="experience-header">
                                    <div className="experience-title-section">
                                        <h3>{edu.degree}</h3>
                                        <h4 className="institution-name">{edu.institution}</h4>
                                    </div>
                                    <div className="experience-meta">
                                        <span className="duration">📅 {edu.duration}</span>
                                        <span className="grade">{edu.grade}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Professional Content */}
                {activeTab === 'professional' && (
                    <motion.div
                        className="experience-timeline"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key="professional"
                    >
                        {professional.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="experience-card glass-card"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="timeline-dot"></div>
                                <div className="experience-header">
                                    <div className="experience-title-section">
                                        <h3>{exp.role}</h3>
                                        <h4 className="institution-name">{exp.company}</h4>
                                    </div>
                                    <div className="experience-meta">
                                        <span className="duration">📅 {exp.duration}</span>
                                        <span className="location">📍 {exp.location}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Experience;
