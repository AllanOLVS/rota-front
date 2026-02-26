import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
    text: string;
    active?: boolean;
    isOpen: boolean;
    onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    text,
    active = false,
    isOpen,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
        ${active ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
        ${!isOpen && 'justify-center'}
      `}
        >
            <Icon
                size={22}
                className={`flex-shrink-0 ${active ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'} transition-colors`}
                strokeWidth={active ? 2 : 1.5}
            />

            {isOpen ? (
                <span className="ml-3 text-sm whitespace-nowrap">{text}</span>
            ) : (
                <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {text}
                </span>
            )}
        </button>
    );
};
