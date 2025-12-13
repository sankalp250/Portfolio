import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './MoonBackground.css';

// Animated Moon Component
function Moon() {
    const meshRef = useRef();

    // Rotate moon slowly
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <Sphere ref={meshRef} args={[2, 64, 64]} position={[5, 2, -10]}>
            <meshStandardMaterial
                color="#e8e8e8"
                roughness={0.9}
                metalness={0.1}
                emissive="#404040"
                emissiveIntensity={0.1}
            />
        </Sphere>
    );
}

// Shooting Stars/Meteors Component
function ShootingStars() {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((star, i) => {
                star.position.x -= 0.1 + i * 0.01;
                star.position.y -= 0.05 + i * 0.005;

                // Reset position when off screen
                if (star.position.x < -50) {
                    star.position.x = 50;
                    star.position.y = Math.random() * 20 - 10;
                    star.position.z = Math.random() * -20 - 5;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {[...Array(5)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.random() * 50 - 25,
                        Math.random() * 20 - 10,
                        Math.random() * -20 - 5
                    ]}
                >
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            ))}
        </group>
    );
}

// Main MoonBackground Component
const MoonBackground = () => {
    return (
        <div className="moon-background">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Ambient light for overall illumination */}
                <ambientLight intensity={0.3} />

                {/* Directional light to simulate sun */}
                <directionalLight position={[-5, 3, 5]} intensity={1} />

                {/* Point light for moon glow */}
                <pointLight position={[5, 2, -10]} intensity={0.5} color="#ffffff" />

                {/* Stars background */}
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

                {/* Shooting stars/meteors */}
                <ShootingStars />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
