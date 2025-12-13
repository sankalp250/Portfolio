import './BlackHole.css';

const BlackHole = () => {
    return (
        <div className="black-hole-container">
            {/* Core black hole */}
            <div className="black-hole">
                {/* Event horizon */}
                <div className="event-horizon"></div>

                {/* Accretion disk rings */}
                <div className="accretion-disk">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                </div>

                {/* Light beams/jets */}
                <div className="light-jet jet-top"></div>
                <div className="light-jet jet-bottom"></div>

                {/* Glow effect */}
                <div className="glow"></div>
            </div>

            {/* Particles being pulled in */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            '--delay': `${i * 0.5}s`,
                            '--angle': `${i * 18}deg`,
                            '--distance': `${100 + Math.random() * 100}px`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default BlackHole;
