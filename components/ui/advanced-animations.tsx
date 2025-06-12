import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Text reveal animation with GSAP
export const RevealText = ({ children, className = '', delay = 0 }: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!textRef.current) return;
    
    const splitText = new SplitText(textRef.current, { 
      type: "words,chars",
      charsClass: "char",
      wordsClass: "word"
    });
    
    gsap.from(splitText.chars, {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.02,
      delay,
      duration: 0.8,
      ease: "power4.out",
    });
    
    return () => {
      splitText.revert();
    };
  }, [delay, isMounted]);
  
  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      {isMounted ? children : <div className="opacity-0">{children}</div>}
    </div>
  );
};

// Parallax section with GSAP
export const ParallaxSection = ({ 
  children, 
  speed = 0.2,
  className = ''
}: { 
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    gsap.to(section, {
      y: () => window.innerHeight * speed * -1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);
  
  return <div ref={sectionRef} className={className}>{children}</div>;
};

// Smooth appear animation using Framer Motion
export const FadeInView = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  threshold = 0.2,
  className = '',
  once = true,
  variants = undefined,
}: { 
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  variants?: Variants;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();
  
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer = ({
  children,
  delayChildren = 0.1,
  staggerChildren = 0.1,
  className = '',
}: {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Item for StaggerContainer 
export const StaggerItem = ({
  children,
  y = 30,
  x = 0,
  opacity = 0,
  scale = 1,
  duration = 0.8,
  className = '',
}: {
  children: React.ReactNode;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  className?: string;
}) => {
  const variants: Variants = {
    hidden: { 
      opacity, 
      y, 
      x,
      scale 
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

// 3D Tilt Card
export const TiltCard = ({
  children,
  className = '',
  maxTilt = 10, // Maximum tilt in degrees
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate how far the mouse is from the center as a percentage
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    // Calculate the tilt angles based on maximum tilt
    const tiltX = -percentY * maxTilt;
    const tiltY = percentX * maxTilt;
    
    // Apply the transformation
    gsap.to(card, { 
      rotateX: tiltX, 
      rotateY: tiltY,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset the transformation
    gsap.to(cardRef.current, { 
      rotateX: 0, 
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.7)"
    });
  };
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={`transition-shadow duration-300 ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

// Marquee animation component
export const Marquee = ({ 
  children, 
  speed = 35, 
  reverse = false,
  pauseOnHover = true,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ x: reverse ? "-100%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 100 / speed,
          ease: "linear",
        }}
        className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        <div className="flex min-w-full shrink-0 items-center justify-around gap-4">
          {children}
        </div>
        <div className="flex min-w-full shrink-0 items-center justify-around gap-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Magnetic Button with GSAP
export const MagneticButton = ({ 
  children,
  className = '',
  strength = 30,
  radius = 400,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) => {
  // Use a div reference instead of button to avoid nesting issues
  const elementRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current || !hovered) return;
    
    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    // Center of the element
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Distance between mouse and center
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distanceX = mouseX - x;
    const distanceY = mouseY - y;
    
    // Calculate the distance from the center
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < radius) {
      // Calculate the strength based on distance
      const magneticPull = strength * (1 - Math.min(distance, radius) / radius);
      
      // Apply transform
      gsap.to(element, {
        x: distanceX * magneticPull / 100,
        y: distanceY * magneticPull / 100,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
    if (!elementRef.current) return;
    
    // Reset position
    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.7)"
    });
  };
  
  const handleMouseEnter = () => {
    setHovered(true);
  };
  
  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {children}
    </div>
  );
};

// Perspective text that follows cursor
export const PerspectiveText = ({
  children,
  className = '',
  intensity = 40,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const rect = text.getBoundingClientRect();
    
    // Calculate mouse position relative to element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    // Apply perspective transform
    gsap.to(text, {
      rotateX: -y * intensity,
      rotateY: x * intensity,
      transformPerspective: 900,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    if (!textRef.current) return;
    
    // Reset transform
    gsap.to(textRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };
  
  return (
    <div
      ref={textRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};
