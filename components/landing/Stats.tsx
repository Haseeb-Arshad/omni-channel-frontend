import React from 'react';
import { motion } from 'framer-motion';

const Stats: React.FC = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Messages unified daily",
      description: "Across all channels"
    },
    {
      number: "2.5x",
      label: "Faster response times",
      description: "On average"
    },
    {
      number: "94%",
      label: "Customer satisfaction",
      description: "From our users"
    },
    {
      number: "5 min",
      label: "Average setup time",
      description: "From signup to first message"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The numbers tell
              <br />
              <span className="text-gray-600">the story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When teams switch to OmniChannel, the improvements are immediate and measurable.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-700 italic mb-8">
                "We went from drowning in messages to having complete control. 
                Our customers notice the difference, and so does our team."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                  SM
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Sarah Martinez</div>
                  <div className="text-gray-600">Head of Customer Success, TechFlow</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;