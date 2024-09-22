import React, { useRef, useState } from 'react';
import {  useFrame } from '@react-three/fiber';
import {  Html } from '@react-three/drei';

const Sun = () => {
    const sunRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Rotate the Sun on its own axis
    useFrame(() => {
        sunRef.current.rotation.y += 0.005;
    });

    return (
        <mesh
            ref={sunRef}
            onPointerOver={() => setHovered(true)}   // Show name on hover
            onPointerOut={() => setHovered(false)}   // Hide name when not hovering
        >
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial color={hovered ? 0xffa500 : 0xffff00} /> {/* Change color when hovered */}

            {/* Display the name above the Sun when hovered */}
            {hovered && (
                <Html position={[0, 6, 0]} center>
                    <div className='text-white bg-black p-1 rounded text-xs'>
                        Sun
                    </div>
                </Html>
            )}
        </mesh>
    );
};
export default Sun