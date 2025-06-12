'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface SceneProps {
  className?: string;
}

export const ThreeDScene: React.FC<SceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    mouseX: number;
    mouseY: number;
    targetX: number;
    targetY: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Set up renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Create random particles in a 3D space
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50; // -25 to 25
    }
    
    // Randomize particle sizes
    for (let i = 0; i < particlesCount; i++) {
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material with custom shader
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float opacity = 1.0 - smoothstep(0.4, 0.5, distance);
          
          // Create a subtle color gradient based on position
          vec3 color = vec3(0.4, 0.6, 0.9) + vPosition.xyz * 0.015;
          
          gl_FragColor = vec4(color, opacity * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Mouse movement tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const updateMousePosition = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth follow with easing
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      // Rotate particles
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      // Move particles based on mouse position with damping
      particles.rotation.x += (targetY - particles.rotation.x) * 0.02;
      particles.rotation.y += (targetX - particles.rotation.y) * 0.02;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Store scene objects in ref for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      mouseX: 0,
      mouseY: 0,
      targetX: 0,
      targetY: 0,
    };
    
    // Initial animation
    gsap.fromTo(
      particles.rotation,
      { x: -1, y: -1 },
      { x: 0, y: 0, duration: 2.5, ease: 'power4.out' }
    );
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateMousePosition);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`} 
    />
  );
};

// Scrolling stars background
export const StarfieldBackground: React.FC<SceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    stars: THREE.Points;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    
    const positions = new Float32Array(starsCount * 3);
    const velocities = new Float32Array(starsCount);
    const sizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Spread stars in cube
      positions[i3] = Math.random() * 600 - 300; // x
      positions[i3 + 1] = Math.random() * 600 - 300; // y
      positions[i3 + 2] = Math.random() * 600 - 300; // z
      
      // Random speed
      velocities[i] = Math.random() * 0.2 + 0.1;
      
      // Random size
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create material with custom shader
    const starsMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float velocity;
        attribute float size;
        varying float vAlpha;
        
        void main() {
          vAlpha = size * 0.4;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float opacity = 1.0 - smoothstep(0.1, 0.5, distance);
          gl_FragColor = vec4(1.0, 1.0, 1.0, opacity * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    let scrollSpeed = 0;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      scrollSpeed = (st - lastScrollTop) * 0.01;
      lastScrollTop = st;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      const positionAttribute = starsGeometry.getAttribute('position') as THREE.BufferAttribute;
      const velocityAttribute = starsGeometry.getAttribute('velocity') as THREE.BufferAttribute;
      
      for (let i = 0; i < starsCount; i++) {
        const i3 = i * 3;
        
        // Move stars based on velocity
        positionAttribute.array[i3 + 2] += velocityAttribute.array[i] + scrollSpeed * 2;
        
        // Reset position when star passes camera
        if (positionAttribute.array[i3 + 2] > camera.position.z + 300) {
          positionAttribute.array[i3 + 2] = camera.position.z - 300;
          positionAttribute.array[i3] = Math.random() * 600 - 300;
          positionAttribute.array[i3 + 1] = Math.random() * 600 - 300;
        }
        
        // Reset position when star falls behind camera
        if (positionAttribute.array[i3 + 2] < camera.position.z - 300) {
          positionAttribute.array[i3 + 2] = camera.position.z + 300;
          positionAttribute.array[i3] = Math.random() * 600 - 300;
          positionAttribute.array[i3 + 1] = Math.random() * 600 - 300;
        }
      }
      
      positionAttribute.needsUpdate = true;
      
      // Slowly normalize scroll speed back to 0
      scrollSpeed *= 0.95;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Store scene objects in ref for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      stars,
    };
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(stars);
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`} 
    />
  );
};
