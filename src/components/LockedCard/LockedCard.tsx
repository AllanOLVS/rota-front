import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface LockedCardProps {
    title: string;
    message?: string;
}

export const LockedCard: React.FC<LockedCardProps> = ({
    title,
    message = 'Acesso Restrito a Gerentes',
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200 border-dashed bg-gray-50 text-center h-full opacity-60 cursor-not-allowed select-none">
            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mb-3 text-gray-400">
                <ShieldAlert size={24} />
            </div>
            <h3 className="text-md font-bold text-gray-500 mb-1">{title}</h3>
            <p className="text-xs text-gray-400">{message}</p>
        </div>
    );
};
