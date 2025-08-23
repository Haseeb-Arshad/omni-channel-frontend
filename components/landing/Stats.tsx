import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, MessageSquare, Sparkles } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Messages unified daily",
      description: "Across all channels",
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      number: "2.5x",
      label: "Faster response times",
      description: "On average",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      number: "94%",
      label: "Customer satisfaction",
      description: "From our users",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      number: "5 min",
      label: "Average setup time",
      description: "From signup to first message",
      icon: <Clock className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium shadow-lg mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Proven Results</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              The numbers tell
              <br />
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                the story
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              When teams switch to OmniChannel, the improvements are immediate and measurable.
            </p>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div 
                  className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Number with counter animation */}
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.description}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-16 max-w-5xl mx-auto shadow-2xl border border-gray-200/50 backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-2xl font-bold text-white">SM</span>
                </motion.div>

                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 italic mb-8 leading-relaxed">
                  "We went from drowning in messages to having complete control. 
                  Our customers notice the difference, and so does our team."
                </blockquote>
                
                <div className="space-y-2">
                  <div className="text-xl font-bold text-gray-900">Sarah Martinez</div>
                  <div className="text-gray-600 font-medium">Head of Customer Success, TechFlow</div>
                </div>

                {/* Decorative elements */}
                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    />
                  ))}
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