import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/sankalp250',
            icon: '💻'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/sankalp-singh-35b827250/',
            icon: '💼'
        },
        {
            name: 'Email',
            url: 'mailto:sankalpsingh2595@gmail.com',
            icon: '📧'
        },
        {
            name: 'Phone',
            url: 'tel:+919691434226',
            icon: '📱',
            display: '+91 96914 34226'
        },
        {
            name: 'Twitter',
            url: 'https://x.com/BunnySi79810067',
            icon: '🐦'
        }
    ];

    return (
        <div className="contact" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">Get In Touch</h2>
                    <p className="section-subtitle">Let's build something amazing together</p>
                </motion.div>

                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <div className="contact-info glass-card">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always open to discussing new projects, creative ideas,
                            or opportunities to be part of your vision. Feel free to reach out!
                        </p>

                        <div className="social-links">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target={link.name === 'Phone' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <span className="social-icon">{link.icon}</span>
                                    <span className="social-name">{link.display || link.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="location-section glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        <h3>📍 Location</h3>
                        <p className="location-text">Kolkata, West Bengal, India</p>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471218.38540763664!2d88.04952462343744!3d22.67548464628324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1734028071272!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Kolkata Location"
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.footer
                    className="footer"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <p>Created by Sankalp Singh. Built with React, Three.js & Framer Motion.</p>
                </motion.footer>
            </div>
        </div>
    );
};

export default Contact;
