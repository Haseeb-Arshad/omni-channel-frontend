import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, BarChart3, Zap, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "One inbox for everything",
      description: "WhatsApp, SMS, email, web chat—all conversations flow into a single, organized inbox.",
      story: "No more switching between tabs or missing messages.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI that actually helps",
      description: "Smart routing, suggested replies, and automatic responses that sound human.",
      story: "Your team focuses on complex issues while AI handles the routine.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team collaboration",
      description: "Share conversations, add internal notes, and hand off seamlessly between team members.",
      story: "Everyone stays in the loop without the chaos.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning fast setup",
      description: "Connect your first channel in under 5 minutes. No technical expertise required.",
      story: "Start helping customers better today, not next month.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Insights that matter",
      description: "See response times, customer satisfaction, and team performance at a glance.",
      story: "Know what's working and what needs attention.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise security",
      description: "Bank-level encryption, compliance certifications, and data protection you can trust.",
      story: "Your customers' data is safe, always.",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50"
    }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
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
            className="text-center mb-24"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium shadow-lg mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Powerful Features</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                transform conversations
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We built OmniChannel because we were tired of juggling multiple platforms. 
              Here's what makes the difference.
            </p>
          </motion.div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group relative"
              >
                <motion.div 
                  className={`bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 h-full border border-white/50 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  {/* Icon with enhanced styling */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  {/* Story element with enhanced styling */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/80">
                    <p className="text-gray-600 italic font-medium">
                      {feature.story}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Bottom Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-16 max-w-5xl mx-auto shadow-2xl border border-gray-200/50 backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium shadow-lg mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>The Result</span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Happy customers and a calmer team
                </h3>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  When everything works together, magic happens. Response times drop, 
                  customer satisfaction soars, and your team can focus on what they do best.
                </p>
                
                {/* Enhanced metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { metric: "2x faster", label: "responses", color: "from-green-500 to-emerald-500" },
                    { metric: "50% less", label: "context switching", color: "from-blue-500 to-cyan-500" },
                    { metric: "90%", label: "customer satisfaction", color: "from-purple-500 to-pink-500" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <div className={`inline-flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                      <div className="text-2xl font-bold text-gray-900 mb-1">{item.metric}</div>
                      <div className="text-gray-600 font-medium">{item.label}</div>
                    </motion.div>
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

export default Features;