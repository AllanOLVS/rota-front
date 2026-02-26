import React from 'react';
import {
    Ambulance,
    LayoutDashboard,
    Calendar,
    Users,
    Car,
    History,
    Settings,
    LogOut,
    MapPin
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
    isOpen: boolean;
    userRole: 'admin' | 'staff' | 'motorista';
    activeItem?: string;
    onNavigate?: (route: string) => void;
    onLogout?: () => void;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    userRole,
    activeItem = 'dashboard',
    onNavigate,
    onLogout,
    onClose // New prop
}) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-30 overflow-hidden 
                    ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
                `}
            >
                {/* Logo */}
                <div className="h-20 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    <div className="flex items-center text-red-700 font-bold text-xl overflow-hidden whitespace-nowrap">
                        <div className="h-10 w-10 bg-red-50 rounded-xl flex-shrink-0 flex items-center justify-center mr-2 border border-red-100">
                            <Ambulance size={24} className="text-red-600" />
                        </div>
                        <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                            Rota Saúde
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
                    <SidebarItem
                        icon={LayoutDashboard}
                        text="Visão Geral"
                        active={activeItem === 'dashboard'}
                        isOpen={isOpen}
                        onClick={() => { onNavigate?.('dashboard'); onClose?.(); }}
                    />
                    <SidebarItem
                        icon={Calendar}
                        text="Viagens"
                        active={activeItem === 'viagens'}
                        isOpen={isOpen}
                        onClick={() => { onNavigate?.('viagens'); onClose?.(); }}
                    />
                    <SidebarItem
                        icon={Users}
                        text="Pacientes"
                        active={activeItem === 'pacientes'}
                        isOpen={isOpen}
                        onClick={() => { onNavigate?.('pacientes'); onClose?.(); }}
                    />
                    <SidebarItem
                        icon={MapPin}
                        text="Destinos"
                        active={activeItem === 'lista-destinos'}
                        isOpen={isOpen}
                        onClick={() => { onNavigate?.('destinos'); onClose?.(); }}
                    />
                    {userRole === 'admin' && (
                        <SidebarItem
                            icon={Car}
                            text="Frota"
                            active={activeItem === 'frota'}
                            isOpen={isOpen}
                            onClick={() => { onNavigate?.('frota'); onClose?.(); }}
                        />
                    )}
                    <SidebarItem
                        icon={History}
                        text="Histórico"
                        active={activeItem === 'historico'}
                        isOpen={isOpen}
                        onClick={() => { onNavigate?.('historico'); onClose?.(); }}
                    />
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        {userRole === 'admin' && (
                            <SidebarItem
                                icon={Settings}
                                text="Configurações"
                                active={activeItem === 'configuracoes'}
                                isOpen={isOpen}
                                onClick={() => { onNavigate?.('configuracoes'); onClose?.(); }}
                            />
                        )}
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-100 overflow-hidden">
                    <button
                        onClick={onLogout}
                        className={`w-full flex items-center text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors overflow-hidden ${!isOpen && 'md:justify-center'
                            }`}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span className={`ml-3 font-medium whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                            Sair do Sistema
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};
