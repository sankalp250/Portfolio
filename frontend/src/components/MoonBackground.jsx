import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './MoonBackground.css';

// Rotating Moon
function Moon() {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={meshRef} position={[6, 1, -8]} castShadow>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
                color="#d4d4d4"
                roughness={0.95}
                metalness={0.05}
                emissive="#2a2a2a"
                emissiveIntensity={0.15}
            />
        </mesh>
    );
}

// Shooting Star with trail
function ShootingStar({ delay = 0 }) {
    const headRef = useRef();
    const trailRef = useRef();

    useFrame((state) => {
        if (!headRef.current || !trailRef.current) return;

        const t = state.clock.elapsedTime - delay;
        if (t < 0) return;

        // Calculate position
        const speed = 0.15;
        const x = 25 - (t * speed * 10) % 50;
        const y = 10 - (t * speed * 5) % 25;
        const z = -20 - (Math.random() * 5);

        headRef.current.position.set(x, y, z);
        trailRef.current.position.set(x + 0.5, y + 0.25, z);
    });

    return (
        <group>
            <mesh ref={headRef}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh ref={trailRef} rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.03, 0.8, 8]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </group>
    );
}

const MoonBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[-10, 5, 5]} intensity={1.2} />
                <pointLight position={[6, 1, -7]} intensity={0.8} color="#ffffee" />

                {/* 5000 Stars using drei helper */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Moon */}
                <Moon />

                {/* Shooting Stars */}
                <ShootingStar delay={0} />
                <ShootingStar delay={2} />
                <ShootingStar delay={4} />
                <ShootingStar delay={6} />
                <ShootingStar delay={8} />
                <ShootingStar delay={10} />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
