import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Earth = ({ orbitRadius }) => {
    const earthRef = useRef();
    const [angle, setAngle] = useState(0);
    const [hovered, setHovered] = useState(false);

    // Earth revolves around the Sun
    useFrame(() => {
        setAngle((prev) => prev + 0.01);
        earthRef.current.position.x = orbitRadius * Math.cos(angle);
        earthRef.current.position.z = orbitRadius * Math.sin(angle); // Orbit is on XZ plane
    });

    return (
        <mesh
            ref={earthRef}
            onPointerOver={() => setHovered(true)}   // Show name on hover
            onPointerOut={() => setHovered(false)}   // Hide name when not hovering
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={hovered ? 0x00ff00 : 0x0000ff} /> {/* Change color when hovered */}

            {/* Display the name above the Earth when hovered */}
            {hovered && (
                <Html position={[0, 1.5, 0]} center>
                    <div style={{ color: 'white', background: 'black', padding: '2px 4px', borderRadius: '3px' }}>
                        Earth
                    </div>
                </Html>
            )}
        </mesh>
    );
};


export default Earth