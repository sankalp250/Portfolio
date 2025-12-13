import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';
import './MoonBackground.css';

// Shooting Star
function ShootingStar({ delay = 0 }) {
    const headRef = useRef();
    const trailRef = useRef();

    useFrame((state) => {
        if (!headRef.current || !trailRef.current) return;
        const t = state.clock.elapsedTime - delay;
        if (t < 0) return;

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
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh ref={trailRef} rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.02, 0.4, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

const StarsBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    stencil: false
                }}
            >
                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.3}
                />

                <ShootingStar delay={0} />
                <ShootingStar delay={3} />
                <ShootingStar delay={6} />
                <ShootingStar delay={9} />
            </Canvas>
        </div>
    );
};

export default StarsBackground;
