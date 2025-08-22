import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Mail, Phone, Bot } from 'lucide-react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:24px_24px] opacity-30" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Story Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Your customers are everywhere</span>
              </div>

              {/* Main Headline - Story-driven */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                One conversation,
                <br />
                <span className="text-gray-600">
                  every channel
                </span>
              </h1>

              {/* Story Description */}
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Your customers reach out through WhatsApp, email, SMS, and web chat. 
                But you're juggling four different inboxes, losing context, and missing messages.
                <br /><br />
                <strong className="text-gray-900">There's a better way.</strong>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-lg shadow-lg group transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/register" className="flex items-center">
                    <span>Start unifying today</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-lg group"
                  asChild
                >
                  <Link href="#story" className="flex items-center">
                    <span>See how it works</span>
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>No credit card</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual Story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Before/After Visual Story */}
              <div className="space-y-8">
                
                {/* "Before" - Scattered channels */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Before: Chaos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-red-200 rounded w-3/4" />
                        <div className="h-2 bg-red-200 rounded w-1/2" />
                      </div>
                      <div className="text-xs text-red-600 mt-2">3 unread</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-red-200 rounded w-2/3" />
                        <div className="h-2 bg-red-200 rounded w-4/5" />
                      </div>
                      <div className="text-xs text-red-600 mt-2">7 unread</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">SMS</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-red-200 rounded w-1/2" />
                        <div className="h-2 bg-red-200 rounded w-3/5" />
                      </div>
                      <div className="text-xs text-red-600 mt-2">2 unread</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">Web Chat</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-red-200 rounded w-4/5" />
                        <div className="h-2 bg-red-200 rounded w-2/3" />
                      </div>
                      <div className="text-xs text-red-600 mt-2">5 unread</div>
                    </div>
                  </div>
                  <div className="text-center mt-4 text-red-700 font-medium">
                    17 scattered messages across 4 platforms
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gray-900 text-white p-3 rounded-full"
                  >
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </motion.div>
                </div>

                {/* "After" - Unified inbox */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">After: Clarity</h3>
                  <div className="bg-white rounded-lg p-6 border border-green-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Unified Inbox</h4>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-green-600" />
                        <Mail className="w-3 h-3 text-blue-600" />
                        <Phone className="w-3 h-3 text-purple-600" />
                        <Bot className="w-3 h-3 text-orange-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-3/4 mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-1/2" />
                        </div>
                        <div className="text-xs text-gray-500">2m ago</div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-2/3 mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-4/5" />
                        </div>
                        <div className="text-xs text-gray-500">5m ago</div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-1/2 mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-3/5" />
                        </div>
                        <div className="text-xs text-gray-500">8m ago</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4 text-green-700 font-medium">
                    All conversations in one place, with full context
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;