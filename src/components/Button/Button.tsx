import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
    loadingText?: string;
    showArrow?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    loadingText = 'Carregando...',
    showArrow = false,
    fullWidth = false,
    disabled,
    className = '',
    ...props
}) => {
    const baseClasses = 'group relative flex justify-center items-center py-3 px-4 text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'border border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        secondary: 'border border-transparent text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
        outline: 'border border-red-600 text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    {loadingText}
                </span>
            ) : (
                <span className="flex items-center">
                    {children}
                    {showArrow && (
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    )}
                </span>
            )}
        </button>
    );
};
