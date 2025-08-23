"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageSquare, Github, Twitter, Mail, Linkedin, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const platformLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/channels", label: "Channels" },
    { href: "/analytics", label: "Analytics" },
    { href: "/integrations", label: "Integrations" }
  ];
  
  const resourceLinks = [
    { href: "/docs", label: "Documentation" },
    { href: "/guides", label: "Getting Started" },
    { href: "/api", label: "API Reference" },
    { href: "/support", label: "Help Center" }
  ];
  
  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" }
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 mx-auto">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay in the loop
            </h3>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest updates, tips, and insights on customer communication delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Logo and description */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 w-fit group mb-6">
                <div className="relative h-12 w-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-gray-900">
                    OmniChannel
                  </span>
                  <span className="text-sm text-gray-500 -mt-1">Communication Hub</span>
                </div>
              </Link>
              
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                Transform your customer communication with our AI-powered omnichannel platform. 
                Connect, automate, and scale your conversations across all channels seamlessly.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                  { href: "https://github.com", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:hello@omnichannel.ai", icon: Mail, label: "Email" }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors duration-300 group"
                  >
                    <social.icon className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Link sections */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Platform</h3>
              <ul className="space-y-3">
                {platformLinks.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <span>&copy; {new Date().getFullYear()} OmniChannel. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for better communication.</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
