import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Slack, Calendar, Globe, Mail, Github, Zap } from 'lucide-react';

const CofounderFeatures: React.FC = () => {
  const features = [
    {
      title: "Analyze this startup (Cofounder)",
      description: "Run a VC-style startup deep dive: build an analysis spreadsheet, research online, benchmark competitors, and enrich staff profiles.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">📊</span>
        </div>,
        <div key="2" className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Globe className="w-3 h-3 text-white" />
        </div>
      ]
    },
    {
      title: "What's going on in engineering",
      description: "Get a snapshot of your engineering team's status, priorities, and challenges.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <Slack className="w-3 h-3 text-white" />
        </div>,
        <div key="2" className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">L</span>
        </div>
      ]
    },
    {
      title: "Make me a resume based on what you know",
      description: "Create a public-ready PDF resume from known data and online research, omitting all personal contact details.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">📄</span>
        </div>
      ]
    },
    {
      title: "Make this into pixel art",
      description: "Convert any image into retro pixel art with adjustable pixel size.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🎨</span>
        </div>
      ]
    },
    {
      title: "Monitor Tech Blogs and Auto Email New Posts Every Monday",
      description: "Monitor top AI and engineering blogs for new posts and email a Monday summary with key takeaways and links.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
          <Globe className="w-3 h-3 text-white" />
        </div>
      ]
    },
    {
      title: "Daily calendar briefing",
      description: "Each morning, summarize your day's calendar with key context and suggested prep.",
      toolIcons: [
        <div key="1" className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Mail className="w-3 h-3 text-white" />
        </div>,
        <div key="2" className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <Calendar className="w-3 h-3 text-white" />
        </div>
      ]
    }
  ];

  return (
    <section id="use-cases" className="py-20 bg-white relative">
      {/* Main content with proper spacing from sidebar */}
      <div className="lg:ml-48 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 font-adobe-body">
            Here's some of the things Cofounder can do for you
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-300 relative">
                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900 mb-4 leading-tight font-adobe-body">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-8 font-adobe-body">
                  {feature.description}
                </p>

                {/* Bottom section with tools and button */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  {/* Tool icons */}
                  <div className="flex items-center gap-2">
                    {feature.toolIcons.map((icon, iconIndex) => (
                      <div key={iconIndex}>
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* Button - only visible on hover */}
                  <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 font-adobe-body flex items-center gap-2 shadow-lg">
                    See it work
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-base max-w-2xl mx-auto font-adobe-body">
            These are just a few examples. Cofounder can automate almost any workflow 
            that involves connecting different tools and services.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CofounderFeatures;
