import { Object3D } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

// Extend JSX.IntrinsicElements to include Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Basic Three.js elements
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>;
      bufferGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
      bufferAttribute: ReactThreeFiber.BufferAttributeNode<THREE.BufferAttribute, typeof THREE.BufferAttribute>;
      
      // Materials
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      pointsMaterial: ReactThreeFiber.MaterialNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>;
      
      // Geometries
      boxGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      
      // Lights
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      
      // Scene utilities
      color: ReactThreeFiber.Node<any, any>;
    }
  }
}
