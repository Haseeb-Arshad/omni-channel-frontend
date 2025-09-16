"use client";

import React from "react";

const items = [
  { label: "Use cases", href: "#use-cases" },
  { label: "Product", href: "#product" },
  { label: "Agents", href: "#agents" },
  { label: "Integrations", href: "#integrations" },
  { label: "Results", href: "#results" },
  { label: "Blog", href: "#blog" },
];

export default function LeftRailNav() {
  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30 space-y-8"
    >
      <div className="text-sm text-gray-700 font-medium font-adobe-body">Cofounder</div>
      <ul className="space-y-5 text-sm text-gray-500">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="hover:text-gray-900 transition-colors duration-200 font-adobe-body"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

