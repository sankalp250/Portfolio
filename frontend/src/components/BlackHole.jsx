import './BlackHole.css';

const BlackHole = () => {
    // Generate radial streaks
    const streaks = [];
    for (let i = 0; i < 16; i++) {
        const angle = i * 22.5;
        const delay = i * 0.2;
        streaks.push(
            <div
                key={i}
                className="streak"
                style={{
                    transform: `rotate(${angle}deg) translateY(-50px)`,
                    animationDelay: `${delay}s`
                }}
            />
        );
    }

    // Generate orbiting particles
    const particles = [];
    for (let i = 0; i < 12; i++) {
        const angle = i * 30;
        const delay = i * 0.3;
        const duration = 3 + Math.random() * 2;
        particles.push(
            <div
                key={i}
                className="particle"
                style={{
                    '--angle': `${angle}deg`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}
            />
        );
    }

    return (
        <div className="black-hole-container">
            {/* Outer glow */}
            <div className="glow"></div>

            {/* Radial streaks */}
            <div className="streaks">
                {streaks}
            </div>

            <div className="black-hole">
                {/* Light jets */}
                <div className="light-jet jet-top"></div>
                <div className="light-jet jet-bottom"></div>

                {/* Accretion disk rings */}
                <div className="accretion-disk">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                </div>

                {/* Event horizon (black center) */}
                <div className="event-horizon"></div>

                {/* Orbiting particles */}
                <div className="particles">
                    {particles}
                </div>
            </div>
        </div>
    );
};

export default BlackHole;
