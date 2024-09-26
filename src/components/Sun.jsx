import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Sun = () => {
    const sunRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Load the Sun model
    const gltf = useLoader(GLTFLoader, '/models/Sun.gltf'); // Path to your GLTF file

    // Load the Sun texture
    const sunTexture = useLoader(THREE.TextureLoader, '/textures/Sun.png'); // Path to your texture file

    useEffect(() => {
        if (gltf && gltf.scene) {
            const sunMesh = gltf.scene.children[0];

            // Apply the texture to the model's material
            sunMesh.material = new THREE.MeshStandardMaterial({
                map: sunTexture,        // Sun texture
                emissive: 0xffff00,     // Emissive color for glowing effect
                emissiveIntensity: 0.5, // Adjust intensity to get a glowing effect
            });

            sunRef.current = sunMesh; // Store the mesh in the ref
        }
    }, [gltf, sunTexture]);

    // Rotate the Sun on its own axis
    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.005; // Rotate Sun
        }
    });

    return (
        <>
            {sunRef.current && (
                <primitive
                    object={sunRef.current}
                    onPointerOver={() => setHovered(true)}   // Show name on hover
                    onPointerOut={() => setHovered(false)}   // Hide name when not hovering
                />
            )}
            {/* Display the name above the Sun when hovered */}
            {hovered && (
                <Html position={[0, 6, 0]} center>
                    <div className='text-white bg-black p-1 rounded text-xs'>
                        Sun
                    </div>
                </Html>
            )}
        </>
    );
};

export default Sun;
