import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, BarChart3, Zap, Users, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "One inbox for everything",
      description: "WhatsApp, SMS, email, web chat—all conversations flow into a single, organized inbox.",
      story: "No more switching between tabs or missing messages."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI that actually helps",
      description: "Smart routing, suggested replies, and automatic responses that sound human.",
      story: "Your team focuses on complex issues while AI handles the routine."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team collaboration",
      description: "Share conversations, add internal notes, and hand off seamlessly between team members.",
      story: "Everyone stays in the loop without the chaos."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning fast setup",
      description: "Connect your first channel in under 5 minutes. No technical expertise required.",
      story: "Start helping customers better today, not next month."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Insights that matter",
      description: "See response times, customer satisfaction, and team performance at a glance.",
      story: "Know what's working and what needs attention."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise security",
      description: "Bank-level encryption, compliance certifications, and data protection you can trust.",
      story: "Your customers' data is safe, always."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to
              <br />
              <span className="text-gray-600">transform customer conversations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We built OmniChannel because we were tired of juggling multiple platforms. 
              Here's what makes the difference.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
                  {/* Icon */}
                  <div className="text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Story element */}
                  <p className="text-sm text-gray-500 italic">
                    {feature.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The result? Happy customers and a calmer team.
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                When everything works together, magic happens. Response times drop, 
                customer satisfaction soars, and your team can focus on what they do best.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>2x faster responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>50% less context switching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>90% customer satisfaction</span>
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