import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const API_BASE_URL = 'http://localhost:8000';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Check backend status on mount
    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const checkStatus = async () => {
        try {
            console.log('Checking backend status...');
            const response = await axios.get(`${API_BASE_URL}/api/chat/status`);
            console.log('Status response:', response.data);
            setIsInitialized(response.data.initialized);
            setError(null);
        } catch (err) {
            console.error('Failed to check status:', err);
            setError('Unable to connect to AI backend');
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);
        setError(null);

        try {
            console.log('Sending message:', inputMessage);
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: inputMessage
            });
            console.log('Chat response:', response.data);

            if (response.data.success) {
                const aiMessage = {
                    role: 'assistant',
                    content: response.data.response,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                console.error('API returned error:', response.data.error);
                setError(response.data.error || 'Failed to get response');
            }
        } catch (err) {
            console.error('Chat error:', err);
            console.error('Error details:', err.response?.data);
            setError(err.response?.data?.detail || 'Failed to send message. Make sure the backend is running on port 8000.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]);
        setError(null);
    };

    const suggestedQuestions = [
        "What are your main technical skills?",
        "Tell me about your AI projects",
        "What's your experience with machine learning?",
        "Show me your most recent projects"
    ];

    const handleSuggestionClick = (question) => {
        setInputMessage(question);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                className="chat-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                {isOpen ? '✕' : '⭐'}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Chat Header */}
                        <div className="chat-header">
                            <div className="chat-header-content">
                                <div className="chat-avatar-header">⭐</div>
                                <div>
                                    <h3>AI Assistant</h3>
                                    <p className="chat-status">
                                        {isInitialized ? (
                                            <>
                                                <span className="status-dot online"></span>
                                                Online
                                            </>
                                        ) : (
                                            <>
                                                <span className="status-dot"></span>
                                                Initializing...
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            {messages.length > 0 && (
                                <button className="clear-btn" onClick={clearChat} title="Clear chat">
                                    🗑️
                                </button>
                            )}
                        </div>

                        {/* Messages Container */}
                        <div className="chat-messages">
                            {messages.length === 0 ? (
                                <div className="chat-welcome">
                                    <div className="welcome-icon">⭐</div>
                                    <h4>Hi! I'm your AI assistant</h4>
                                    <p>Ask me anything about Sankalp's projects, skills, and experience!</p>

                                    <div className="suggested-questions-list">
                                        <p className="suggestions-label">Try asking:</p>
                                        {suggestedQuestions.map((question, idx) => (
                                            <motion.button
                                                key={idx}
                                                className="suggestion-btn"
                                                onClick={() => handleSuggestionClick(question)}
                                                whileHover={{ scale: 1.02, x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                💡 {question}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={`message ${message.role}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <div className="message-avatar">
                                                {message.role === 'user' ? '👤' : '⭐'}
                                            </div>
                                            <div className="message-content">
                                                <div className="message-text">{message.content}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}

                            {isLoading && (
                                <motion.div
                                    className="message assistant"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="message-avatar">⭐</div>
                                    <div className="message-content">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    className="error-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="chat-input-container">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Ask me anything..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={!isInitialized || isLoading}
                            />
                            <motion.button
                                className="send-btn"
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || !isInitialized || isLoading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🚀
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;

