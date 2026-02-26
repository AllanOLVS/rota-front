import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
    title,
    subtitle,
    icon: Icon,
    variant = 'primary',
    children
}) => {
    const isPrimary = variant === 'primary';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`px-6 py-4 border-b flex items-center ${isPrimary
                    ? 'bg-red-50 border-red-100'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                <div className={`bg-white p-2 rounded-lg mr-3 shadow-sm ${isPrimary ? 'text-red-600' : 'text-gray-600'
                    }`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h2 className={`text-lg font-bold ${isPrimary ? 'text-red-900' : 'text-gray-800'
                        }`}>{title}</h2>
                    {subtitle && (
                        <p className={`text-xs ${isPrimary ? 'text-red-700' : 'text-gray-500'
                            }`}>{subtitle}</p>
                    )}
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
