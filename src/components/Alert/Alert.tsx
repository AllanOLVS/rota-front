import React from 'react';
import { Activity, type LucideIcon } from 'lucide-react';

interface AlertProps {
    children: React.ReactNode;
    variant?: 'error' | 'success' | 'warning' | 'info';
    icon?: LucideIcon;
}

export const Alert: React.FC<AlertProps> = ({
    children,
    variant = 'error',
    icon: Icon = Activity,
}) => {
    const variantClasses = {
        error: 'text-red-600 bg-red-50 border-red-100',
        success: 'text-green-600 bg-green-50 border-green-100',
        warning: 'text-yellow-600 bg-yellow-50 border-yellow-100',
        info: 'text-blue-600 bg-blue-50 border-blue-100',
    };

    return (
        <div className={`text-sm p-3 rounded-lg border flex items-center ${variantClasses[variant]}`}>
            <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
            {children}
        </div>
    );
};
