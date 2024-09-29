import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Planet from './components/Planet';

const SolarSystem = () => {
  const [isTimeStopped, setIsTimeStopped] = useState(false);

  const toggleTime = () => {
    setIsTimeStopped(prevState => !prevState); 
  };

  return (
    <>
      <Canvas 
        camera={{ position: [0, 100, 500], fov: 75, far: 10000 }} 
        style={{ height: "100vh", width: "100vw" }}
      >
        <ambientLight />
        <pointLight position={[25, 25, 25]} intensity={1} />
        
        <Planet
          orbitRadius={0}
          scale={10}
          modelPath="/models/Sun.gltf"
          texturePath="/textures/Sun.png"
          name="Sun"
          rotationSpeed={0.005}
          isTimeStopped={isTimeStopped} 
        />
        <Planet
          orbitRadius={83.14}
          scale={0.003504}
          modelPath="/models/Mercury.gltf"
          texturePath="/textures/Mercury.jpg"
          name="Mercury"
          rotationSpeed={0.015}
          isTimeStopped={isTimeStopped}
        />
        <Planet
          orbitRadius={155.06}
          scale={0.08691}
          modelPath="/models/Venus.gltf"
          texturePath="/textures/Venus.jpg"
          name="Venus"
          rotationSpeed={0.015}
          isTimeStopped={isTimeStopped}
        />
        <Planet
          orbitRadius={214.46}
          scale={0.09149}
          modelPath="/models/Earth.gltf"
          texturePath="/textures/Earth.jpg"
          name="Earth"
          rotationSpeed={0.01}
          isTimeStopped={isTimeStopped}
        />
        <Planet
          orbitRadius={327.35}
          scale={0.04868}
          modelPath="/models/Mars.gltf"
          texturePath="/textures/Mars.jpg"
          name="Mars"
          rotationSpeed={0.02}
          isTimeStopped={isTimeStopped}
        />
        <Planet
          orbitRadius={1116.07}
          scale={1.00398}
          modelPath="/models/Jupiter.gltf"
          texturePath="/textures/Jupiter.jpg"
          name="Jupiter"
          rotationSpeed={0.005}
          isTimeStopped={isTimeStopped}
        />
        <OrbitControls 
          maxPolarAngle={Math.PI / 2} 
          minDistance={50}             
          maxDistance={3000}           
        />
      </Canvas>
      <button 
        onClick={toggleTime} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        className='cursor-pointer'
      >
        {isTimeStopped ? 'Start Time' : 'Stop Time'}
      </button>
    </>
  );
};

export default SolarSystem;