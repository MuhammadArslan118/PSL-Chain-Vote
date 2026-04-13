import React from 'react';
import { cn } from '../../lib/utils';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: any;
  color: string;
}

export const StatCard = ({ label, value, trend, icon: Icon, color }: StatCardProps) => (
  <Card className="relative overflow-hidden group">
    <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 blur-2xl rounded-full", color)} />
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{label}</p>
        <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
        {trend && (
          <p className={cn("text-xs font-medium mt-1", trend.startsWith('+') ? "text-psl-green" : "text-red-400")}>
            {trend} <span className="text-gray-500 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300", color.replace('bg-', 'text-'))}>
        <Icon size={20} />
      </div>
    </div>
  </Card>
);
