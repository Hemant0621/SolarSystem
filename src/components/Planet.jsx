import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Planet = ({ orbitRadius, scale, modelPath, texturePath, name, rotationSpeed, isTimeStopped, focusplanet , focus=false }) => {
    const planetRef = useRef();
    const [angle, setAngle] = useState(0);
    const [hovered, setHovered] = useState(false);

    const gltf = useLoader(GLTFLoader, modelPath);

    // Load the planet texture
    const planetTexture = useLoader(THREE.TextureLoader, texturePath);

    useEffect(() => {
        if (gltf && gltf.scene) {
            const planetMesh = gltf.scene.children[0];

            // Apply the texture to the model's material
            planetMesh.material = new THREE.MeshStandardMaterial({
                map: planetTexture,
                metalness: 0,
                roughness: 0.7,
                side: THREE.DoubleSide,
            });

            // Set the planet model's scale and position
            planetMesh.scale.set(scale, scale, scale);
            planetMesh.position.set(0, 0, 0);

            planetRef.current = planetMesh; // Store the mesh in the ref
        }
    }, [gltf, planetTexture]);

    useFrame(() => {
        if (planetRef.current && !isTimeStopped) {
            setAngle((prev) => prev + 0.01);
            planetRef.current.position.x = orbitRadius * Math.cos(angle);
            planetRef.current.position.z = orbitRadius * Math.sin(angle);
            planetRef.current.rotation.y += rotationSpeed; // Rotate around its axis
        }
    });

    useEffect(()=>{
        if(focus){
            focusplanet(planetRef.current.position)
        }
    },[focus])

    const points = [];
    const segments = 100; // Number of segments for a smooth circle

    // Generate points for the orbit path (circular path on XZ plane)
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI; // Angle for each point
        const x = orbitRadius * Math.cos(theta);
        const z = orbitRadius * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z)); // Orbit path on the XZ plane
    }

    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);


    return (
        <>
            {planetRef.current && (
                <primitive
                    object={planetRef.current}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <Html position={[0, 1.5, 0]} center>
                        <div className='text-black cursor-pointer p-1 rounded text-xs'>
                            {name}
                        </div>
                    </Html>

                </primitive>
            )}
            <line geometry={pathGeometry}>
                <lineBasicMaterial color={0x000000} linewidth={10} />
            </line>
        </>
    );
};

export default Planet;
