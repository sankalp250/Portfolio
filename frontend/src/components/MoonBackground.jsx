import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './MoonBackground.css';

// Realistic Moon with better texture
function Moon() {
    const meshRef = useRef();

    // Create more realistic moon texture
    const { moonTexture, bumpMap } = useMemo(() => {
        const createTexture = (isBump) => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');

            if (isBump) {
                // Grayscale bump for subtle depth
                context.fillStyle = '#808080';
                context.fillRect(0, 0, 256, 256);
                for (let i = 0; i < 30; i++) {
                    const x = Math.random() * 256;
                    const y = Math.random() * 256;
                    const radius = Math.random() * 8 + 2;
                    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
                    gradient.addColorStop(0, '#606060');
                    gradient.addColorStop(1, '#808080');
                    context.fillStyle = gradient;
                    context.beginPath();
                    context.arc(x, y, radius, 0, Math.PI * 2);
                    context.fill();
                }
            } else {
                // More realistic moon color - soft gray with subtle variations
                const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 140);
                gradient.addColorStop(0, '#e0ddd5');
                gradient.addColorStop(0.4, '#c8c4bc');
                gradient.addColorStop(0.7, '#b0aca4');
                gradient.addColorStop(1, '#888580');
                context.fillStyle = gradient;
                context.fillRect(0, 0, 256, 256);

                // Subtle dark mare (seas)
                context.globalAlpha = 0.15;
                for (let i = 0; i < 8; i++) {
                    const x = Math.random() * 256;
                    const y = Math.random() * 256;
                    const radius = Math.random() * 25 + 10;
                    const craterGradient = context.createRadialGradient(x, y, 0, x, y, radius);
                    craterGradient.addColorStop(0, '#606060');
                    craterGradient.addColorStop(1, 'transparent');
                    context.fillStyle = craterGradient;
                    context.beginPath();
                    context.arc(x, y, radius, 0, Math.PI * 2);
                    context.fill();
                }
                context.globalAlpha = 1;
            }
            return new THREE.CanvasTexture(canvas);
        };

        return {
            moonTexture: createTexture(false),
            bumpMap: createTexture(true)
        };
    }, []);

    useEffect(() => {
        return () => {
            moonTexture.dispose();
            bumpMap.dispose();
        };
    }, [moonTexture, bumpMap]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <mesh ref={meshRef} position={[6, 1.5, -8]}>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshStandardMaterial
                map={moonTexture}
                bumpMap={bumpMap}
                bumpScale={0.02}
                roughness={1}
                metalness={0}
                emissive="#1a1a1a"
                emissiveIntensity={0.05}
            />
        </mesh>
    );
}

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

const MoonBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "default",
                    stencil: false
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[-10, 5, 5]} intensity={1.2} />
                <pointLight position={[6, 2, -6]} intensity={0.8} color="#ffffee" />

                <Stars
                    radius={100}
                    depth={50}
                    count={2000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.3}
                />

                <Moon />

                <ShootingStar delay={0} />
                <ShootingStar delay={3} />
                <ShootingStar delay={6} />
                <ShootingStar delay={9} />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
