// A minimal shim to disable framer-motion animations across the app.
// It provides motion.* components and AnimatePresence that just render children.
import React from 'react';

type AnyProps = { children?: React.ReactNode } & Record<string, any>;

// Create a motion component factory that returns a component that just renders children
const createMotionComponent = (componentName: string) => {
  const MotionComponent: React.FC<AnyProps> = (props) => {
    const { children, ...restProps } = props;
    // Remove framer-motion specific props to avoid React warnings
    const cleanProps = { ...restProps };
    delete cleanProps.initial;
    delete cleanProps.animate;
    delete cleanProps.transition;
    delete cleanProps.exit;
    delete cleanProps.variants;
    delete cleanProps.whileHover;
    delete cleanProps.whileTap;
    delete cleanProps.whileInView;
    delete cleanProps.viewport;
    delete cleanProps.layout;
    delete cleanProps.layoutId;
    delete cleanProps.drag;
    delete cleanProps.dragConstraints;
    delete cleanProps.onDragStart;
    delete cleanProps.onDragEnd;

    return React.createElement(componentName, cleanProps, children);
  };
  return MotionComponent;
};

export const motion = new Proxy({}, {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      return createMotionComponent(prop);
    }
    return createMotionComponent('div');
  },
});

export const AnimatePresence: React.FC<AnyProps> = ({ children }) => <>{children}</>;

// Export motion hooks as no-ops
export const useInView = () => true;
export const useScroll = () => ({ scrollYProgress: { current: 0 } });
export const useTransform = () => 0;

export default { motion, AnimatePresence, useInView, useScroll, useTransform };

