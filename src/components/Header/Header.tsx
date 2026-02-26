import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, User, ChevronLeft } from 'lucide-react';

interface HeaderProps {
    showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton = true }) => {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm print:hidden">
            <div className="flex items-center">
                {showBackButton && (
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mr-4 p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                <div className="flex items-center text-red-700 font-bold text-xl">
                    <Bus className="mr-2" />
                    Rota Saúde
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm text-right hidden sm:block">
                    <p className="font-bold text-gray-700">Setor de TFD</p>
                    <p className="text-xs text-gray-500">Pref. Municipal</p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <User size={18} />
                </div>
            </div>
        </header>
    );
};
