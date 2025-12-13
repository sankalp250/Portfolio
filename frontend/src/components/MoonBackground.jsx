import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
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

// Fixed stars implementation
function Stars() {
    const points = useMemo(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 50;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        return geometry;
    }, []);

    return (
        <points geometry={points}>
            <pointsMaterial size={0.05} color="white" sizeAttenuation />
        </points>
    );
}

// Shooting star
function Meteor({ startDelay = 0 }) {
    const ref = useRef();
    const trailRef = useRef();
    const speedRef = useRef(0.1 + Math.random() * 0.05);
    const initialized = useRef(false);

    useFrame(() => {
        if (!ref.current || !trailRef.current) return;

        // Initialize position
        if (!initialized.current) {
            ref.current.position.set(
                15 + Math.random() * 10,
                -5 + Math.random() * 10,
                -15 - Math.random() * 5
            );
            trailRef.current.position.copy(ref.current.position);
            initialized.current = true;
        }

        // Move
        ref.current.position.x -= speedRef.current;
        ref.current.position.y -= speedRef.current * 0.5;

        // Trail follows
        trailRef.current.position.x = ref.current.position.x + 0.3;
        trailRef.current.position.y = ref.current.position.y + 0.15;
        trailRef.current.position.z = ref.current.position.z;

        // Reset when off screen
        if (ref.current.position.x < -20) {
            ref.current.position.set(
                15 + Math.random() * 10,
                -5 + Math.random() * 10,
                -15 - Math.random() * 5
            );
            speedRef.current = 0.1 + Math.random() * 0.05;
        }
    });

    return (
        <group>
            <mesh ref={ref}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh ref={trailRef} rotation={[0, 0, -0.785]}>
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
                <ambientLight intensity={0.3} />
                <directionalLight position={[-5, 5, 5]} intensity={1} />
                <pointLight position={[4, 0, -4]} intensity={0.5} color="#ffffcc" />

                <Stars />
                <Moon />
                <Meteor startDelay={0} />
                <Meteor startDelay={1} />
                <Meteor startDelay={2} />
                <Meteor startDelay={3} />
            </Canvas>
        </div>
    );
};

export default MoonBackground;
