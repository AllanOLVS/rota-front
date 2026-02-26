import React from 'react';
import { Calendar, PlusCircle, Users, History, Car, MapPin, MessageSquare } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { LockedCard } from '../LockedCard';

interface QuickAccessGridProps {
    userRole: 'admin' | 'staff' | 'motorista';
    onNavigate?: (route: string) => void;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
    userRole,
    onNavigate,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 1. List Trips (All users) */}
            <DashboardCard
                title="Listar Viagens"
                desc="Consulte o cronograma, verifique saídas e ocupação dos veículos."
                icon={Calendar}
                color="blue"
                onClick={() => onNavigate?.('viagens')}
            />

            {/* 2. New Trip (Admin only) */}
            {userRole === 'admin' ? (
                <DashboardCard
                    title="Nova Viagem"
                    desc="Crie um novo roteiro e defina data, destino e motorista."
                    icon={PlusCircle}
                    color="red"
                    highlight
                    onClick={() => onNavigate?.('nova-viagem')}
                />
            ) : (
                <LockedCard title="Nova Viagem" />
            )}

            {/* 3. Patients (All users) */}
            <DashboardCard
                title="Pacientes"
                desc="Consulte o catálogo, edite dados ou cadastre novos."
                icon={Users}
                color="green"
                onClick={() => onNavigate?.('pacientes')}
            />

            {/* 4. History (All users) */}
            <DashboardCard
                title="Histórico"
                desc="Acesse relatórios de viagens passadas e frequências."
                icon={History}
                color="amber"
                onClick={() => onNavigate?.('historico')}
            />

            {/* 5. Fleet & Drivers (Admin only) */}
            {userRole === 'admin' ? (
                <DashboardCard
                    title="Frota & Motoristas"
                    desc="Gerencie veículos, motoristas e manutenções."
                    icon={Car}
                    color="slate"
                    onClick={() => onNavigate?.('frota')}
                />
            ) : (
                <LockedCard title="Frota & Motoristas" />
            )}

            {/* 6. Messages (Admin only) */}
            {userRole === 'admin' ? (
                <DashboardCard
                    title="Mensagens"
                    desc="Envie e gerencie comunicados para motoristas e pacientes."
                    icon={MessageSquare}
                    color="blue"
                    onClick={() => onNavigate?.('mensagens')}
                />
            ) : (
                <LockedCard title="Mensagens" />
            )}

            {/* 7. Destinations */}
            <DashboardCard
                title="Destinos"
                desc="Gerencie hospitais e clínicas conveniadas."
                icon={MapPin}
                color="purple"
                onClick={() => onNavigate?.('destinos')}
            />
        </div>
    );
};
