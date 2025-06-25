"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderSrc?: string;
  priority?: boolean;
}

/**
 * Progressive image component that displays a low-quality placeholder
 * while the main image loads, creating a better user experience.
 */
const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderSrc,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    
    // If no placeholder is provided or if we already moved to the main image,
    // just set the source directly
    if (!placeholderSrc || currentSrc === src) {
      setCurrentSrc(src);
      return;
    }

    // If we have a placeholder, preload the main image
    const img = new window.Image();
    img.src = src;
    
    img.onload = () => {
      // Once main image is loaded, switch to it and mark as loaded
      setCurrentSrc(src);
      
      // Small delay to allow for transition animation
      setTimeout(() => {
        setIsLoading(false);
      }, 50);
    };

    // Handle errors by still showing the main image
    img.onerror = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    return () => {
      // Cleanup
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholderSrc]);

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`progressive-image ${isLoading ? 'loading' : 'loaded'} ${className}`}
        style={{ position: 'relative', width: width || '100%', height: height || 'auto' }}
      >
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="transition-all duration-500"
          style={{ 
            width: '100%', 
            height: height ? undefined : 'auto',
            objectFit: 'cover'
          }}
          onLoad={() => {
            if (currentSrc === src) {
              setIsLoading(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProgressiveImage;
