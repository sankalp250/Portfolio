import './MoonBackground.css';

const MoonBackground = () => {
    return (
        <div className="moon-background">
            {/* Moon */}
            <div className="moon"></div>

            {/* Stars */}
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            {/* Shooting stars */}
            <div className="shooting-star"></div>
            <div className="shooting-star" style={{ animationDelay: '2s', top: '30%' }}></div>
            <div className="shooting-star" style={{ animationDelay: '4s', top: '50%' }}></div>
            <div className="shooting-star" style={{ animationDelay: '6s', top: '70%' }}></div>
        </div>
    );
};

export default MoonBackground;
