import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const Dropdown = ({ options, value, onChange, label, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)} ref={dropdownRef}>
      {label && <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest px-1">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "glass flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 text-sm font-bold transition-all duration-300 hover:border-psl-green/50",
          isOpen && "border-psl-green ring-1 ring-psl-green/20"
        )}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown 
          size={16} 
          className={cn("text-gray-500 transition-transform duration-300", isOpen && "rotate-180 text-psl-green")} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-[60] glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5",
                  option.value === value ? "text-psl-green font-bold bg-psl-green/5" : "text-gray-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
