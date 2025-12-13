import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './MoonBackground.css';

// Realistic Moon with procedural texture
function Moon() {
    const meshRef = useRef();

    // Create realistic moon texture procedurally
    const moonTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext('2d');

        // Base moon color
        const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(0.5, '#d4d4d4');
        gradient.addColorStop(1, '#999999');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 512, 512);

        // Add craters
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = Math.random() * 20 + 5;

            const craterGradient = context.createRadialGradient(x, y, 0, x, y, radius);
            craterGradient.addColorStop(0, '#888888');
            craterGradient.addColorStop(0.5, '#aaaaaa');
            craterGradient.addColorStop(1, 'transparent');

            context.fillStyle = craterGradient;
            context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        }

        // Add surface details
        context.globalAlpha = 0.1;
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 3 + 1;
            context.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#666666';
            context.fillRect(x, y, size, size);
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    // Create bump map for surface detail
    const bumpMap = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext('2d');

        // Gray background
        context.fillStyle = '#808080';
        context.fillRect(0, 0, 512, 512);

        // Add bumps
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = Math.random() * 15 + 3;

            const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#000000');

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={meshRef} position={[6, 1, -8]} castShadow>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshStandardMaterial
                map={moonTexture}
                bumpMap={bumpMap}
                bumpScale={0.05}
                roughness={0.9}
                metalness={0}
                emissive="#1a1a1a"
                emissiveIntensity={0.1}
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
                <ambientLight intensity={0.4} />
                <directionalLight position={[-10, 5, 5]} intensity={1.5} castShadow />
                <pointLight position={[6, 1, -7]} intensity={1} color="#ffffee" />

                {/* 5000 Stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Realistic Moon */}
                <Moon />

                {/* Shooting Stars */}
                <ShootingStar delay={0} />
                <ShootingS tar delay={2} />
                <ShootingStar delay={4} />
                <ShootingStar delay={6} />
                <ShootingStar delay={8} />
                <ShootingStar delay={10} />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
