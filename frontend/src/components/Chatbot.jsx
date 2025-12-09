import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m an AI assistant that can answer questions about Sankalp\'s projects and experience. Ask me anything!'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant',
                content: `I understand you're asking about "${input}". This is a demo response. In production, this would connect to the RAG-based chatbot API to provide detailed answers about Sankalp's projects, skills, and experience.`
            };
            setMessages(prev => [...prev, aiResponse]);
            setLoading(false);
        }, 1500);
    };

    const suggestedQuestions = [
        'What are your main areas of expertise?',
        'Tell me about your NLP projects',
        'What technologies do you use?',
        'Show me your computer vision work'
    ];

    return (
        <div className="chatbot" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title gradient-text">AI Assistant</h2>
                    <p className="section-subtitle">Ask me anything about my work</p>
                </motion.div>

                <motion.div
                    className="chat-container glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                className={`message ${message.role}`}
                                initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="message-avatar">
                                    {message.role === 'user' ? '👤' : '🤖'}
                                </div>
                                <div className="message-content">
                                    {message.content}
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <div className="message assistant">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="suggested-questions">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                className="suggested-question"
                                onClick={() => setInput(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    <form className="chat-input-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="input chat-input"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary send-button"
                            disabled={loading || !input.trim()}
                        >
                            Send
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Chatbot;
