import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Planet from './components/Planet';
import * as THREE from 'three';

// Custom component to handle the camera and controls logic
const CameraControls = ({ focusPosition }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // Set initial camera position and target to focus on the Sun
    camera.position.set(0, 100, 500);
  }, [camera]);

  useFrame(() => {
    if (focusPosition) {
      // Smoothly move the camera to follow the planet's position in each frame
      const targetPosition = new THREE.Vector3(focusPosition.x + 10, focusPosition.y + 10, focusPosition.z + 10);
      camera.position.lerp(targetPosition, 0.1); // Adjust the camera's position
      controlsRef.current.target.lerp(focusPosition, 0.1); // Adjust the controls' target
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan={true}
      enableZoom={true}
      minDistance={0}
      maxDistance={1000000}
      maxPolarAngle={Math.PI}
    />
  );
};


// Main SolarSystem component
const SolarSystem = () => {
  const [isTimeStopped, setIsTimeStopped] = useState(false); // State to track if time is stopped
  const [focusPosition, setFocusPosition] = useState(null);
  const [focus, setfocus] = useState('Sun');


  const toggleTime = () => {
    setIsTimeStopped(prevState => !prevState); // Toggle the state
  };

  const focusPlanet = (position) => {
    setFocusPosition(position);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 100, 500], fov: 90, near: 1, far: 1000000 }} style={{ height: "100vh", width: "100vw" }}>
        <ambientLight intensity={1} />
        <pointLight position={[25, 25, 25]} intensity={2} />

        <Planet
          orbitRadius={0}
          scale={100}
          modelPath="/models/Sun.gltf"
          texturePath="/textures/Sun.png"
          name="Sun"
          rotationSpeed={0.005}
          isTimeStopped={isTimeStopped} // Pass the state to Planet
          focusplanet={focusPlanet}
          focus={focus}
        />
        <Planet
          orbitRadius={831.4}
          scale={0.03504}
          modelPath="/models/Mercury.gltf"
          texturePath="/textures/Mercury.jpg"
          name="Mercury"
          rotationSpeed={0.015}
          isTimeStopped={isTimeStopped}
          focusplanet={focusPlanet}
          focus={focus}
        />
        <Planet
          orbitRadius={1550.6}
          scale={0.8691}
          modelPath="/models/Venus.gltf"
          texturePath="/textures/Venus.jpg"
          name="Venus"
          rotationSpeed={0.015}
          isTimeStopped={isTimeStopped}
          focusplanet={focusPlanet}
          focus={focus}
        />
        <Planet
          orbitRadius={2144.6}
          scale={0.9149}
          modelPath="/models/Earth.gltf"
          texturePath="/textures/Earth.jpg"
          name="Earth"
          rotationSpeed={0.01}
          isTimeStopped={isTimeStopped}
          focusplanet={focusPlanet}
          focus={focus}
        />
        <Planet
          orbitRadius={3273.5}
          scale={0.4868}
          modelPath="/models/Mars.gltf"
          texturePath="/textures/Mars.jpg"
          name="Mars"
          rotationSpeed={0.02}
          isTimeStopped={isTimeStopped}
          focusplanet={focusPlanet}
          focus={focus}
        />
        <Planet
          orbitRadius={11160.7}
          scale={10.0398}
          modelPath="/models/Jupiter.gltf"
          texturePath="/textures/Jupiter.jpg"
          name="Jupiter"
          rotationSpeed={0.005}
          isTimeStopped={isTimeStopped}
          focusplanet={focusPlanet}
          focus={focus}
        />

        {/* Camera and controls component */}
        <CameraControls focusPosition={focusPosition} />
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
      >
        {isTimeStopped ? 'Start Time' : 'Stop Time'}
      </button>
      <div className=' absolute top-24 flex flex-col left-5 gap-2'>
        <button onClick={()=>setfocus('Mercury')}>Mercury</button>
        <button onClick={()=>setfocus('Venus')}>Venus</button>
        <button onClick={()=>setfocus('Earth')}>Earth</button>
        <button onClick={()=>setfocus('Mars')}>Mars</button>
        <button onClick={()=>setfocus('Jupiter')}>Jupiter</button>
      </div>
    </>
  );
};

export default SolarSystem;
