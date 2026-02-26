import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CardColor = 'red' | 'blue' | 'green' | 'amber' | 'slate' | 'purple';

interface DashboardCardProps {
    title: string;
    desc: string;
    icon: LucideIcon;
    color: CardColor;
    highlight?: boolean;
    onClick?: () => void;
}

const colorClasses: Record<CardColor, string> = {
    red: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    green: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    slate: 'bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    desc,
    icon: Icon,
    color,
    highlight = false,
    onClick,
}) => {
    const iconClass = colorClasses[color] || colorClasses.blue;

    return (
        <button
            onClick={onClick}
            className={`
        group relative flex flex-col items-start text-left p-6 rounded-2xl border transition-all duration-300
        ${highlight
                    ? 'bg-white border-red-200 shadow-lg shadow-red-100 hover:shadow-xl hover:border-red-300 hover:-translate-y-1'
                    : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-1'
                }
      `}
        >
            <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${iconClass}`}
            >
                <Icon size={28} strokeWidth={1.5} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                {title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">{desc}</p>

            <div className="mt-auto w-full flex items-center text-sm font-semibold text-gray-400 group-hover:text-red-600 transition-colors">
                Acessar
                <ChevronRight
                    size={16}
                    className="ml-1 transform group-hover:translate-x-1 transition-transform"
                />
            </div>
        </button>
    );
};
