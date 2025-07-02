import React, { useEffect, useState } from 'react';

interface BackgroundProps {
  className?: string;
}

/**
 * A lightweight CSS-based starfield background
 */
export const StarfieldBackground: React.FC<BackgroundProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Return empty div on server-side rendering
  if (!isMounted) {
    return <div className={`w-full h-full ${className}`}></div>;
  }
  
  return (
    <div className={`star-background w-full h-full overflow-hidden ${className}`}>
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>
    </div>
  );
};

/**
 * A lightweight CSS-based animated background with geometric shapes
 */
export const GeometricBackground: React.FC<BackgroundProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Return empty div on server-side rendering
  if (!isMounted) {
    return <div className={`w-full h-full ${className}`}></div>;
  }
  
  return (
    <div className={`geometric-background w-full h-full ${className}`}>
      {/* Generate shapes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i} 
          className="geometric-shape" 
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.15
          }}
        />
      ))}
    </div>
  );
};

/**
 * Device performance detector to decide whether to use 3D or fallback
 */
export const useDevicePerformance = () => {
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(true);
  
  useEffect(() => {
    // Check for device capabilities
    const checkDevicePerformance = () => {
      // Check for mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Simple benchmark (requestAnimationFrame rate)
      let fps = 0;
      let lastLoop = performance.now();
      let count = 0;
      let totalFps = 0;
      
      const measureFps = (highResTimestamp: number) => {
        // Calculate fps
        const currentLoop = performance.now();
        if (lastLoop) {
          fps = 1000 / (currentLoop - lastLoop);
          if (fps < 60) {
            count++;
            totalFps += fps;
          }
        }
        lastLoop = currentLoop;
        
        if (count < 10) {
          requestAnimationFrame(measureFps);
        } else {
          // If average FPS is below threshold, consider it a low-performance device
          const avgFps = totalFps / count;
          setIsLowPerformanceDevice(isMobile || avgFps < 40);
        }
      };
      
      requestAnimationFrame(measureFps);
    };
    
    checkDevicePerformance();
  }, []);
  
  return { isLowPerformanceDevice };
};
