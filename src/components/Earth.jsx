import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { Html } from '@react-three/drei';

const Earth = ({ orbitRadius, scale }) => {
    const earthRef = useRef();
    const [angle, setAngle] = useState(0);
    const [hovered, setHovered] = useState(false);


    // Load the GLTF model
    const gltf = useLoader(GLTFLoader, '/models/Earth.gltf'); // Path to your GLTF file

    // Load the Earth texture
    const earthTexture = useLoader(THREE.TextureLoader, '/textures/Earth.jpg'); // Path to your texture file

    useEffect(() => {
        if (gltf && gltf.scene) {
            const earthMesh = gltf.scene.children[0];

            console.log('Loaded GLTF Model:', gltf.scene); // Debugging: Check the loaded model structure

            // Apply the texture to the model's material
            earthMesh.material = new THREE.MeshStandardMaterial({
                map: earthTexture,        // Earth texture
                metalness: 0,             // No metalness for Earth
                roughness: 0.7,           // Moderate roughness for natural appearance
                side: THREE.DoubleSide,   // Ensure material is double-sided
            });

            // Set the Earth model's scale and position
            earthMesh.scale.set(scale, scale, scale);
            earthMesh.position.set(0, 0, 0);

            // Add the model to the scene
            earthRef.current = earthMesh; // Store the mesh in the ref
        }
    }, [gltf, earthTexture]);

    useFrame(() => {
        setAngle((prev) => prev + 0.01);

        // Update position for orbiting around the Sun
        if (earthRef.current) {
            earthRef.current.position.x = orbitRadius * Math.cos(angle);
            earthRef.current.position.z = orbitRadius * Math.sin(angle); // Orbit is on XZ plane

            // Rotate Earth on its axis
            earthRef.current.rotation.y += 0.01; // Rotate around the Y-axis

        }
    });

    return (
        <>
            {earthRef.current && <primitive object={earthRef.current}
                onPointerOver={() => setHovered(true)}   // Show name on hover
                onPointerOut={() => setHovered(false)}>
                {hovered && (
                    <Html position={[0, 1.5, 0]} center>
                        <div className='text-white bg-black p-1 rounded text-xs'>
                            Earth
                        </div>
                    </Html>
                )}
            </primitive>}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-10, 10, 10]} intensity={1} />
            <Environment preset="city" />

        </>
    );
};

export default Earth;
