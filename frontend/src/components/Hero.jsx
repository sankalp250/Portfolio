import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Scene3D from './3D/Scene3D';
import './Hero.css';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="hero">
            <Scene3D />

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
            >
                <motion.div className="hero-tag" variants={itemVariants}>
                    <span>AI ENGINEER</span>
                </motion.div>

                <motion.h1 className="hero-title" variants={itemVariants}>
                    <span className="gradient-text">Sankalp Singh</span>
                </motion.h1>

                <motion.p className="hero-subtitle" variants={itemVariants}>
                    Building intelligent systems with
                    <br />
                    <span className="highlight">Machine Learning</span> &{' '}
                    <span className="highlight">Deep Learning</span>
                </motion.p>

                <motion.p className="hero-description" variants={itemVariants}>
                    Specializing in Gen AI, Machine Learning, Data Science, and Agentic AI.
                    <br />
                    Transforming complex problems into elegant solutions.
                </motion.p>

                <motion.div className="hero-actions" variants={itemVariants}>
                    <motion.button
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Projects
                    </motion.button>
                    <motion.button
                        onClick={() => window.open('https://drive.google.com/file/d/1uE-OIIzMtXEre6l9OIM_iZwYGi0pj5oR/view?usp=sharing', '_blank')}
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📄 View Resume
                    </motion.button>
                    <motion.button
                        className="btn btn-ghost"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Get in Touch
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
