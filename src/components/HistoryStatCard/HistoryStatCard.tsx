import React from 'react';
import type { LucideIcon } from 'lucide-react';

type StatColor = 'blue' | 'green' | 'red' | 'purple';

interface HistoryStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: StatColor;
}

const colorClasses: Record<StatColor, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
};

export const HistoryStatCard: React.FC<HistoryStatCardProps> = ({
    title,
    value,
    icon: Icon,
    color,
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${colorClasses[color]}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase">{title}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};
