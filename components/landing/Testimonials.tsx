import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Before OmniChannel, I was constantly switching between WhatsApp Web, Gmail, and our SMS platform. Now everything's in one place. I can actually focus on helping customers instead of hunting for messages.",
      author: "Alex Chen",
      role: "Customer Support Lead",
      company: "GrowthCorp",
      avatar: "AC"
    },
    {
      quote: "The AI suggestions are surprisingly good. It's not replacing our team—it's making us faster and more consistent. Our response times dropped by 60% in the first month.",
      author: "Maria Rodriguez",
      role: "Operations Manager",
      company: "ServicePro",
      avatar: "MR"
    },
    {
      quote: "Setup was ridiculously easy. Connected our WhatsApp Business, email, and web chat in under 10 minutes. The team was up and running the same day.",
      author: "David Kim",
      role: "IT Director",
      company: "StartupXYZ",
      avatar: "DK"
    },
    {
      quote: "What I love most is the context. When a customer switches from email to WhatsApp, I can see the entire conversation history. No more asking 'can you repeat that?'",
      author: "Jennifer Walsh",
      role: "Customer Success Manager",
      company: "TechVenture",
      avatar: "JW"
    },
    {
      quote: "The reporting finally makes sense. I can see which channels are busiest, how fast we're responding, and where we need to improve. Data that actually helps.",
      author: "Michael Torres",
      role: "Support Manager",
      company: "InnovateCorp",
      avatar: "MT"
    },
    {
      quote: "Our customers love that they can reach us however they want, and we love that we don't have to juggle multiple platforms. It's a win-win.",
      author: "Lisa Park",
      role: "CEO",
      company: "CustomerFirst",
      avatar: "LP"
    }
  ];

  return (
    <section className="py-24 bg-white">
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
              Real stories from
              <br />
              <span className="text-gray-600">real teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what teams say after switching to OmniChannel.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300"
              >
                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to write your own success story?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of teams who've transformed their customer communication.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>✓ Free to start</span>
                <span>✓ No credit card required</span>
                <span>✓ Setup in minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;