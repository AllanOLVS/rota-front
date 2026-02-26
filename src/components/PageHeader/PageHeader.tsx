import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    icon: LucideIcon;
    backTo?: string;
    rightContent?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    icon: Icon,
    backTo = '/dashboard',
    rightContent
}) => {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 min-h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-0 sticky top-0 z-20 shadow-sm gap-3 sm:gap-0">
            <div className="flex items-center w-full sm:w-auto">
                <button
                    onClick={() => navigate(backTo)}
                    className="mr-2 sm:mr-4 text-gray-500 hover:text-red-600 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-gray-100 flex-shrink-0"
                    title="Voltar"
                >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <div className="flex items-center text-red-700 font-bold text-base sm:text-xl min-w-0">
                    <Icon className="mr-2 flex-shrink-0" size={20} />
                    <span className="truncate">{title}</span>
                </div>
            </div>
            {rightContent && (
                <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                    {rightContent}
                </div>
            )}
        </header>
    );
};
