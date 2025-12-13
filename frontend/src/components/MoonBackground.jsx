import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './MoonBackground.css';

// Simple rotating moon
function Moon() {
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={ref} position={[4, 0, -5]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
                color="#cccccc"
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}

// Shooting star
function Meteor({ delay = 0 }) {
    const ref = useRef();
    const startX = 15 + Math.random() * 10;
    const startY = -5 + Math.random() * 10;
    const startZ = -15 - Math.random() * 5;
    const speed = 0.1 + Math.random() * 0.05;

    useFrame((state) => {
        if (!ref.current) return;

        const elapsed = state.clock.elapsedTime - delay;
        if (elapsed < 0) return;

        // Calculate position
        const x = startX - elapsed * speed * 10;
        const y = startY - elapsed * speed * 5;

        // Reset when off screen
        if (x < -20) {
            ref.current.position.set(startX, startY, startZ);
        } else {
            ref.current.position.set(x, y, startZ);
        }
    });

    return (
        <group ref={ref} position={[startX, startY, startZ]}>
            <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, -0.785]}>
                <coneGeometry args={[0.02, 0.5, 8]} />
                <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

const MoonBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{ antialias: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[-5, 5, 5]} intensity={1.2} />
                <pointLight position={[4, 0, -4]} intensity={0.6} color="#ffffcc" />

                {/* Moon */}
                <Moon />

                {/* Meteors */}
                <Meteor delay={0} />
                <Meteor delay={1} />
                <Meteor delay={2} />
                <Meteor delay={3} />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
