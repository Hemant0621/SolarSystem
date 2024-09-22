import React from 'react';
import * as THREE from 'three';

const OrbitPath = ({ radius }) => {
    const points = [];
    const segments = 100; // Number of segments for a smooth circle

    // Generate points for the orbit path (circular path on XZ plane)
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI; // Angle for each point
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z)); // Orbit path on the XZ plane
    }

    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={pathGeometry}>
            <lineBasicMaterial color={0x000000} linewidth={10} />
        </line>
    );
};

export default OrbitPath