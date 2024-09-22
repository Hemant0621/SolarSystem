import React from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import Sun from './components/Sun';
import Earth from './components/Earth';
import OrbitPath from './components/OrbitControl';



// Main SolarSystem component
const SolarSystem = () => {
  const orbitRadius = 30;

  return (
    <Canvas camera={{ position: [0, 20, 50], fov: 75 }} style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sun />
      <OrbitPath radius={orbitRadius} />
      <Earth orbitRadius={orbitRadius} />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default SolarSystem;
