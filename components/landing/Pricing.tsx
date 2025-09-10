import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: isAnnual ? 19 : 29,
      period: "month",
      features: [
        "Up to 1,000 conversations/month",
        "2 communication channels",
        "Basic AI responses",
        "Email support",
        "Standard integrations"
      ],
      cta: "Start free trial",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing teams that need more",
      price: isAnnual ? 49 : 69,
      period: "month",
      features: [
        "Up to 10,000 conversations/month",
        "All communication channels",
        "Advanced AI automation",
        "Priority support",
        "Premium integrations",
        "Advanced analytics",
        "Team collaboration tools"
      ],
      cta: "Start free trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: null,
      period: "",
      features: [
        "Unlimited conversations",
        "Custom integrations",
        "Dedicated AI training",
        "24/7 phone support",
        "White-label solution",
        "Advanced security & compliance",
        "Custom reporting",
        "SLA guarantees"
      ],
      cta: "Contact sales",
      popular: false
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-terminal">
              Simple pricing that
              <br />
              <span className="text-gray-600">grows with you</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-rubik">
              Start free, upgrade when you need to. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                    isAnnual ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Save 30%
                </span>
              )}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-gray-900 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-terminal">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6 font-rubik">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {plan.price ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          ${plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{plan.period}
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-gray-900">
                        Custom
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-rubik">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full h-12 text-lg rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  asChild
                >
                  <Link href={plan.name === 'Enterprise' ? '/contact' : '/auth/register'}>
                    <span>{plan.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-6 font-rubik">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;