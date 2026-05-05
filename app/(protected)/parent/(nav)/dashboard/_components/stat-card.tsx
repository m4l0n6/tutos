import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  backgroundColor: string;
  iconColor: string;
  label: string;
  value: string;
  unit: string;
}

export function StatCard({
  icon,
  backgroundColor,
  iconColor,
  label,
  value,
  unit,
}: StatCardProps) {
  return (
    <div className="flex items-center gap-4 p-6 rounded-xl glass-card">
      <div className={`${backgroundColor} p-4 rounded-full`}>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <div>
        <p className="text-label-sm text-on-surface-variant">{label}</p>
        <p className="font-bold text-h2 text-on-surface">
          {value} <span className="font-normal text-on-surface-variant text-sm">{unit}</span>
        </p>
      </div>
    </div>
  );
}
