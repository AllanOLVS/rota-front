import React from 'react';
import { Menu, UserCircle } from 'lucide-react';

interface DashboardHeaderProps {
    userRole: 'admin' | 'staff' | 'motorista';
    onToggleSidebar: () => void;
    onRoleChange?: (role: 'admin' | 'staff' | 'motorista') => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userRole,
    onToggleSidebar,
    onRoleChange,
}) => {
    const getRoleName = () => {
        switch (userRole) {
            case 'admin': return 'Administrador';
            case 'staff': return 'Colaborador';
            case 'motorista': return 'Motorista';
        }
    };

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-2 sm:px-4 lg:px-6 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-600 mr-1 sm:mr-2 lg:mr-4 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                        Painel de Controle
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                        Gerenciamento de TFD e Transporte Municipal
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-6">
                {/* Role Simulator (For testing) */}
                {onRoleChange && (
                    <div className="flex items-center bg-gray-100 rounded-md lg:rounded-lg p-0.5 lg:p-1 border border-gray-200">
                        <span className="hidden lg:inline text-xs text-gray-400 font-medium px-2">
                            Simular:
                        </span>
                        <button
                            onClick={() => onRoleChange('staff')}
                            className={`px-1 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded text-[8px] sm:text-[10px] lg:text-xs font-bold transition-all ${userRole === 'staff'
                                ? 'bg-white shadow-sm text-gray-800'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Atendente
                        </button>
                        <button
                            onClick={() => onRoleChange('motorista')}
                            className={`px-1 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded text-[8px] sm:text-[10px] lg:text-xs font-bold transition-all ${userRole === 'motorista'
                                ? 'bg-blue-100 text-blue-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Motorista
                        </button>
                        <button
                            onClick={() => onRoleChange('admin')}
                            className={`px-1 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded text-[8px] sm:text-[10px] lg:text-xs font-bold transition-all ${userRole === 'admin'
                                ? 'bg-red-100 text-red-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Gerente
                        </button>
                    </div>
                )}

                {/* User Profile */}
                <div className="flex items-center pl-1 sm:pl-2 lg:pl-6 border-l border-gray-200">
                    <div className="text-right mr-3 hidden sm:block">
                        <p className="text-sm font-bold text-gray-800">
                            Olá, {getRoleName()}
                        </p>
                        <p className="text-xs text-green-600 font-medium bg-green-50 inline-block px-2 rounded-full border border-green-100">
                            Online agora
                        </p>
                    </div>
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-tr from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                        <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};
