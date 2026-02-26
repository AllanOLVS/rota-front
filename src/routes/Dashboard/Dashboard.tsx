import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { DashboardHeader } from '../../components/DashboardHeader';
import { QuickAccessGrid } from '../../components/QuickAccessGrid';
import { DailySummary } from '../../components/DailySummary';
import { DashboardMotorista } from '../DashboardMotorista';

type UserRole = 'admin' | 'staff' | 'motorista';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<UserRole>('admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleNavigate = (route: string) => {
        if (route === 'destinos') {
            navigate('/lista-destinos');
        } else {
            navigate(`/${route}`);
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    // Se o role for motorista, renderiza apenas o dashboard do motorista (sem header do sistema)
    if (userRole === 'motorista') {
        return <DashboardMotorista onRoleChange={setUserRole} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                userRole={userRole}
                activeItem="dashboard"
                onNavigate={handleNavigate}
                onLogout={handleLogout}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Area */}
            <main
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
                    }`}
            >
                {/* Header */}
                <DashboardHeader
                    userRole={userRole}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    onRoleChange={setUserRole}
                />

                {/* Content */}
                <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Acesso Rápido
                        </h2>
                        <p className="text-gray-500">
                            Selecione uma das opções abaixo para iniciar suas atividades.
                        </p>
                    </div>

                    {/* Quick Access Grid */}
                    <QuickAccessGrid userRole={userRole} onNavigate={handleNavigate} />

                    {/* Daily Summary */}
                    <DailySummary />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
