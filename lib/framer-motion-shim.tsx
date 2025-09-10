// A minimal shim to disable framer-motion animations across the app.
// It provides motion.* components and AnimatePresence that just render children.
import React from 'react';

type AnyProps = { children?: React.ReactNode } & Record<string, any>;

export const motion: any = new Proxy({}, {
  get: () => (props: AnyProps) => <>{props?.children}</>,
});

export const AnimatePresence: React.FC<AnyProps> = ({ children }) => <>{children}</>;

export default { motion, AnimatePresence };

