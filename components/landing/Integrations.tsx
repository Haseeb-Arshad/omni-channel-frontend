"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  siAirtable,
  siLoom,
  siGooglesheets,
  siGoogledocs,
  siGooglecalendar,
  siGmail,
  siIntercom,
  siNotion,
  siSlack,
  siLinear,
  siZapier,
  siSnowflake,
  siOpenai,
  siMixpanel,
  siGithub,
  siGoogleslides,
} from 'simple-icons/icons';

type IconObj = { path: string; hex: string; title: string };

const Box: React.FC<{ icon: IconObj; label?: string }> = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div
      className="relative rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-md hover:border-gray-300"
      aria-label={label || icon.title}
    >
      <div className="h-16 w-16 grid place-items-center rounded-xl">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:scale-[1.06]"
        >
          <path d={icon.path} fill={`#${icon.hex}`} />
        </svg>
      </div>
    </div>
    <div className="h-5 mt-2 text-[11px] text-gray-600 tracking-tight opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
      {label || icon.title}
    </div>
  </div>
);

const Integrations: React.FC = () => {
  const rows: IconObj[][] = [
    [
      siAirtable,
      siLoom,
      siGooglesheets,
      siGoogledocs,
      siGooglecalendar,
      siGmail,
    ],
    [siIntercom, siNotion, siSlack, siLinear, siZapier, siSnowflake],
    [siOpenai, siMixpanel, siGithub, siGoogleslides],
  ];

  return (
    <section id="integrations" className="py-20 bg-white relative">
      <div className="lg:ml-48 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.45 }}
          className="text-center text-2xl md:text-3xl font-light text-gray-900"
        >
          Connect the tools you already use
        </motion.h2>

        <div className="mt-8 space-y-8">
          {rows.map((icons, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px w-full bg-gray-200/70 mb-6" />}
              <div className="mx-auto grid grid-cols-6 gap-4 place-items-center justify-items-center max-w-[680px]">
                {icons.map((icon) => (
                  <Box key={icon.title} icon={icon} label={icon.title} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 h-px w-full bg-gray-200/70" />
      </div>
    </section>
  );
};

export default Integrations;
