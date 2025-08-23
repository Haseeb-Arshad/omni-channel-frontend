import React from 'react';
import { motion } from 'framer-motion';

const TrustSignals: React.FC = () => {
  const trustedLogos = [
    { name: 'Acme Corp', width: 120 },
    { name: 'TechFlow', width: 100 },
    { name: 'DataSync', width: 110 },
    { name: 'CloudBase', width: 130 },
    { name: 'NextGen', width: 105 },
    { name: 'InnovateLab', width: 125 }
  ];

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Trusted by section */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-6 font-medium">Trusted by</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              {trustedLogos.map((logo, index) => (
                <motion.div
                  key={logo.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center h-12"
                  style={{ width: logo.width }}
                >
                  {/* Placeholder for actual logos */}
                  <div className="bg-gray-300 rounded h-8 w-full flex items-center justify-center">
                    <span className="text-xs text-gray-600 font-medium">{logo.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-8 flex-wrap text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <span className="text-coral-500">⟡</span>
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-coral-500">⟡</span>
              <span>100k messages routed / mo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-coral-500">⟡</span>
              <span>SOC2-ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;