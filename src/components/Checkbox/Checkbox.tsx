import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    id,
    ...props
}) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                {...props}
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900 cursor-pointer">
                {label}
            </label>
        </div>
    );
};
