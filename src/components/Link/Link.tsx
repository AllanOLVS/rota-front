import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'muted';
}

export const Link: React.FC<LinkProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const variantClasses = {
        primary: 'text-red-600 hover:text-red-500',
        muted: 'text-gray-400 hover:text-gray-600',
    };

    return (
        <a
            className={`font-medium transition-colors ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </a>
    );
};
