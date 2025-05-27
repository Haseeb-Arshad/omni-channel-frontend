import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'secondary' | 'white';
  type?: 'spinner' | 'dots' | 'pulse';
}

export function Loading({ 
  size = 'md', 
  color = 'primary',
  type = 'spinner'
}: LoadingProps) {
  
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colors = {
    primary: 'border-primary/30 border-t-primary',
    accent: 'border-accent/30 border-t-accent',
    secondary: 'border-secondary/30 border-t-secondary',
    white: 'border-white/30 border-t-white'
  };
  
  // Spinner variant
  if (type === 'spinner') {
    return (
      <motion.div 
        className={`${sizes[size]} rounded-full border-4 ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    );
  }
  
  // Dots variant
  if (type === 'dots') {
    const dotVariants = {
      initial: { scale: 0.5, opacity: 0.5 },
      animate: { scale: 1, opacity: 1 }
    };
    
    const dotTransition = {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    };
    
    const dotColorClasses = {
      primary: 'bg-primary',
      accent: 'bg-accent',
      secondary: 'bg-secondary',
      white: 'bg-white'
    };
    
    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2.5 h-2.5',
      lg: 'w-3.5 h-3.5'
    };
    
    const containerSizes = {
      sm: 'space-x-1.5',
      md: 'space-x-2',
      lg: 'space-x-3'
    };
    
    return (
      <div className={`flex items-center ${containerSizes[size]}`}>
        <motion.div 
          className={`rounded-full ${dotSizes[size]} ${dotColorClasses[color]}`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }}
        />
        <motion.div 
          className={`rounded-full ${dotSizes[size]} ${dotColorClasses[color]}`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.15 }}
        />
        <motion.div 
          className={`rounded-full ${dotSizes[size]} ${dotColorClasses[color]}`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.3 }}
        />
      </div>
    );
  }
  
  // Pulse variant
  if (type === 'pulse') {
    const pulseColors = {
      primary: 'bg-primary',
      accent: 'bg-accent',
      secondary: 'bg-secondary',
      white: 'bg-white'
    };
    
    const pulseSizes = {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-16 h-16'
    };
    
    return (
      <div className="relative">
        <motion.div
          className={`${pulseSizes[size]} rounded-full ${pulseColors[color]} opacity-75`}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${pulseColors[color]} rounded-full`} style={{ 
          width: size === 'sm' ? '8px' : size === 'md' ? '12px' : '16px',
          height: size === 'sm' ? '8px' : size === 'md' ? '12px' : '16px'
        }} />
      </div>
    );
  }
  
  return null;
}
