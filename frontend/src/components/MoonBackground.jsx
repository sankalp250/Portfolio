import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './MoonBackground.css';

// Procedural moon with craters using noise
function Moon() {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation
            meshRef.current.rotation.y += 0.0005;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[6, 1, -8]} castShadow>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
                ref={materialRef}
                color="#d4d4d4"
                roughness={0.95}
                metalness={0.05}
                emissive="#2a2a2a"
                emissiveIntensity={0.15}
                displacementScale={0.15}
            />
        </mesh>
    );
}

// Starfield with depth
function StarField() {
    const starsRef = useRef();

    useFrame((state) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
        }
    });

    const starPositions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
        const i3 = i * 3;
        const radius = 50 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi) - 30;
    }

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={3000}
                    array={starPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Realistic shooting stars with trails
function ShootingStar({ index }) {
    const meshRef = useRef();
    const tailRef = useRef();
    const speed = useRef(0.15 + Math.random() * 0.1);
    const reset = useRef(false);

    useFrame(() => {
        if (meshRef.current && tailRef.current) {
            if (!reset.current) {
                // Initial random position
                meshRef.current.position.set(
                    20 + Math.random() * 20,
                    -5 + Math.random() * 15,
                    -20 + Math.random() * 10
                );
                tailRef.current.position.copy(meshRef.current.position);
                reset.current = true;
            }

            // Move diagonally
            meshRef.current.position.x -= speed.current;
            meshRef.current.position.y -= speed.current * 0.5;

            // Update tail to follow
            tailRef.current.position.x = meshRef.current.position.x + 0.5;
            tailRef.current.position.y = meshRef.current.position.y + 0.25;
            tailRef.current.position.z = meshRef.current.position.z;

            // Reset when off screen
            if (meshRef.current.position.x < -30) {
                meshRef.current.position.set(
                    20 + Math.random() * 20,
                    -5 + Math.random() * 15,
                    -20 + Math.random() * 10
                );
                tailRef.current.position.copy(meshRef.current.position);
                speed.current = 0.15 + Math.random() * 0.1;
            }
        }
    });

    return (
        <group>
            {/* Star head */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Trail */}
            <mesh ref={tailRef} rotation={[0, 0, -Math.PI / 4]}>
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

// Meteors group
function Meteors() {
    return (
        <group>
            {[...Array(6)].map((_, i) => (
                <ShootingStar key={i} index={i} />
            ))}
        </group>
    );
}

// Main scene
const MoonBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {/* Lighting setup */}
                    <ambientLight intensity={0.2} />
                    <directionalLight
                        position={[-10, 5, 5]}
                        intensity={1.2}
                        castShadow
                    />
                    <pointLight
                        position={[6, 1, -7]}
                        intensity={0.8}
                        color="#ffffee"
                        distance={15}
                    />

                    {/* Scene elements */}
                    <StarField />
                    <Moon />
                    <Meteors />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default MoonBackground;
