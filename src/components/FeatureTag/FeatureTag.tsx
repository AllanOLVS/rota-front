import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureTagProps {
    icon: LucideIcon;
    label: string;
    variant?: 'dark' | 'light';
}

export const FeatureTag: React.FC<FeatureTagProps> = ({
    icon: Icon,
    label,
    variant = 'dark',
}) => {
    const variantClasses = {
        dark: 'text-red-100 bg-red-900/30 border-red-500/30',
        light: 'text-red-600 bg-red-50 border-red-200',
    };

    return (
        <div className={`flex items-center px-4 py-2 rounded-full border text-sm font-medium ${variantClasses[variant]}`}>
            <Icon size={16} className={`mr-2 ${variant === 'dark' ? 'text-red-300' : 'text-red-500'}`} />
            {label}
        </div>
    );
};
