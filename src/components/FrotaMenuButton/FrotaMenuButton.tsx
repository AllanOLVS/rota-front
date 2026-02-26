import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FrotaMenuButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    highlight?: boolean;
}

export const FrotaMenuButton: React.FC<FrotaMenuButtonProps> = ({
    label,
    icon: Icon,
    onClick,
    highlight = false
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center p-4 rounded-xl border transition-all duration-200 w-full group h-24
                ${highlight
                    ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }
            `}
        >
            <div className="flex items-center justify-center font-bold text-center w-full">
                <Icon size={24} className="mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base">{label}</span>
            </div>
        </button>
    );
};
