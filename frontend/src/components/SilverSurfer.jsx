import { motion } from 'framer-motion';
import './SilverSurfer.css';

const SilverSurfer = () => {
    return (
        <motion.div
            className="silver-surfer-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <motion.img
                src="/silver-surfer.png"
                alt="Silver Surfer"
                className="silver-surfer-image"
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <div className="silver-surfer-glow"></div>
        </motion.div>
    );
};

export default SilverSurfer;
