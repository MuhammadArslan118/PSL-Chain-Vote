import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
      active 
        ? "bg-psl-green/10 text-psl-green border border-psl-green/20" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon size={20} className={cn("transition-transform duration-300 group-hover:scale-110", active && "text-psl-green")} />
    <span className="font-medium text-sm">{label}</span>
    {active && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-psl-green shadow-[0_0_8px_rgba(0,255,0,0.8)]"
      />
    )}
  </button>
);
