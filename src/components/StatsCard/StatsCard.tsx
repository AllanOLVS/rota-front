import React from 'react';

interface StatsCardProps {
    label: string;
    value: string | number;
    sub?: string;
    color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    label,
    value,
    sub,
    color = 'bg-red-500',
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
            <div className={`h-2 w-2 rounded-full ${color} mr-4`}></div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-800 mr-2">{value}</span>
                    {sub && <span className="text-xs text-gray-400">{sub}</span>}
                </div>
            </div>
        </div>
    );
};
