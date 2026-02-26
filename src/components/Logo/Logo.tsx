import React from 'react';
import { Heart, Ambulance } from 'lucide-react';

interface LogoProps {
    variant?: 'default' | 'white' | 'mobile';
    showText?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
    variant = 'default',
    showText = true,
    size = 'md',
}) => {
    const sizeClasses = {
        sm: { container: 'h-8 w-8', icon: 'h-4 w-4', text: 'text-lg' },
        md: { container: 'h-10 w-10', icon: 'h-6 w-6', text: 'text-2xl' },
        lg: { container: 'h-12 w-12', icon: 'h-8 w-8', text: 'text-3xl' },
    };

    const variantClasses = {
        default: {
            container: 'bg-red-100',
            icon: 'text-red-600 fill-current',
            text: 'text-gray-900',
        },
        white: {
            container: 'bg-white/20 backdrop-blur-sm border border-white/30',
            icon: 'text-white',
            text: 'text-white',
        },
        mobile: {
            container: 'bg-transparent',
            icon: 'text-white',
            text: 'text-white',
        },
    };

    const Icon = variant === 'mobile' ? Ambulance : Heart;

    return (
        <div className="flex items-center">
            <div className={`${sizeClasses[size].container} ${variantClasses[variant].container} rounded-lg flex items-center justify-center mr-3`}>
                <Icon className={`${sizeClasses[size].icon} ${variantClasses[variant].icon}`} />
            </div>
            {showText && (
                <span className={`${sizeClasses[size].text} font-bold tracking-tight ${variantClasses[variant].text}`}>
                    Rota Saúde
                </span>
            )}
        </div>
    );
};
