"use client";
import Link from "next/link";
import React from "react";

type Props = {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  gradient?: string; // e.g. 'from-blue-500 to-indigo-600'
  bgColor?: string;  // e.g. 'bg-blue-50'
  textColor?: string; // e.g. 'text-blue-600'
  badge?: number;
  onClick?: () => void;
};

export function NavigationItem({ icon, label, href = '#', isActive, isCollapsed, gradient = 'from-indigo-500 to-purple-600', bgColor = 'bg-indigo-50', textColor = 'text-indigo-600', badge = 0, onClick }: Props) {
  const content = (
    <div
      className={`group relative flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive ? `bg-white shadow-sm border border-black/10` : 'border border-transparent'
      }`}
      onClick={onClick}
    >
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>{icon}</div>
      {!isCollapsed && (
        <div className="flex-1 flex items-center justify-between">
          <span className={`text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{label}</span>
          {badge > 0 && (
            <span className={`ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 text-[10px] font-semibold rounded-full ${bgColor} ${textColor}`}>
              {badge}
            </span>
          )}
        </div>
      )}
      {/* active glow bar */}
      <span className={`absolute left-1 top-1/2 -translate-y-1/2 h-0.5 w-0 rounded ${isActive ? 'w-1.5 bg-gradient-to-b from-rose-400 to-rose-600' : ''}`} />
    </div>
  );

  return href ? (
    <Link href={href} className="block" prefetch={false}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default NavigationItem;

