import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Trail } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef();
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

function ShootingStar({ delay = 0 }) {
    const ref = useRef();
    const startTime = useRef(Date.now() + delay * 1000);
    const resetTime = useRef(5000 + Math.random() * 10000);

    useFrame(() => {
        const elapsed = Date.now() - startTime.current;

        if (elapsed > resetTime.current) {
            // Reset shooting star
            startTime.current = Date.now();
            resetTime.current = 5000 + Math.random() * 10000;
            ref.current.position.set(
                (Math.random() - 0.5) * 4,
                Math.random() * 2 + 1,
                (Math.random() - 0.5) * 2
            );
        }

        // Move the shooting star
        ref.current.position.x -= 0.01;
        ref.current.position.y -= 0.008;
    });

    return (
        <Trail
            width={0.15}
            length={5}
            color={new THREE.Color(0.8, 0.85, 1)}
            attenuation={(t) => t * t}
        >
            <mesh ref={ref} position={[(Math.random() - 0.5) * 4, Math.random() * 2 + 1, (Math.random() - 0.5) * 2]}>
                <sphereGeometry args={[0.003, 8, 8]} />
                <meshBasicMaterial color="#ffffcc" />
            </mesh>
        </Trail>
    );
}

function Comet({ delay = 0 }) {
    const ref = useRef();
    const startTime = useRef(Date.now() + delay * 1000);
    const resetTime = useRef(7000 + Math.random() * 15000);

    useFrame(() => {
        const elapsed = Date.now() - startTime.current;

        if (elapsed > resetTime.current) {
            // Reset comet
            startTime.current = Date.now();
            resetTime.current = 7000 + Math.random() * 15000;
            ref.current.position.set(
                Math.random() * 3 - 1.5,
                Math.random() * 2 + 1.5,
                (Math.random() - 0.5) * 3
            );
        }

        // Move the comet diagonally
        ref.current.position.x -= 0.015;
        ref.current.position.y -= 0.012;
    });

    return (
        <Trail
            width={0.25}
            length={6}
            color={new THREE.Color(0.6, 0.7, 0.9)}
            attenuation={(t) => {
                const s = 1 - t;
                return s * s;
            }}
        >
            <mesh ref={ref} position={[Math.random() * 3 - 1.5, Math.random() * 2 + 1.5, (Math.random() - 0.5) * 3]}>
                <sphereGeometry args={[0.004, 8, 8]} />
                <meshBasicMaterial color="#c8d5e8" />
            </mesh>
        </Trail>
    );
}

function Scene3D() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
                {/* Add 5 shooting stars with different delays */}
                <ShootingStar delay={0} />
                <ShootingStar delay={2} />
                <ShootingStar delay={4} />
                <ShootingStar delay={6} />
                <ShootingStar delay={8} />
                {/* Add 3 comets with different delays */}
                <Comet delay={1} />
                <Comet delay={5} />
                <Comet delay={9} />
            </Canvas>
        </div>
    );
}

export default Scene3D;
