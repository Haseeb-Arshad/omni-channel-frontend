import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Import React Three Fiber and Drei with dynamic imports to prevent SSR issues
let Canvas: any, useFrame: any, useThree: any;
let OrbitControls: any;
let EffectComposer: any, Bloom: any, DepthOfField: any;

// Dynamic imports for React Three Fiber and related libraries
if (typeof window !== 'undefined') {
  try {
    const R3F = require('@react-three/fiber');
    Canvas = R3F.Canvas;
    useFrame = R3F.useFrame;
    useThree = R3F.useThree;

    const Drei = require('@react-three/drei');
    OrbitControls = Drei.OrbitControls;

    const Postprocessing = require('@react-three/postprocessing');
    EffectComposer = Postprocessing.EffectComposer;
    Bloom = Postprocessing.Bloom;
    DepthOfField = Postprocessing.DepthOfField;
  } catch (error) {
    console.error('Error importing React Three Fiber packages:', error);
  }
}

interface ThreeDSceneProps {
  className?: string;
}

// Main 3D Scene component
export const ThreeDScene: React.FC<ThreeDSceneProps> = ({ className }) => {
  // If any required components aren't available, render a fallback
  if (!Canvas || !OrbitControls || !EffectComposer) {
    return <div className={`w-full h-full ${className}`} />;
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35 }}>
        <color attach="background" args={['#050816']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <FloatingCube position={[0, 0, 0]} />
        <FloatingCube position={[-10, -4, -10]} rotation={[0.5, 0.5, 0]} scale={2} />
        <FloatingCube position={[10, 5, -15]} rotation={[0.2, 0.3, 0.1]} scale={1.5} />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} 
          autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.1} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={5} height={480} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

// Starfield Background
export const StarfieldBackground: React.FC<ThreeDSceneProps> = ({ className }) => {
  // If Canvas isn't available, render a fallback
  if (!Canvas) {
    return <div className={`w-full h-full ${className}`} />;
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
};

// Animated stars component
const Stars = () => {
  const ref = useRef<THREE.Points>(null);
  const { viewport, clock } = useThree();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() / 10) * 0.2;
      ref.current.rotation.y = Math.cos(clock.getElapsedTime() / 10) * 0.2;
    }
  });
  
  const count = 5000;
  const positions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} sizeAttenuation color="#ffffff" />
    </points>
  );
};

// Animated floating cube component
const FloatingCube = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Gentle floating animation
    mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    mesh.current.rotation.x = rotation[0] + state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = rotation[1] + state.clock.getElapsedTime() * 0.3;
  });
  
  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#8860e6" 
        metalness={0.7}
        roughness={0.2} 
        envMapIntensity={0.8}
      />
    </mesh>
  );
};
