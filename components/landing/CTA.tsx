'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const CTA: React.FC = () => {
  const benefits = [
    "Free to start",
    "No credit card required", 
    "Setup in 5 minutes",
    "Cancel anytime"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Main CTA */}
            <div className="bg-gray-50 rounded-3xl p-16 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Ready to unify your
                <br />
                <span className="text-gray-600">customer conversations?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Join thousands of teams who've transformed their customer communication. 
                Start your free trial today—no credit card required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-6 text-xl rounded-xl shadow-lg group transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/register" className="flex items-center">
                    <span>Start your free trial</span>
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-12 py-6 text-xl rounded-xl group"
                  asChild
                >
                  <Link href="/demo" className="flex items-center">
                    <span>Watch demo</span>
                  </Link>
                </Button>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-8 text-gray-600">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Story Section */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                The story doesn't end here
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Every day, teams switch from scattered communication to unified conversations. 
                They see faster response times, happier customers, and calmer workdays. 
                <br /><br />
                <strong>Your story starts with a single click.</strong>
              </p>
              
              {/* Success metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">2.5x</div>
                  <div className="text-gray-600">Faster responses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
                  <div className="text-gray-600">Customer satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
                  <div className="text-gray-600">Less context switching</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;