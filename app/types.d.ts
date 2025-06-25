/**
 * Type declarations for external libraries and custom components
 * to resolve TypeScript errors in the project
 */

// GSAP related declarations
declare module 'gsap' {
  export const gsap: any;
  export function registerPlugin(...args: any[]): void;
  export const ScrollTrigger: any;
  export default gsap;
}

declare module 'gsap/ScrollTrigger' {
  const ScrollTrigger: any;
  export { ScrollTrigger };
}

// Component declarations for components we created
declare module '@/components/ui/3d-scene' {
  export const ThreeDScene: React.FC<{className?: string}>;
  export const StarfieldBackground: React.FC<{className?: string}>;
}

declare module '@/components/ui/smooth-scroll' {
  const SmoothScroll: React.FC<{children: React.ReactNode}>;
  export default SmoothScroll;
}

declare module '@/components/landing/Hero' {
  const Hero: React.FC;
  export default Hero;
}

declare module '@/components/landing/Features' {
  const Features: React.FC;
  export default Features;
}

declare module '@/components/landing/Channels' {
  const Channels: React.FC;
  export default Channels;
}

declare module '@/components/landing/Stats' {
  const Stats: React.FC;
  export default Stats;
}

declare module '@/components/landing/CTA' {
  const CTA: React.FC;
  export default CTA;
}
